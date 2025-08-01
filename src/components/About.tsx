
import { MapPin, Award, Users, Truck } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-light-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-dark-gray mb-4">
              About <span className="text-newari-green">Newari Rice</span>
            </h2>
            <p className="text-lg text-dark-gray/80 max-w-3xl mx-auto leading-relaxed">
              Empowering Nepal's rice dealers with high-quality, affordable grains sourced 
              from the finest agricultural regions across all 7 provinces of Nepal.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-scale-in">
              <div className="w-16 h-16 bg-newari-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-newari-green" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray mb-2">25+</h3>
              <p className="text-dark-gray/70">Rice Varieties</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-scale-in">
              <div className="w-16 h-16 bg-grain-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-grain-brown" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray mb-2">7</h3>
              <p className="text-dark-gray/70">Provinces Served</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-scale-in">
              <div className="w-16 h-16 bg-newari-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-newari-green" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray mb-2">500+</h3>
              <p className="text-dark-gray/70">Happy Dealers</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-scale-in">
              <div className="w-16 h-16 bg-grain-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-grain-brown" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray mb-2">99%</h3>
              <p className="text-dark-gray/70">On-Time Delivery</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-dark-gray mb-4">OUR LEGACY</h3>
                <p className="text-dark-gray/80 leading-relaxed">
                  Newari rice legacy reflects the rich cultural heritage and 
                  agricultural practices of the community. Traditionally, it's not 
                  just a staple food but also plays a vital role in festivals, rituals, 
                  and social gatherings. Ancient texts and carvings reflect rice's 
                  significance in rituals, trade, and daily life, showcasing its 
                  enduring importance. The cultivation of rice in the region 
                  showcases traditional farming methods, with emphasis on 
                  sustainability and biodiversity.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-dark-gray mb-4">Our mission</h3>
                <p className="text-dark-gray/80 leading-relaxed">
                  To celebrate and share the rich culinary heritage of Newar cuisine 
                  through authentic, high-quality Newari rice dishes, fostering 
                  community connections and promoting healthy, 
                  sustainable eating.
                </p>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                <img 
                  src="/lovable-uploads/Back.jpg" 
                  alt="Rice cultivation and traditional farming"
                  className="w-full h-64 object-cover rounded-xl mb-6 opacity-80"
                />
                
                {/* Packaging Section */}
                <div className="bg-gradient-to-r from-newari-green/10 to-grain-brown/10 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-dark-gray mb-4">Consistent Quality. Trusted Packaging.</h4>
                  <p className="text-dark-gray/80 mb-4">
                    Designed for visibility and protection — every Newari pack reflects our promise of quality.
                  </p>
                  
                  {/* Size indicators */}
                  <div className="flex flex-wrap gap-2">
                    {['1kg', '2kg', '5kg', '20kg', '25kg', '30kg'].map((size) => (
                      <span 
                        key={size}
                        className="bg-white text-grain-brown px-3 py-1 rounded-full text-sm font-medium border border-grain-brown/20"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
