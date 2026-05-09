import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
    X, 
    Download, 
    Copy, 
    Check, 
    FileText, 
    Hash, 
    Search,
    Shield,
    Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WordlistPreviewModal = ({ isOpen, onClose, wordlist }) => {
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [previewContent, setPreviewContent] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            document.body.style.overflow = 'hidden';
            // Simulate shimmer loading
            const timer = setTimeout(() => {
                const demoLines = [
                    'P@ssw0rd123', 'Admin@2024', 'Welcome1!', 'LetMeIn@99', 
                    'System_Root_2k2', 'Security_First', 'Shadow_Protocol', 'Ghost_Rider_0',
                    'Nova_Exploit', 'Cypher_Pulse', 'Vexto_Core', 'Antigravity_99',
                    'Zero_Day_X', 'Kernel_Panic', 'Shell_Code_01', 'Buffer_Flow',
                    'Stack_Heap_99', 'Heap_Overflow', 'Pointer_Null', 'Void_Main'
                ];
                setPreviewContent(demoLines);
                setLoading(false);
            }, 2000);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = 'auto';
            };
        }
    }, [isOpen]);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!wordlist) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-slate-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{wordlist.name}</h2>
                                <p className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    {wordlist.type} wordlist • {wordlist.words.toLocaleString()} entries
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleCopy}
                                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all active:scale-95"
                            >
                                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                <span className="font-bold text-sm">{copied ? 'Copied' : 'Copy Preview'}</span>
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95">
                                <Download size={18} />
                                <span className="font-bold text-sm">Download</span>
                            </button>
                            <button 
                                onClick={onClose}
                                className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                        {/* Sidebar Info */}
                        <div className="w-full md:w-80 p-8 border-r border-white/5 bg-slate-900/20 space-y-8 hidden md:block">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">List Metadata</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { label: 'File Size', value: wordlist.size, icon: Hash },
                                        { label: 'Last Modified', value: wordlist.date, icon: Terminal },
                                        { label: 'Entropy Level', value: 'High', icon: Shield },
                                        { label: 'Total Permutations', value: wordlist.words.toLocaleString(), icon: Search },
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                                            <item.icon size={18} className="text-red-500" />
                                            <div>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</p>
                                                <p className="text-sm font-bold text-white">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-3xl space-y-3">
                                <Shield className="text-red-500" size={24} />
                                <p className="text-xs font-bold text-white uppercase tracking-wider">Security Notice</p>
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    This preview only shows the first 20 entries of the wordlist. For full access, please download the original file.
                                </p>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-950">
                            <div className="max-w-4xl mx-auto space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Terminal size={20} className="text-red-500" />
                                        Data Stream Preview
                                    </h3>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                        UTF-8 Encoding
                                    </div>
                                </div>

                                <div className="relative bg-slate-900/50 border border-white/5 rounded-[32px] overflow-hidden min-h-[500px]">
                                    {loading ? (
                                        <div className="p-10 space-y-4">
                                            {[...Array(12)].map((_, i) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-8 h-4 bg-white/5 rounded animate-pulse" />
                                                    <div className="h-4 bg-white/5 rounded animate-pulse w-full" style={{ width: `${Math.random() * 40 + 40}%` }} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="p-8 md:p-12 font-mono text-sm md:text-base"
                                        >
                                            {previewContent.map((line, index) => (
                                                <div key={index} className="flex gap-8 group py-1.5">
                                                    <span className="text-slate-700 select-none w-10 text-right font-bold italic">{String(index + 1).padStart(2, '0')}</span>
                                                    <span className="text-slate-300 group-hover:text-red-500 transition-colors cursor-default">{line}</span>
                                                </div>
                                            ))}
                                            <div className="mt-8 pt-8 border-t border-white/5 text-slate-600 text-xs italic flex items-center gap-2">
                                                <Search size={14} />
                                                End of preview. {wordlist.words - previewContent.length} more entries hidden.
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
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
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.2);
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default WordlistPreviewModal;
