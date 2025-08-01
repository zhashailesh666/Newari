
import { useState } from 'react';
import { X, Package, MessageCircle, Mail, Facebook, Instagram } from 'lucide-react';

interface Product {
  name: string;
  image: string;
  sizes: string[];
  origin: string;
  grainType: string;
  grade: string;
  description: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');

  if (!isOpen || !product) return null;

  const handleContactUs = () => {
    const message = `Hello! I'm interested in ${product.name} (${selectedSize || 'all sizes'}). Please provide more details about pricing and availability.`;
    const whatsappUrl = `https://wa.me/9779709086670?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-light-beige">
          <h2 className="text-2xl font-bold text-dark-gray">{product.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-light-beige rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Image */}
          <div className="mb-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-contain rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-gray mb-3">Product Information</h3>
              <div className="space-y-2 text-dark-gray/80">
                <p><span className="font-medium">Origin:</span> {product.origin || 'Nepal'}</p>
                <p><span className="font-medium">Grain Type:</span> {product.grainType || 'Premium Basmati'}</p>
                <p><span className="font-medium">Quality Grade:</span> <span className="text-newari-green font-semibold">{product.grade || 'Premium A+'}</span></p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-dark-gray mb-3">Available Sizes</h3>
              <div className="space-y-2">
                {(product.sizes && product.sizes.length > 0 ? product.sizes : ['1 KG', '5 KG', '20 KG']).map((size) => (
                  <label key={size} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="size" 
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="text-newari-green focus:ring-newari-green"
                    />
                    <span className="flex items-center gap-2">
                      <Package size={16} className="text-grain-brown" />
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark-gray mb-3">Description</h3>
            <div className="text-dark-gray/80 leading-relaxed whitespace-pre-line">{product.description || 'Premium quality rice variety, carefully selected and processed to bring you the finest dining experience.'}</div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-light-beige pt-6">
            <h3 className="text-lg font-semibold text-dark-gray mb-4">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleContactUs}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <MessageCircle size={20} />
                WhatsApp Inquiry
              </button>
              <a 
                href="mailto:infonewari@gmail.com"
                className="flex items-center justify-center gap-2 bg-grain-brown text-white px-6 py-3 rounded-lg hover:bg-grain-brown/90 transition-colors font-medium"
              >
                <Mail size={20} />
                Email Us
              </a>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-dark-gray/60">Follow us:</span>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/newaririce/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/newari_rice/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
