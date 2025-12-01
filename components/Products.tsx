import React, { useState } from 'react';
import { Product } from '../types';
import { searchProducts } from '../services/geminiService';

const productList: Product[] = [
    { id: 1, name: 'Paracetamol', description: 'Effective fever reducer and pain reliever. Essential for every home.', image: 'https://d1ymz67w5raq8g.cloudfront.net/Pictures/2000xAny/1/2/0/532120_paracetamolbackgroundinformationcoverimage_807319_crop.jpg' },
    { id: 2, name: 'Cough Syrup', description: 'Relief for dry and wet coughs. Soothing formulas available.', image: 'https://images.ctfassets.net/kytey10holgp/5FPrOzDkawr1lGCLvYYFGP/2b44fafe8505a7e413a048226a7b3ebc/thumbnail_Benedryl_201.jpg?fm=webp&w=3840', delay: 'reveal-delay-100' },
    { id: 3, name: 'Horlicks', description: 'Nutritious malt drink for energy and growth. Great for kids & adults.', image: 'https://lh3.googleusercontent.com/fb7jMmrNPApgI4evL2h8mKB0aPrWmbmB1QSd_xhaSfQPOi4YoOqZAT_P3EegvCQW18w53Y8JZMmKYTfv=s265-w265-h265', delay: 'reveal-delay-200' },
    { id: 4, name: 'SBL Homeopathy', description: 'Complete range of SBL dilutions, tonics, and bio-chemic medicines.', image: 'https://homeobasket.com/wp-content/uploads/2023/04/Belladonna-3.jpg', delay: 'reveal-delay-300' },
    { id: 5, name: 'Antibiotics', description: 'A range of tablets, syrups, and capsules (prescription required).', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeMj3HS5XkhB0-mS1asr7y9OoXKqUMgyfSqA&s' },
    { id: 6, name: 'Injections & Syringes', description: 'Sterile syringes, needles, and injectable medications (prescription only).', image: 'https://apthorprx.com/wp-content/uploads/2022/01/apthorp-rx-Ignorance-About-Injections-Why-Some-Medications-Are-In-Shot-Form.jpg', delay: 'reveal-delay-100' },
    { id: 7, name: 'First Aid', description: 'Antiseptic lotions, antibiotic creams, bandages, and cotton.', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', delay: 'reveal-delay-200' },
    { id: 8, name: 'Vitamins', description: 'Multivitamins to support immunity and fill nutritional gaps.', image: 'https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/bp-wellness-centrum/en_US/sliced-images/global/articles/how-supplements-and-multivitamins-work-together-image.jpg?auto=format', delay: 'reveal-delay-300' },
    { id: 9, name: 'Pain Relief', description: 'Ibuprofen, Aspirin, ointments, and sprays for muscle and joint pain.', image: 'https://cdn01.pharmeasy.in/dam/products_otc/183157/volini-pain-relief-gel-tube-of-75-g-6.1-1712726723.jpg' },
    { id: 10, name: 'Baby Care Essentials', description: 'Gentle lotions, shampoos, oils, and complete hygiene kits for your little one.', image: 'https://m.media-amazon.com/images/I/51-lpxBJF+L._AC_UF894,1000_QL80_.jpg', delay: 'reveal-delay-100' },
    { id: 11, name: 'Honey', description: 'Pure and natural Dabur Honey. Perfect for immunity and overall wellness.', image: 'https://1mg-gumlet.s3.amazonaws.com/sku_star_content_images%2F2025-01%2F1736841598_0.jpg', delay: 'reveal-delay-200' },
    { id: 12, name: 'ORS (Electral)', description: 'Oral Rehydration Salts to restore body fluids and electrolytes.', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f91b13a0-11d8-4b6f-8391-12933bbbcea7.png', delay: 'reveal-delay-300' },
    { id: 13, name: 'Thermometer', description: 'Quick and accurate temperature readings. Essential for fever monitoring.', image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240514234837/Clinical-Thermometer-Diagram-copy.webp', delay: 'reveal-delay-100' },
    { id: 14, name: 'Vicks VapoRub', description: 'Relief from cold, cough, and blocked nose. Trusted ayurvedic formula.', image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/40786a25-49fe-4993-a3b6-a3e299496ec0.__CR0,0,970,600_PT0_SX970_V1___.jpg', delay: 'reveal-delay-200' },
    { id: 15, name: 'Medicated Powder', description: 'Instant cooling relief from prickly heat, itching, and burning sensation.', image: 'https://m.media-amazon.com/images/I/71tKRd6bsyL._AC_UF350,350_QL80_.jpg', delay: 'reveal-delay-300' },
];

const Products: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>(productList);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isAiResult, setIsAiResult] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsFocused(false);
        
        if (!searchQuery.trim()) {
            setDisplayedProducts(productList);
            setHasSearched(false);
            setIsAiResult(false);
            return;
        }

        setHasSearched(true);
        setIsSearching(true);
        setIsAiResult(false);

        const lowerQuery = searchQuery.toLowerCase();
        const localResults = productList.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) || 
            p.description.toLowerCase().includes(lowerQuery)
        );

        if (localResults.length > 0) {
            setDisplayedProducts(localResults);
            setIsSearching(false);
        } else {
            const aiResults = await searchProducts(searchQuery);
            setDisplayedProducts(aiResults);
            setIsAiResult(true);
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setDisplayedProducts(productList);
        setHasSearched(false);
        setIsAiResult(false);
        setIsSearching(false);
        document.getElementById('product-search-input')?.focus();
    };

    return (
        <section id="products" className="bg-medical-50 scroll-mt-24 min-h-[800px] transition-all duration-500 relative" aria-label="Products Section">
            
            {/* Mobile Search Focus Backdrop */}
            {isFocused && !hasSearched && (
                <div 
                    className="fixed inset-0 bg-black/40 z-[55] md:hidden backdrop-blur-sm transition-opacity animate-fade-in" 
                    onClick={() => setIsFocused(false)}
                    aria-hidden="true"
                ></div>
            )}

            <div className="container mx-auto px-4 py-16">
                
                <div className={`transition-all duration-700 ease-in-out flex flex-col items-center ${hasSearched ? 'mt-0 mb-8' : 'mt-20 mb-20'}`}>
                    <div className="text-center mb-8 reveal">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Products & Medicines</h2>
                        <p className={`text-gray-600 max-w-2xl mx-auto transition-opacity duration-500 ${hasSearched ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                            We offer a wide range of pharmaceutical products, from daily essentials to specific treatments.
                        </p>
                    </div>

                    <div className={`
                        w-full max-w-2xl z-20 transition-all duration-300
                        ${(isFocused && !hasSearched) 
                            ? 'fixed top-0 left-0 right-0 w-full px-4 py-4 bg-white shadow-lg z-[60] md:relative md:top-auto md:left-auto md:bg-transparent md:shadow-none md:p-0 md:w-full animate-slide-down' 
                            : 'relative'}
                    `}>
                        <form onSubmit={handleSearch} className="relative group w-full" role="search">
                            <label htmlFor="product-search-input" className="sr-only">Search medicines, products, or symptoms</label>
                            <div className={`absolute inset-0 bg-gradient-to-r from-medical-400 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300 ${isSearching ? 'animate-pulse' : ''} ${isFocused ? 'hidden md:block' : ''}`}></div>
                            <input 
                                id="product-search-input"
                                type="search" 
                                value={searchQuery}
                                onFocus={() => setIsFocused(true)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search medicines, products, or symptoms..." 
                                className="w-full bg-white border-2 border-gray-100 text-gray-800 text-lg rounded-full py-4 pl-6 pr-24 shadow-lg focus:outline-none focus:border-medical-500 focus:shadow-xl transition-all duration-300 relative z-10"
                                aria-label="Search medicines, products, or symptoms"
                            />
                            
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 z-20 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}

                            <button 
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-medical-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-medical-700 transition z-20 shadow-md group-hover:scale-110"
                                aria-label={isSearching ? "Searching..." : "Search"}
                                disabled={isSearching}
                            >
                                {isSearching ? (
                                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                                ) : (
                                    <i className="fas fa-search" aria-hidden="true"></i>
                                )}
                            </button>
                        </form>
                        {isAiResult && !isSearching && (
                            <div className="text-center mt-2 text-xs text-gray-500 flex items-center justify-center gap-1 animate-slide-up" role="status">
                                <i className="fab fa-google text-medical-600" aria-hidden="true"></i>
                                <span>Results found via Google AI</span>
                            </div>
                        )}
                        
                        {isFocused && (
                            <button 
                                onClick={() => setIsFocused(false)}
                                className="md:hidden absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium bg-white/80 px-4 py-1 rounded-full shadow-sm"
                                aria-label="Close search mode"
                            >
                                <i className="fas fa-times-circle mr-1" aria-hidden="true"></i> Close
                            </button>
                        )}
                    </div>
                </div>

                <div 
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${isSearching ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}
                    role="region"
                    aria-label="Search Results"
                    aria-live="polite"
                >
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <div key={product.id} className={`reveal ${product.delay || ''} bg-white rounded-lg shadow-md hover-lift-smooth overflow-hidden flex flex-col h-full group animate-slide-up hover:scale-[1.02] transition-transform duration-300`}>
                                <div className="overflow-hidden h-48 p-4 relative">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        loading="lazy"
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    {isAiResult && (
                                        <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full animate-scale-up">
                                            AI Found
                                        </span>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{product.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 animate-fade-in" role="status">
                            <div className="text-gray-400 mb-4">
                                <i className="fas fa-search text-4xl" aria-hidden="true"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-600">No products found</h3>
                            <p className="text-gray-500">Try searching for generic terms like "Pain killer" or "Cough syrup"</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Products;