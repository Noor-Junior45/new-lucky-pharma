import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Products', href: '#products' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-md fixed w-full z-50 transition-all duration-300 animate-slide-down">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2 md:gap-3 group">
                    <img 
                        src="https://lh3.googleusercontent.com/a-/ALV-UjW16NO-HcOCgjkAneSgknSZdMMp2TPGJ0qlrjqsiXALg1VuaQ0=s265-w265-h265" 
                        alt="New Lucky Pharma Logo" 
                        className="h-8 md:h-10 w-auto object-contain rounded group-hover:rotate-12 transition-transform duration-500"
                    />
                    <span className="text-lg md:text-2xl font-bold tracking-tight text-medical-800 leading-tight">
                        New Lucky Pharma
                    </span>
                </a>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden text-gray-600 focus:outline-none p-2"
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 font-medium text-gray-600">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href} 
                            className="nav-link hover:text-medical-600 transition hover:-translate-y-0.5 duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#map-location" className="nav-link text-medical-600 font-bold hover:text-medical-700 transition flex items-center cursor-pointer hover:scale-105 duration-300">
                        <i className="fas fa-map-marker-alt mr-1"></i> Directions
                    </a>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 p-4 shadow-xl absolute w-full left-0 top-full transform transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
            >
                {navLinks.map((link) => (
                    <a 
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className="block py-3 px-4 text-gray-700 hover:bg-medical-50 hover:text-medical-600 rounded-lg transition font-medium"
                    >
                        {link.name}
                    </a>
                ))}
                <a 
                    href="#map-location"
                    onClick={closeMenu}
                    className="block py-3 px-4 text-medical-700 bg-medical-50 hover:bg-medical-100 rounded-lg transition font-bold cursor-pointer mt-2"
                >
                    <i className="fas fa-map-marked-alt w-6"></i> Directions
                </a>
            </div>
        </nav>
    );
};

export default Navbar;