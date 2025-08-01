import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaBoxOpen, FaSignOutAlt, FaUser, FaPlus, FaEdit, FaTrash, FaCog } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = '';

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [view, setView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', image: '', description: '' });
  const [editProduct, setEditProduct] = useState(null);
  const [period, setPeriod] = useState('day');
  const [analyticsError, setAnalyticsError] = useState('');
  const [productsError, setProductsError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notification, setNotification] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [changePasswordData, setChangePasswordData] = useState({ current_password: '', new_password: '' });
  const [changePasswordError, setChangePasswordError] = useState('');

  useEffect(() => {
    if (token) {
      fetchAnalytics();
      fetchProducts();
    }
  }, [token, period]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const body = new URLSearchParams();
      body.append('grant_type', 'password');
      body.append('username', username);
      body.append('password', password);
      body.append('scope', '');
      body.append('client_id', '');
      body.append('client_secret', '');

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (!res.ok) {
        let errMsg = 'Invalid credentials';
        try {
          const errData = await res.json();
          if (typeof errData.detail === 'string') errMsg = errData.detail;
          else if (Array.isArray(errData.detail)) errMsg = errData.detail.map(d => d.msg).join(', ');
        } catch {}
        setLoginError(errMsg);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setToken(data.access_token);
      localStorage.setItem('admin_token', data.access_token);
    } catch (err) {
      setLoginError('Network or server error');
    }
    setLoading(false);
  };

  const fetchAnalytics = async () => {
    setAnalyticsError('');
    try {
      const res = await fetch(`${API_URL}/api/analytics/visitors?period=${period}`);
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const data = await res.json();
      const viewsRes = await fetch(`${API_URL}/api/analytics/product-views`);
      if (viewsRes.status === 401 || viewsRes.status === 403) {
        handleLogout();
        return;
      }
      const views = await viewsRes.json();
      setAnalytics({ ...data, productViews: views });
    } catch (err) {
      setAnalyticsError('Failed to load analytics');
      setAnalytics(null);
    }
  };

  const fetchProducts = async () => {
    setProductsError('');
    try {
      const res = await fetch(`${API_URL}/api/products/`, { cache: 'no-cache' });
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch products');
      setProducts(await res.json());
    } catch (err) {
      setProductsError('Failed to load products');
      setProducts([]);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      if (!res.ok) throw new Error('Error adding product');
      setNewProduct({ name: '', image: '', description: '' });
      setShowAddModal(false);
      setNotification('Product added successfully!');
      await fetchProducts();
    } catch (err) {
      setNotification('Failed to add product');
    }
    setLoading(false);
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Clean the editProduct data, removing id and view_count
      const { id, view_count, ...updateData } = editProduct;
      
      const res = await fetch(`${API_URL}/api/products/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error updating product: ${errorText}`);
      }
      
      setEditProduct(null);
      setShowEditModal(false);
      setNotification('Product updated successfully!');
      await fetchProducts();
    } catch (err) {
      console.error('Update error:', err);
      setNotification(`Failed to update product: ${err.message}`);
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error deleting product: ${errorText}`);
      }
      
      setNotification('Product deleted successfully!');
      await fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      setNotification(`Failed to delete product: ${err.message}`);
    }
    setLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setChangePasswordError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(changePasswordData)
      });

      if (!res.ok) {
        const errData = await res.json();
        setChangePasswordError(errData.detail || 'Failed to change password');
        setLoading(false);
        return;
      }

      setNotification('Password changed successfully!');
      setChangePasswordData({ current_password: '', new_password: '' });
      setView('dashboard');
    } catch (err) {
      setChangePasswordError('Network or server error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Notification timeout
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-newari-green">Admin Login</h2>
          {typeof loginError === 'string' && loginError && (
            <div className="text-red-500 mb-4">{loginError}</div>
          )}
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-6 px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-newari-green text-white py-2 rounded hover:bg-newari-green/90 transition-all font-semibold" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <div className="flex items-center mb-10 px-4">
          <img src="/lovable-uploads/Newarilogo.png" alt="Newari Logo" className="h-12" />
        </div>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setView('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view==='dashboard'?'bg-newari-green text-white shadow-lg':'hover:bg-gray-100 text-dark-gray'}`}>
            <FaChartBar size={22} />
            <span className="font-semibold">Dashboard</span>
          </button>
          <button onClick={() => setView('products')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view==='products'?'bg-newari-green text-white shadow-lg':'hover:bg-gray-100 text-dark-gray'}`}>
            <FaBoxOpen size={22} />
            <span className="font-semibold">Products</span>
          </button>
          <button onClick={() => setView('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${view==='settings'?'bg-newari-green text-white shadow-lg':'hover:bg-gray-100 text-dark-gray'}`}>
            <FaCog size={22} />
            <span className="font-semibold">Settings</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 mt-auto transition-all">
            <FaSignOutAlt size={22} />
            <span className="font-semibold">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {notification && <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">{notification}</div>}
        
        {view === 'dashboard' && (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-newari-green">Dashboard</h1>
            
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Unique Visitors */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-lg font-semibold text-dark-gray">Unique Visitors</span>
                  <div className="w-12 h-12 bg-newari-green/10 rounded-full flex items-center justify-center">
                    <FaUser className="text-newari-green" size={24}/>
                  </div>
                </div>
                <span className="text-5xl font-bold text-newari-green mt-4">{analytics?.unique_visitors ?? '--'}</span>
                <span className="text-gray-500 mt-2">in the last {period}</span>
              </div>

              {/* Total Visits */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-lg font-semibold text-dark-gray">Total Visits</span>
                  <div className="w-12 h-12 bg-grain-brown/10 rounded-full flex items-center justify-center">
                    <FaChartBar className="text-grain-brown" size={24}/>
                  </div>
                </div>
                <span className="text-5xl font-bold text-grain-brown mt-4">{analytics?.total_visits ?? '--'}</span>
                <span className="text-gray-500 mt-2">in the last {period}</span>
              </div>

              {/* Total Product Views */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-lg font-semibold text-dark-gray">Product Views</span>
                   <div className="w-12 h-12 bg-newari-green/10 rounded-full flex items-center justify-center">
                    <FaBoxOpen className="text-newari-green" size={24}/>
                  </div>
                </div>
                <span className="text-5xl font-bold text-newari-green mt-4">{(Object.values(analytics?.productViews || {}) as number[]).reduce((a, b) => a + b, 0) ?? '--'}</span>
                <span className="text-gray-500 mt-2">all time</span>
              </div>
              
              {/* Conversion Rate (Placeholder) */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-lg font-semibold text-dark-gray">Conversion Rate</span>
                   <div className="w-12 h-12 bg-grain-brown/10 rounded-full flex items-center justify-center">
                    <FaChartBar className="text-grain-brown" size={24}/>
                  </div>
                </div>
                <span className="text-5xl font-bold text-grain-brown mt-4">5.8%</span>
                <span className="text-gray-500 mt-2">in the last {period}</span>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Visits Over Time */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-bold text-xl text-dark-gray mb-4">Visits Over Time</h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics?.visits_over_time || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Geographical Distribution */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-bold text-xl text-dark-gray mb-4">Visitor Locations</h2>
                <ul className="space-y-2 mb-4">
                  {analytics && (Object.entries(analytics.geo) as [string, number][]).map(([k, v]) => (
                    <li key={k} className="flex justify-between items-center">
                      <span className="text-dark-gray">{k}</span>
                      <span className="font-bold text-newari-green">{v} ({((v / analytics.total_visits) * 100).toFixed(1)}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
             <div className="flex gap-4 mt-8 items-center">
              <label className="font-semibold text-dark-gray">Time Period:</label>
              <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-newari-green">
                <option value="day">Last 24 Hours</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        )}

        {view === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-newari-green">Products</h1>
              <button onClick={() => { setShowAddModal(true); setNewProduct({ name: '', image: '', description: '' }); }} className="bg-newari-green text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                <FaPlus /> Add Product
              </button>
            </div>
            
            <div className="mb-6">
              <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-3 border rounded-lg w-full max-w-sm shadow-sm focus:ring-2 focus:ring-newari-green"/>
            </div>
            
            {productsError && <div className="text-red-500 mb-4 bg-red-100 p-4 rounded-lg">{productsError}</div>}
            
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-4 text-left font-semibold text-dark-gray">Name</th>
                    <th className="p-4 text-left font-semibold text-dark-gray">Image</th>
                    <th className="p-4 text-left font-semibold text-dark-gray">Description</th>
                    <th className="p-4 text-left font-semibold text-dark-gray">Views</th>
                    <th className="p-4 text-left font-semibold text-dark-gray">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, index) => (
                    <tr key={p.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-4 font-semibold text-dark-gray">{p.name}</td>
                      <td className="p-4">
                        <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                      </td>
                      <td className="p-4 max-w-sm text-dark-gray/80">
                        <p className="truncate">{p.description}</p>
                      </td>
                      <td className="p-4 text-dark-gray">{p.view_count}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditProduct({...p}); setShowEditModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all">
                            <FaEdit /> Edit
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-all">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'settings' && (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-newari-green">Settings</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-6 text-center text-newari-green">Change Password</h2>
              {changePasswordError && (
                <div className="text-red-500 mb-4">{changePasswordError}</div>
              )}
              <form onSubmit={handleChangePassword}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={changePasswordData.current_password}
                  onChange={e => setChangePasswordData({ ...changePasswordData, current_password: e.target.value })}
                  className="w-full mb-4 px-4 py-2 border rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={changePasswordData.new_password}
                  onChange={e => setChangePasswordData({ ...changePasswordData, new_password: e.target.value })}
                  className="w-full mb-6 px-4 py-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-newari-green text-white py-2 rounded hover:bg-newari-green/90 transition-all font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleAddProduct} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
              <button type="button" onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
              <h2 className="text-2xl font-bold mb-6 text-center text-newari-green">Add New Product</h2>
              <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-newari-green" required />
              <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-newari-green" />
              <textarea placeholder="Product Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full mb-6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-newari-green h-24 resize-none"></textarea>
              <button type="submit" className="w-full bg-newari-green text-white py-3 rounded-lg hover:bg-newari-green/90 transition-all font-semibold" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
            </form>
          </div>
        )}
        
        {/* Edit Product Modal */}
        {showEditModal && editProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleEditProduct} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
              <button type="button" onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
              <h2 className="text-2xl font-bold mb-6 text-center text-newari-green">Edit Product</h2>
              <input type="text" placeholder="Product Name" value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-newari-green" required />
              <input type="text" placeholder="Image URL" value={editProduct.image} onChange={e => setEditProduct({ ...editProduct, image: e.target.value })} className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-newari-green" />
              <textarea placeholder="Product Description" value={editProduct.description} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} className="w-full mb-6 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-newari-green h-24 resize-none"></textarea>
              <button type="submit" className="w-full bg-newari-green text-white py-3 rounded-lg hover:bg-newari-green/90 transition-all font-semibold" disabled={loading}>{loading ? 'Updating...' : 'Update Product'}</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin; 