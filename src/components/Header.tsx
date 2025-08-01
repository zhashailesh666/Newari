
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => scrollToSection('home')} className="cursor-pointer">
              <img 
                src="/lovable-uploads/Newarilogo.png" 
                alt="Newari Logo"
                className="h-16 w-auto object-contain"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-dark-gray hover:text-newari-green transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className="text-dark-gray hover:text-newari-green transition-colors font-medium"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-dark-gray hover:text-newari-green transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-newari-green text-white px-6 py-2 rounded-lg hover:bg-newari-green/90 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark-gray"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white rounded-lg shadow-md">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-dark-gray hover:text-newari-green transition-colors font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-dark-gray hover:text-newari-green transition-colors font-medium text-left"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-dark-gray hover:text-newari-green transition-colors font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-newari-green text-white px-6 py-2 rounded-lg hover:bg-newari-green/90 transition-all font-medium text-left w-fit shadow-lg"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
