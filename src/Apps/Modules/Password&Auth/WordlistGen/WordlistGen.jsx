import React, { useState, memo } from 'react';
import {
    Plus,
    Database,
    Zap,
    HardDrive,
    Target,
    Activity,
    Search,
    Menu,
    Bell,
    Settings,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import WordlistForge from './WordlistForge';
import RecentWordlists from './components/RecentWordlists';
import QuickActions from './components/QuickActions';
import WordlistPreviewModal from './components/WordlistPreviewModal';
import TemplateGallery from './components/TemplateGallery';
import ImportWordlistModal from './components/ImportWordlistModal';

// Memoized Stat Card for performance
const StatCard = memo(({ stat, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 p-7 rounded-[32px] shadow-sm hover:shadow-xl hover:border-red-500/20 transition-all group overflow-hidden relative transform-gpu"
    >
        <div className="absolute -right-4 -bottom-4 text-slate-100 dark:text-slate-800 opacity-20 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
            <stat.icon size={120} />
        </div>

        <div className="flex items-center justify-between mb-6 relative z-10">
            <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-sm ${stat.color}`}>
                <stat.icon size={24} />
            </div>
            <span className="text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                {stat.trend}
            </span>
        </div>
        <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">{stat.value}</h3>
        </div>
    </motion.div>
));

const WordlistGen = () => {
    // App State
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [showGenerateMenu, setShowGenerateMenu] = useState(false);
    const [selectedWordlist, setSelectedWordlist] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [activeGeneratorTab, setActiveGeneratorTab] = useState('profile');

    // Demo Data
    const [wordlists, setWordlists] = useState([
        { id: 1, name: 'admin_panel_2024.txt', type: 'spider', size: '2.4 MB', words: 145230, date: '2 hours ago' },
        { id: 2, name: 'target1_mutated.txt', type: 'mutation', size: '890 KB', words: 45120, date: 'Yesterday' },
        { id: 3, name: 'companyA_profile.txt', type: 'profile', size: '156 KB', words: 8450, date: '2 days ago' },
        { id: 4, name: 'brute_8char_mask.txt', type: 'mask', size: '4.2 GB', words: 208000000, date: '5 days ago' },
        { id: 5, name: 'client_web_crawl.txt', type: 'spider', size: '1.1 MB', words: 89000, date: '1 week ago' },
        { id: 6, name: 'custom_names_v2.txt', type: 'profile', size: '45 KB', words: 3200, date: '2 weeks ago' }
    ]);

    const stats = [
        { label: 'Total Wordlists', value: '247', trend: '+12%', icon: Database, color: 'text-red-500' },
        { label: 'Active Tasks', value: '18', trend: '+3', icon: Zap, color: 'text-amber-500' },
        { label: 'Disk Usage', value: '1.2 GB', trend: '45% free', icon: HardDrive, color: 'text-blue-500' },
        { label: 'Success Rate', value: '98.2%', trend: 'Stable', icon: Target, color: 'text-emerald-500' },
    ];

    const handleQuickAction = (tab) => {
        if (tab === 'import') {
            setShowImportModal(true);
        } else if (tab === 'templates') {
            setCurrentPage('templates');
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

    const handlePreview = (list) => {
        setSelectedWordlist(list);
        setShowPreviewModal(true);
    };

    const handleDelete = (list) => {
        setWordlists(wordlists.filter(w => w.id !== list.id));
    };

    const handleDownload = (list) => {
        alert(`Initializing secure download for ${list.name}...`);
    };

    const handleImport = (data) => {
        alert(`Ingesting vector source: ${data.type === 'local' ? data.data.name : data.data}`);
        setShowImportModal(false);
    };

    const handleUseTemplate = (template) => {
        alert(`Deploying ${template.name} to active engine...`);
        setCurrentPage('dashboard');
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

    if (currentPage === 'templates') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#0b0f1a]">
                <TemplateGallery
                    onClose={() => setCurrentPage('dashboard')}
                    onUseTemplate={handleUseTemplate}
                />
            </motion.div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#0b0f1a] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 p-4 md:p-8 transform-gpu overflow-x-hidden">
            <div className="max-w-[1600px] mx-auto space-y-8 will-change-transform">

                {/* Modern Header */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50 p-6 rounded-[32px] shadow-sm transform-gpu">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/20 rotate-3 transition-transform hover:rotate-0 duration-500">
                            <Activity size={28} />
                        </div>
                        <div className="space-y-0.5">
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                                Wordlist<span className="text-red-600">Forge</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                Wordlist Intelligence Hub
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <button
                                onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                                className="flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95 uppercase text-xs tracking-widest"
                            >
                                <Plus size={20} />
                                <span>Create Engine</span>
                            </button>

                            <AnimatePresence>
                                {showGenerateMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] shadow-2xl z-50 p-3 overflow-hidden backdrop-blur-xl bg-opacity-90 transform-gpu"
                                    >
                                        <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 mb-2">Select Vector Type</p>
                                        {['profile', 'spider', 'mutation', 'mask'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => handleGenerateNew(type)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-red-600 hover:text-white rounded-xl transition-all group/item mb-1"
                                            >
                                                <span className="capitalize">{type} Engine</span>
                                                <Plus size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Stats Dashboard */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transform-gpu">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} />
                    ))}
                </section>

                {/* Quick Actions */}
                <QuickActions onAction={handleQuickAction} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transform-gpu">

                    {/* Recent Wordlists - Left Side (8 cols) */}
                    <div className="lg:col-span-8 h-[600px] bg-white dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50 rounded-[32px] p-8 shadow-sm overflow-hidden transform-gpu">
                        <RecentWordlists
                            wordlists={wordlists}
                            onPreview={handlePreview}
                            onDownload={handleDownload}
                            onDelete={handleDelete}
                        />
                    </div>

                    {/* Active Intelligence - Right Side (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-white dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50 rounded-[32px] p-8 h-full transform-gpu">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight flex items-center gap-2">
                                    <Search size={22} className="text-red-600" />
                                    Active Scans
                                </h2>
                                <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400"><Menu size={16} /></button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { name: 'Subdomain Crawler', progress: 75, status: 'Running', color: 'bg-blue-500' },
                                    { name: 'Brute-Force Generator', progress: 42, status: 'Active', color: 'bg-red-500' },
                                    { name: 'Mutation Engine v4', progress: 98, status: 'Optimizing', color: 'bg-emerald-500' },
                                ].map((scan, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{scan.name}</p>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{scan.status}</span>
                                        </div>
                                        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50 relative">
                                            <motion.div
                                                initial={false}
                                                animate={{ width: `${scan.progress}%` }}
                                                className={`h-full ${scan.color} shadow-[0_0_10px_rgba(0,0,0,0.1)] transform-gpu`}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                            <span>{scan.progress}% Complete</span>
                                            <span>ETA: 12m 4s</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-6 bg-red-600 rounded-3xl text-white shadow-xl shadow-red-600/20 group cursor-pointer relative overflow-hidden transform-gpu">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                                <div className="relative z-10 space-y-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <Database size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black uppercase tracking-tight">Upgrade Storage</h4>
                                        <p className="text-xs text-white/70 font-medium leading-relaxed">Unlock multi-terabyte cloud processing and advanced AI pattern recognition.</p>
                                    </div>
                                    <button className="w-full py-3 bg-white text-red-600 font-black rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg transition-transform active:scale-95">GO PRO</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <WordlistPreviewModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                wordlist={selectedWordlist}
            />

            <ImportWordlistModal
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                onImport={handleImport}
            />

        </div>
    );
};

export default WordlistGen;