
import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-neutral-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-dark-gray mb-4">
              Get in <span className="text-newari-green">Touch</span>
            </h2>
            <p className="text-lg text-dark-gray/80 max-w-2xl mx-auto leading-relaxed">
              Ready to become a Newari Rice dealer? Contact us today for wholesale pricing, 
              product catalogs, and partnership opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-dark-gray mb-6">Send us an Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-dark-gray font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-light-beige rounded-lg focus:ring-2 focus:ring-newari-green focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-dark-gray font-medium mb-2">
                      Company / Dealer Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-light-beige rounded-lg focus:ring-2 focus:ring-newari-green focus:border-transparent transition-all"
                      placeholder="Your business name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-dark-gray font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-light-beige rounded-lg focus:ring-2 focus:ring-newari-green focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-dark-gray font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-light-beige rounded-lg focus:ring-2 focus:ring-newari-green focus:border-transparent transition-all"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-dark-gray font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-light-beige rounded-lg focus:ring-2 focus:ring-newari-green focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your requirements, quantities needed, location, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-newari-green text-white py-4 rounded-lg hover:bg-newari-green/90 transition-all font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-gradient-to-br from-newari-green/10 to-grain-brown/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-dark-gray mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-newari-green/20 rounded-lg flex items-center justify-center">
                      <Mail className="text-newari-green" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-dark-gray">Email</p>
                      <p className="text-dark-gray/80">infonewari@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-grain-brown/20 rounded-lg flex items-center justify-center">
                      <Phone className="text-grain-brown" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-dark-gray">Phone</p>
                      <p className="text-dark-gray/80">+977 9709086670</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-newari-green/20 rounded-lg flex items-center justify-center">
                      <MapPin className="text-newari-green" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-dark-gray">Head Office</p>
                      <p className="text-dark-gray/80">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-dark-gray mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/9779709086670"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="text-green-600" size={24} />
                    <div>
                      <p className="font-medium text-dark-gray">WhatsApp</p>
                      <p className="text-sm text-dark-gray/70">Get instant responses</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:infonewari@gmail.com"
                    className="flex items-center gap-4 p-4 bg-grain-brown/10 rounded-lg hover:bg-grain-brown/20 transition-colors"
                  >
                    <Mail className="text-grain-brown" size={24} />
                    <div>
                      <p className="font-medium text-dark-gray">Email</p>
                      <p className="text-sm text-dark-gray/70">Detailed inquiries</p>
                    </div>
                  </a>
                </div>

                {/* Social Media */}
                <div className="mt-6 pt-6 border-t border-light-beige">
                  <p className="text-dark-gray font-medium mb-4">Follow us on social media</p>
                  <div className="flex gap-4">
                    <a 
                      href="https://www.facebook.com/newaririce/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/newari_rice/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
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

export default Contact;
