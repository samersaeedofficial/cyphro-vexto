import React, { useState, useMemo } from 'react';
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
    Cpu,
    ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

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

const TemplateGallery = ({ onClose, onUseTemplate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedId, setCopiedId] = useState(null);

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

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#0b0f1a] flex flex-col transform-gpu">
            {/* Full Page Header Section */}
            <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={onClose}
                        className="p-4 bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-slate-500 dark:text-slate-400 rounded-2xl transition-all shadow-sm group"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                                <Star size={20} fill="currentColor" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">
                                Template<span className="text-red-600">Vault</span>
                            </h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Deploy high-fidelity wordlist blueprints and presets instantly.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search blueprints..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-14 pr-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[24px] w-full md:w-[400px] text-base focus:ring-4 ring-red-500/10 outline-none transition-all dark:text-white font-medium shadow-sm"
                        />
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-[20px] transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Filter Tabs - Sticky */}
            <div className="px-12 py-6 flex gap-3 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md sticky top-0 z-20 shrink-0">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all whitespace-nowrap ${
                            selectedCategory === cat 
                            ? 'bg-red-600 text-white shadow-xl shadow-red-600/20 scale-105' 
                            : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Content Section - Main Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-12 md:p-16 custom-scrollbar bg-[#f8fafc] dark:bg-[#0b0f1a]">
                <div className="max-w-[1400px] mx-auto">
                    {filteredTemplates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTemplates.map((template) => (
                                <motion.div
                                    key={template.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group p-8 bg-white dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 rounded-[40px] hover:border-red-500/30 transition-all duration-500 relative overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:shadow-red-500/5"
                                >
                                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-600/20 to-transparent -mr-20 -mt-20 rounded-full group-hover:scale-150 transition-transform duration-1000`} />
                                    
                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div className={`w-16 h-16 ${template.bg} ${template.color} rounded-2xl flex items-center justify-center shadow-inner border border-white/20`}>
                                            <template.icon size={32} />
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => handleCopy(e, template.id)}
                                                className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-400 hover:text-red-500 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                            >
                                                {copiedId === template.id ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-10 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                                                {template.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-red-500 transition-colors">{template.name}</h3>
                                        <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{template.desc}</p>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Vector Scale</span>
                                            <span className="text-lg font-black text-slate-900 dark:text-slate-200 tabular-nums">{template.words} <span className="text-xs font-bold text-slate-500">WORDS</span></span>
                                        </div>
                                        <button 
                                            onClick={() => onUseTemplate(template)}
                                            className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black rounded-[20px] uppercase tracking-[0.2em] hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all active:scale-95 flex items-center gap-3 shadow-xl hover:shadow-red-600/20"
                                        >
                                            DEPLOY
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 py-32">
                            <div className="w-32 h-32 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[48px] flex items-center justify-center mb-8 shadow-inner">
                                <Search size={48} className="opacity-20" />
                            </div>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">No Blueprints Found</h4>
                            <p className="text-lg text-slate-500 font-medium max-w-md text-center leading-relaxed">We couldn't find any templates matching your search criteria. Try using different keywords or filter by category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer - Full Page */}
            <div className="p-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
                <div className="flex items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2.5"><Lock size={16} className="text-red-500" /> AES-256 Vault Protection</span>
                    <span className="flex items-center gap-2.5"><Zap size={16} className="text-amber-500" /> GPU Acceleration Ready</span>
                    <span className="flex items-center gap-2.5"><Shield size={16} className="text-emerald-500" /> Verified Payloads</span>
                </div>
                <div className="flex items-center gap-6">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">© 2024 CyproVexto Forge • v4.2.0</p>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 20px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default TemplateGallery;
