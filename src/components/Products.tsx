import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const API_URL = '';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    trackProductView(product.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Track visitor and product view
  const trackProductView = async (productId) => {
    fetch(`${API_URL}/api/analytics/track`, { method: 'POST' });
    fetch(`${API_URL}/api/products/${productId}`);
  };

  return (
    <section id="products" className="py-20 bg-neutral-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">
            Our Premium <span className="text-newari-green">Rice Collection</span>
          </h2>
          <p className="text-lg text-dark-gray/80 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium rice varieties, sourced from the finest fields across Nepal's diverse regions.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-newari-green rounded-full"></div>
              <span className="text-sm text-dark-gray/70">Premium Grade A+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-grain-brown rounded-full"></div>
              <span className="text-sm text-dark-gray/70">Multiple Sizes Available</span>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="text-center mb-8">
          <select 
            value={showAll ? 'all' : 'limited'}
            onChange={(e) => setShowAll(e.target.value === 'all')}
            className="bg-white border-2 border-newari-green text-newari-green px-6 py-3 rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-newari-green/50"
          >
            <option value="limited">Show Featured Products (6)</option>
            <option value="all">View All Products ({products.length})</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAll ? products : products.slice(0, 6)).map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              sizes={product.sizes || []}
              origin={product.origin || ''}
              grainType={product.grainType || ''}
              grade={product.grade || ''}
              onViewDetails={() => handleViewDetails(product)}
            />
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Products;
