import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
    X, 
    Upload, 
    FileText, 
    Link, 
    Cloud, 
    CheckCircle2, 
    AlertCircle,
    ChevronRight,
    Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImportWordlistModal = ({ isOpen, onClose, onImport }) => {
    const [importMethod, setImportMethod] = useState('local'); // 'local', 'url', 'cloud'
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const fileInputRef = useRef(null);

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleImportSubmit = () => {
        if (importMethod === 'local' && file) {
            onImport({ type: 'local', data: file });
        } else if (importMethod === 'url' && url) {
            onImport({ type: 'url', data: url });
        }
        onClose();
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-xl transform-gpu"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white dark:bg-[#0b0f1a] border border-slate-200 dark:border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative flex flex-col transform-gpu"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/20 rotate-3">
                                    <Upload size={28} />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">
                                        Import<span className="text-red-600">Vector</span>
                                    </h2>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em]">Ingest external datasets</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-red-600 hover:text-white text-slate-500 dark:text-slate-400 rounded-xl transition-all shadow-sm group"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Method Toggle */}
                        <div className="flex p-2 bg-slate-100 dark:bg-slate-900/50 mx-6 mt-6 rounded-2xl border border-slate-200/50 dark:border-white/5">
                            {[
                                { id: 'local', icon: FileText, label: 'Local File' },
                                { id: 'url', icon: LinkIcon, label: 'Remote URL' },
                                { id: 'cloud', icon: Cloud, label: 'Cloud Sync' }
                            ].map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setImportMethod(method.id)}
                                    className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        importMethod === method.id 
                                        ? 'bg-white dark:bg-slate-800 text-red-600 shadow-xl border border-slate-200 dark:border-slate-700 scale-[1.02]' 
                                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                    }`}
                                >
                                    <method.icon size={16} />
                                    {method.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {importMethod === 'local' && (
                                <div 
                                    className={`border-2 border-dashed rounded-[32px] p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${
                                        isDragging 
                                        ? 'border-red-500 bg-red-500/5' 
                                        : 'border-slate-200 dark:border-white/10 hover:border-red-500/30 bg-slate-50/50 dark:bg-slate-900/20'
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        ref={fileInputRef} 
                                        onChange={handleFileChange}
                                        accept=".txt,.csv,.lst"
                                    />
                                    {file ? (
                                        <div className="space-y-3">
                                            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                                                <CheckCircle2 size={40} />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-slate-900 dark:text-white">{file.name}</p>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{(file.size / 1024).toFixed(2)} KB • Ready for processing</p>
                                            </div>
                                            <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline bg-red-500/5 px-4 py-2 rounded-lg transition-colors">Change File</button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-[28px] flex items-center justify-center mx-auto transition-all duration-500 border border-slate-200 dark:border-white/5 shadow-inner group-hover:scale-110">
                                                <Upload size={32} />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-slate-900 dark:text-white">Select Wordlist File</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Drag and drop or click to browse files</p>
                                            </div>
                                            <div className="flex gap-2 justify-center">
                                                {['.TXT', '.CSV', '.LST'].map(ext => (
                                                    <span key={ext} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-400 border border-slate-200 dark:border-white/5">{ext}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {importMethod === 'url' && (
                                <div className="space-y-6 py-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Repository Endpoint</label>
                                        <div className="relative group">
                                            <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                            <input 
                                                type="text" 
                                                placeholder="https://raw.githubusercontent.com/..."
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                className="w-full pl-14 pr-8 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl text-sm focus:ring-4 ring-red-500/10 outline-none transition-all dark:text-white font-medium shadow-inner"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex gap-5 items-start">
                                        <AlertCircle className="text-amber-500 shrink-0" size={24} />
                                        <p className="text-xs text-amber-700/80 dark:text-amber-400/80 font-bold leading-relaxed uppercase tracking-wider">
                                            Ensure the target URL provides raw text content. Secured endpoints may require authentication tokens.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {importMethod === 'cloud' && (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800/50 rounded-[48px] flex items-center justify-center animate-pulse border border-slate-200 dark:border-white/5 shadow-inner">
                                        <Cloud size={48} className="text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Cloud Integration</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">Connecting to your secure cloud storage... Please authenticate via the pop-up.</p>
                                    </div>
                                    <button className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all hover:bg-red-600 dark:hover:bg-red-600 hover:text-white">Connect Now</button>
                                </div>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col md:flex-row gap-4">
                            <button 
                                onClick={onClose}
                                className="px-10 py-4.5 bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-red-600 hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                disabled={importMethod === 'local' ? !file : importMethod === 'url' ? !url : true}
                                onClick={handleImportSubmit}
                                className="flex-1 px-10 py-4.5 bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3"
                            >
                                Process Vector
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default ImportWordlistModal;
