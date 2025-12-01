import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            text: "Hello! 👋 I'm your AI Pharmacist assistant. \n\nAsk me about: \n💊 Medicine uses \n🤒 Common symptoms \n🌿 Home remedies \n\nNote: I am an AI, not a doctor. Please consult a professional for serious advice.",
            isUser: false,
            timestamp: Date.now()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            text: userText,
            isUser: true,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsLoading(true);

        const aiResponseText = await getGeminiResponse(userText);

        const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: aiResponseText,
            isUser: false,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    return (
        <>
            {/* FAB */}
            <button 
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-[90] bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 group animate-pulse"
            >
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
                </span>
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-2xl group-hover:rotate-12 transition duration-300`}></i>
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none shadow-lg">
                    ✨ AI Pharmacist
                </span>
            </button>

            {/* Modal */}
            <div 
                className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-4 backdrop-blur-sm bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={(e) => e.target === e.currentTarget && toggleChat()}
            >
                <div 
                    className={`bg-white w-full sm:max-w-md h-[85vh] sm:h-[600px] sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-0 scale-95'}`}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-medical-600 to-medical-500 p-4 flex items-center justify-between sm:rounded-t-3xl rounded-t-3xl">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <i className="fas fa-robot text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">AI Pharmacist ✨</h3>
                                <p className="text-medical-100 text-xs flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-white/80 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-start gap-3 animate-slide-up ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isUser ? 'bg-gray-200' : 'bg-medical-100'}`}>
                                    <i className={`fas ${msg.isUser ? 'fa-user text-gray-600' : 'fa-robot text-medical-600'} text-sm`}></i>
                                </div>
                                <div className={`${msg.isUser ? 'bg-medical-600 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'} p-3 rounded-2xl shadow-sm max-w-[80%] text-sm whitespace-pre-wrap`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 animate-slide-up">
                                <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-robot text-medical-600 text-sm"></i>
                                </div>
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '-0.32s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '-0.16s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSubmit} className="flex gap-2 relative">
                            <input 
                                type="text" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your health question..." 
                                className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 focus:ring-2 focus:ring-medical-500 focus:bg-white transition text-sm outline-none"
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-medical-600 hover:bg-medical-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                        <p className="text-center text-[10px] text-gray-400 mt-2">Powered by Gemini AI ✨</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIChat;