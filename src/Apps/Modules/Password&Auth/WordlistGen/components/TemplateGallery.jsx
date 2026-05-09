import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
    Search, 
    X, 
    Star, 
    Shield, 
    Zap, 
    Database, 
    Copy, 
    Check, 
    ChevronRight,
    Lock,
    Globe,
    Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TEMPLATES = [
    {
        id: 'common-passwords',
        name: 'RockYou Optimized',
        category: 'Password Lists',
        size: '150 MB',
        words: '14.3M',
        desc: 'Industry standard list refined for modern security patterns.',
        icon: Database,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        id: 'top-100k',
        name: 'Top 100K 2024',
        category: 'Password Lists',
        size: '2.1 MB',
        words: '100K',
        desc: 'The most frequent passwords collected from recent leaks.',
        icon: Star,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    {
        id: 'default-creds',
        name: 'Admin Defaults',
        category: 'Infrastructure',
        size: '45 KB',
        words: '4.2K',
        desc: 'Comprehensive list of default router and server credentials.',
        icon: Shield,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    },
    {
        id: 'social-eng',
        name: 'Social Vector v2',
        category: 'Behavioral',
        size: '1.2 MB',
        words: '85K',
        desc: 'Words based on common social engineering and phishing patterns.',
        icon: Globe,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },
    {
        id: 'tech-stack',
        name: 'Tech Stack Keys',
        category: 'Environment',
        size: '240 KB',
        words: '18K',
        desc: 'Keywords related to cloud, devops, and infrastructure tech.',
        icon: Cpu,
        color: 'text-rose-500',
        bg: 'bg-rose-500/10'
    },
    {
        id: 'brute-mask',
        name: 'High Entropy Mask',
        category: 'Masks',
        size: 'N/A',
        words: 'Infinite',
        desc: 'Optimized masks for brute-force attacks on high-entropy passwords.',
        icon: Zap,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    }
];

const TemplateGallery = ({ isOpen, onClose, onUseTemplate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const categories = ['All', ...new Set(TEMPLATES.map(t => t.category))];

    const filteredTemplates = useMemo(() => {
        return TEMPLATES.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 t.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleCopy = (e, id) => {
        e.stopPropagation();
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-2xl flex flex-col transform-gpu"
                >
                    {/* Full Page Header Section */}
                    <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-slate-900/50 shrink-0">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <div className="space-y-0.5">
                                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
                                    Template<span className="text-red-600">Vault</span>
                                </h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Deploy high-fidelity wordlist blueprints</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search blueprints..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl w-full md:w-[350px] text-sm focus:ring-4 ring-red-500/10 outline-none transition-all text-white font-medium"
                                />
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all shadow-lg shadow-black/20"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Filter Tabs - Sticky */}
                    <div className="px-8 py-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5 bg-slate-900/30 backdrop-blur-md sticky top-0 z-20 shrink-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap border ${
                                    selectedCategory === cat 
                                    ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20' 
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 border-white/5'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Content Section - Main Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-950">
                        <div className="max-w-[1600px] mx-auto">
                            {filteredTemplates.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {filteredTemplates.map((template) => (
                                        <motion.div
                                            key={template.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="group p-5 bg-white/5 border border-white/5 rounded-[28px] hover:border-red-500/30 transition-all duration-500 relative overflow-hidden flex flex-col shadow-lg hover:shadow-red-500/5 transform-gpu"
                                        >
                                            <div className="flex justify-between items-start mb-5 relative z-10">
                                                <div className={`w-12 h-12 ${template.bg} ${template.color} rounded-xl flex items-center justify-center border border-white/10 shadow-inner`}>
                                                    <template.icon size={24} />
                                                </div>
                                                <button 
                                                    onClick={(e) => handleCopy(e, template.id)}
                                                    className="p-2.5 bg-white/5 rounded-lg text-slate-500 hover:text-red-500 transition-colors border border-white/5"
                                                >
                                                    {copiedId === template.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>

                                            <div className="space-y-2 mb-6 relative z-10">
                                                <span className="px-2 py-0.5 bg-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest rounded border border-white/5">
                                                    {template.category}
                                                </span>
                                                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-red-500 transition-colors">{template.name}</h3>
                                                <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">{template.desc}</p>
                                            </div>

                                            <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em]">Scale</span>
                                                    <span className="text-sm font-black text-white tabular-nums">{template.words} <span className="text-[9px] font-bold text-slate-500">WORDS</span></span>
                                                </div>
                                                <button 
                                                    onClick={() => onUseTemplate(template)}
                                                    className="px-5 py-2.5 bg-white text-slate-950 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 flex items-center gap-2 shadow-lg"
                                                >
                                                    DEPLOY
                                                    <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20">
                                    <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-[40px] flex items-center justify-center mb-6 shadow-inner">
                                        <Search size={32} className="opacity-20 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">No Blueprints Found</h4>
                                    <p className="text-sm text-slate-500 font-medium max-w-xs text-center leading-relaxed">Try using different keywords or filter by category.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer - Full Page */}
                    <div className="p-6 border-t border-white/5 bg-slate-900/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
                        <div className="flex items-center gap-6 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Lock size={14} className="text-red-500" /> AES-256</span>
                            <span className="flex items-center gap-2"><Zap size={14} className="text-amber-500" /> GPU Ready</span>
                            <span className="flex items-center gap-2"><Shield size={14} className="text-emerald-500" /> Verified</span>
                        </div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">© 2024 CyproVexto • v4.2.0</p>
                    </div>

                    <style jsx>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 20px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.1);
                        }
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default TemplateGallery;
