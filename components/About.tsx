import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-12 bg-white scroll-mt-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="reveal p-6 bg-gray-50 rounded-xl border border-gray-100 hover-lift-smooth text-center group hover:bg-white transition-colors duration-300">
                        <i className="fas fa-hospital-user text-4xl text-medical-600 mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"></i>
                        <h3 className="text-xl font-bold mb-2">Professional Service</h3>
                        <p className="text-gray-600">Experienced pharmacists providing the right guidance for your medication and wellness needs.</p>
                    </div>
                    <div className="reveal reveal-delay-100 p-6 bg-gray-50 rounded-xl border border-gray-100 hover-lift-smooth text-center group hover:bg-white transition-colors duration-300">
                        <i className="fas fa-map-marked-alt text-4xl text-medical-600 mb-4 transition-transform duration-500 group-hover:scale-110"></i>
                        <h3 className="text-xl font-bold mb-2">Easy Location</h3>
                        <p className="text-gray-600">Located conveniently on Main Road, Hanwara (814154). Easy to reach for all local residents.</p>
                    </div>
                    <div className="reveal reveal-delay-200 p-6 bg-gray-50 rounded-xl border border-gray-100 hover-lift-smooth text-center group hover:bg-white transition-colors duration-300">
                        <i className="fas fa-award text-4xl text-medical-600 mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"></i>
                        <h3 className="text-xl font-bold mb-2">Authentic Products</h3>
                        <p className="text-gray-600">We stock only genuine, certified medicines from trusted manufacturers and suppliers.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;