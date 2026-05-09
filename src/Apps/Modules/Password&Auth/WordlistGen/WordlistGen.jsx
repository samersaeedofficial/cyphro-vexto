import React, { useState } from 'react';
import {
    Zap,
    Globe,
    Shuffle,
    Hash,
    Star,
    User,
    Download,
    Eye,
    Trash2,
    HardDrive,
    Target,
    Activity,
    Lightbulb,
    ChevronRight,
    ArrowUpRight,
    Plus,
    FileText,
    TrendingUp,
    Shield,
    Database,
    Cpu,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WordlistForge from './WordlistForge';

const WordlistGen = () => {
    // App State
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [showGenerateMenu, setShowGenerateMenu] = useState(false);
    const [selectedWordlist, setSelectedWordlist] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [activeGeneratorTab, setActiveGeneratorTab] = useState('profile');

    // Demo Data
    const [wordlists, setWordlists] = useState([
        { id: 1, name: 'admin_panel_2024.txt', type: 'spider', size: '2.4 MB', words: 145230, date: '2 hours ago' },
        { id: 2, name: 'target1_mutated.txt', type: 'mutation', size: '890 KB', words: 45120, date: 'Yesterday' },
        { id: 3, name: 'companyA_profile.txt', type: 'profile', size: '156 KB', words: 8450, date: '2 days ago' },
        { id: 4, name: 'brute_8char_mask.txt', type: 'mask', size: '4.2 GB', words: 208000000, date: '5 days ago' },
        { id: 5, name: 'client_web_crawl.txt', type: 'spider', size: '1.1 MB', words: 89000, date: '1 week ago' }
    ]);

    const templates = [
        { id: 1, name: 'Basic Mutation', type: 'mutation', description: 'Standard rule set for common passwords' },
        { id: 2, name: 'Profile Quick Gen', type: 'profile', description: 'Generate from social media keywords' },
        { id: 3, name: '8-Char Brute Force', type: 'mask', description: 'Full numeric/alpha range sequencer' }
    ];

    const stats = [
        { label: 'Total Wordlists', value: '247', trend: '+12%', icon: Database, color: 'text-red-500' },
        { label: 'Active Generations', value: '18', trend: '+3', icon: Zap, color: 'text-amber-500' },
        { label: 'Cloud Storage', value: '1.2 GB', trend: '45% free', icon: HardDrive, color: 'text-blue-500' },
        { label: 'Success Rate', value: '98.2%', trend: 'Stable', icon: Target, color: 'text-emerald-500' },
    ];

    const quickActions = [
        { icon: User, label: 'Profile Gen', tab: 'profile' },
        { icon: Globe, label: 'New Spider', tab: 'spider' },
        { icon: Shuffle, label: 'Mutate List', tab: 'mutation' },
        { icon: Hash, label: 'Mask Attack', tab: 'mask' },
        { icon: Star, label: 'Templates', tab: 'templates' },
        { icon: Download, label: 'Import List', tab: 'import' }
    ];

    const handleQuickAction = (tab) => {
        if (tab === 'import') {
            alert('Import functionality coming soon');
        } else if (tab === 'templates') {
            alert('Templates gallery coming soon');
        } else {
            setActiveGeneratorTab(tab);
            setCurrentPage('generator');
        }
    };

    const handleGenerateNew = (tab = 'profile') => {
        setActiveGeneratorTab(tab);
        setCurrentPage('generator');
        setShowGenerateMenu(false);
    };

    const handleUseTemplate = (template) => {
        setActiveGeneratorTab(template.type);
        setCurrentPage('generator');
    };

    const handleWordlistAction = (action, wordlist) => {
        switch (action) {
            case 'preview':
                setSelectedWordlist(wordlist);
                setShowPreviewModal(true);
                break;
            case 'download':
                alert(`Downloading ${wordlist.name}...`);
                break;
            case 'delete':
                setWordlists(wordlists.filter(w => w.id !== wordlist.id));
                break;
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'spider': return <Globe size={16} />;
            case 'mutation': return <Shuffle size={16} />;
            case 'profile': return <User size={16} />;
            case 'mask': return <Hash size={16} />;
            default: return <FileText size={16} />;
        }
    };

    if (currentPage === 'generator') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                <WordlistForge 
                    onBack={() => setCurrentPage('dashboard')} 
                    initialTab={activeGeneratorTab}
                />
            </motion.div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 font-sans p-6 md:p-10 transition-colors duration-500">
            {/* Header Section */}
            <div className="max-w-[1400px] mx-auto space-y-10">

                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Wordlist <span className="text-red-600">Generator</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            Create and manage high-performance wordlists for security auditing.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/10 transition-all active:scale-95"
                            >
                                <Plus size={20} />
                                <span>Create New</span>
                            </button>

                            <AnimatePresence>
                                {showGenerateMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 p-2 overflow-hidden"
                                    >
                                        {['profile', 'spider', 'mutation', 'mask'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => handleGenerateNew(type)}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all"
                                            >
                                                <div className="text-red-500">{getTypeIcon(type)}</div>
                                                <span className="capitalize">{type} Gen</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Stats Dashboard */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-6 rounded-[24px] shadow-sm hover:shadow-md dark:hover:bg-slate-800 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 ${stat.color}`}>
                                    <stat.icon size={22} />
                                </div>
                                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                        </motion.div>
                    ))}
                </section>

                {/* Quick Actions Grid */}
                <section>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 px-1">Quick Tools</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => handleQuickAction(action.tab)}
                                className="group flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-[24px] hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
                            >
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-red-500 transition-colors">
                                    <action.icon size={24} />
                                </div>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Recent Files */}
                    <section className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white italic">Recent Wordlists</h2>
                            <button className="text-xs font-bold text-red-600 hover:underline">View All Files</button>
                        </div>

                        <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-[32px] overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                                    <tr>
                                        <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                                        <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                                        <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {wordlists.map((list) => (
                                        <tr key={list.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-red-500 transition-colors">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{list.name}</p>
                                                        <p className="text-[11px] text-slate-400 font-medium">{list.words.toLocaleString()} words • {list.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center">
                                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wide border border-slate-200 dark:border-slate-700">
                                                        {list.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleWordlistAction('preview', list)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg shadow-sm transition-all text-slate-500 hover:text-red-500"><Eye size={16} /></button>
                                                    <button onClick={() => handleWordlistAction('download', list)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg shadow-sm transition-all text-slate-500 hover:text-emerald-500"><Download size={16} /></button>
                                                    <button onClick={() => handleWordlistAction('delete', list)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg shadow-sm transition-all text-slate-500 hover:text-rose-500"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Templates / Modules */}
                    <section className="lg:col-span-4 space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white px-1">Active Modules</h2>
                        <div className="space-y-4">
                            {templates.map((template) => (
                                <div key={template.id} className="p-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-[28px] shadow-sm hover:border-red-500/30 transition-all group">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-red-500 group-hover:scale-110 transition-transform">
                                            {getTypeIcon(template.type)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{template.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{template.description}</p>
                                            <button
                                                onClick={() => handleUseTemplate(template)}
                                                className="mt-4 text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group/btn"
                                            >
                                                Launch Module <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {showPreviewModal && selectedWordlist && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setShowPreviewModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-xl rounded-[40px] overflow-hidden shadow-2xl relative p-10"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase italic">{selectedWordlist.name}</h3>
                                <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Plus className="rotate-45" size={24} /></button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl">
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Payload Size</span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedWordlist.size}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl">
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Vectors Found</span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedWordlist.words.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Data Stream Preview</h4>
                                <div className="p-6 bg-slate-50 dark:bg-black rounded-3xl font-mono text-xs text-slate-600 dark:text-red-500 border border-slate-200 dark:border-red-900/20 max-h-40 overflow-y-auto">
                                    {['admin', 'password', 'login', 'user', 'test', 'demo', 'guest', 'root', 'system', 'config'].map((w, i) => (
                                        <div key={i} className="py-1 border-b border-slate-200/50 dark:border-white/5 last:border-0">{w}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button onClick={() => setShowPreviewModal(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors uppercase">Dismiss</button>
                                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/20 transition-all uppercase text-xs tracking-widest">Download Asset</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WordlistGen;