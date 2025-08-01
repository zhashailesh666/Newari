
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-grain-brown text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <button onClick={() => scrollToSection('home')} className="cursor-pointer">
                <img 
                  src="/lovable-uploads/Newarilogo.png" 
                  alt="Newari Logo"
                  className="h-16 w-auto object-contain"
                />
              </button>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Empowering Nepal's rice dealers with high-quality, affordable grains sourced 
              from the finest agricultural regions across all 7 provinces.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white/60" />
                <span className="text-sm">infonewari@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-white/60" />
                <span className="text-sm">+977 9709086670</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-white/60" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-white/80 hover:text-white transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <p className="text-white/80 mb-4">
              Subscribe to get updates on new varieties and special offers for dealers.
            </p>
            
            <div className="flex gap-2 mb-6">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-newari-green px-6 py-2 rounded-lg hover:bg-newari-green/90 transition-colors font-medium">
                Subscribe
              </button>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm text-white/80 mb-3">Follow us on social media</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/newaririce/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/newari_rice/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Newari Rice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
