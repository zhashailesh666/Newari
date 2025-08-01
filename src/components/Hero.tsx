
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-newari-green/10 to-light-beige overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/Front.jpg" 
          alt="Premium rice fields and farming landscape"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-white/70 to-neutral-white/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-dark-gray mb-6 leading-tight drop-shadow-sm">
            Introducing <span className="text-newari-green drop-shadow-sm">Newari</span>
            <br />
            <span className="text-2xl md:text-4xl font-medium text-grain-brown drop-shadow-sm">
              Premium Rice for Nepal's Dealers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-dark-gray/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Discover our collection of 6 premium rice varieties, carefully sourced and packaged 
            to meet the highest standards for dealers across all 7 provinces of Nepal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={scrollToProducts}
              className="bg-newari-green text-white px-8 py-4 rounded-xl hover:bg-newari-green/90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Product Catalog
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-grain-brown text-grain-brown px-8 py-4 rounded-xl hover:bg-grain-brown hover:text-white transition-all font-semibold text-lg shadow-md"
            >
              Become a Dealer
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown 
              size={32} 
              className="text-newari-green mx-auto cursor-pointer hover:text-newari-green/80 transition-colors drop-shadow-sm"
              onClick={scrollToProducts}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
