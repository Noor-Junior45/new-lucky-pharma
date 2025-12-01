import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-r from-medical-50 via-white to-medical-50 animate-gradient-x overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left z-10">
                    <div className="animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-medical-100 text-medical-800 text-sm font-semibold mb-4 shadow-sm hover:scale-105 transition-transform duration-300">
                            <i className="fas fa-check-circle mr-1"></i> Hanwara's Trusted Chemist
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Your Health is Our <br />
                            <span className="text-medical-600">Top Priority</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                            Providing authentic medicines, healthcare products, and professional guidance to the Hanwara community. Open 7 days a week.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <a href="tel:+919798881368" className="bg-medical-600 hover:bg-medical-700 text-white font-medium py-3 px-8 rounded-full transition shadow-lg flex items-center justify-center w-full sm:w-auto transform active:scale-95 hover:-translate-y-1">
                            <i className="fas fa-phone-alt mr-2"></i> Call Now
                        </a>
                        <a href="https://www.google.com/search?q=New+Lucky+Pharma+Hanwara+Jharkhand" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-medical-600 text-medical-600 hover:bg-medical-50 font-bold py-3 px-8 rounded-lg transition flex items-center justify-center w-full sm:w-auto transform active:scale-95 hover:-translate-y-1">
                            <i className="fas fa-store mr-2"></i> Visit Store
                        </a>
                    </div>
                </div>
                
                <div className="md:w-1/2 flex justify-center w-full reveal reveal-delay-200">
                    <div className="relative animate-float">
                        <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-medical-200 rounded-full opacity-50 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl relative z-10 max-w-sm w-full border border-white/50">
                            <div className="flex items-center space-x-4 mb-6 hover:scale-105 transition-transform duration-300 cursor-default group">
                                <div className="bg-medical-100 p-3 rounded-full group-hover:rotate-12 transition-transform duration-300">
                                    <i className="fas fa-heartbeat text-2xl text-medical-600"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">Health Checkup</h3>
                                    <p className="text-sm text-gray-500">Regular monitoring</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 mb-6 hover:scale-105 transition-transform duration-300 cursor-default group">
                                <div className="bg-blue-100 p-3 rounded-full group-hover:rotate-12 transition-transform duration-300">
                                    <i className="fas fa-prescription-bottle-alt text-2xl text-blue-600"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">Genuine Medicines</h3>
                                    <p className="text-sm text-gray-500">100% Authentic</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300 cursor-default group">
                                <div className="bg-orange-100 p-3 rounded-full group-hover:rotate-12 transition-transform duration-300">
                                    <i className="fas fa-user-nurse text-2xl text-orange-600"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">Expert Advice</h3>
                                    <p className="text-sm text-gray-500">Qualified Pharmacists</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;