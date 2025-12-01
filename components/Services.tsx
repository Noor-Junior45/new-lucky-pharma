import React from 'react';

const Services: React.FC = () => {
    return (
        <section id="services" className="py-16 bg-white scroll-mt-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 reveal group overflow-hidden rounded-2xl animate-fade-in">
                        <img 
                            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                            alt="Pharmacy Shelf" 
                            className="rounded-2xl shadow-xl w-full object-cover h-64 md:h-96 transform transition duration-700 group-hover:scale-110"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-6 reveal">Complete Healthcare Services</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start reveal reveal-delay-100 hover:translate-x-2 transition-transform duration-300 cursor-default p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center mt-1 animate-pulse">
                                    <i className="fas fa-file-medical text-medical-600"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold">Prescription Fulfillment</h3>
                                    <p className="text-gray-600">Accurate and timely dispensing of medicines prescribed by your doctor.</p>
                                </div>
                            </li>
                            <li className="flex items-start reveal reveal-delay-200 hover:translate-x-2 transition-transform duration-300 cursor-default p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center mt-1 animate-pulse" style={{ animationDelay: '0.5s' }}>
                                    <i className="fas fa-baby text-medical-600"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold">Baby & Mother Care</h3>
                                    <p className="text-gray-600">Everything you need for mother and baby health, from supplements to hygiene.</p>
                                </div>
                            </li>
                            <li className="flex items-start reveal reveal-delay-300 hover:translate-x-2 transition-transform duration-300 cursor-default p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center mt-1 animate-pulse" style={{ animationDelay: '1s' }}>
                                    <i className="fas fa-leaf text-medical-600"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold">Homeopathic Care</h3>
                                    <p className="text-gray-600">Authorized stockist of SBL World Class Homeopathy and other trusted brands.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;