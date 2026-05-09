import React, { useState, useRef } from 'react';
import { 
    X, 
    Upload, 
    FileText, 
    Link, 
    Cloud, 
    CheckCircle2, 
    AlertCircle,
    ChevronRight,
    Search,
    Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImportWordlistModal = ({ isOpen, onClose, onImport }) => {
    const [importMethod, setImportMethod] = useState('local'); // 'local', 'url', 'cloud'
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const fileInputRef = useRef(null);

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

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-slate-950/70 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    className="bg-white dark:bg-[#0f172a] border border-white/20 dark:border-slate-800 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col transform-gpu"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                                <Upload size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">
                                    Import<span className="text-red-600">Vector</span>
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Ingest external datasets</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Method Toggle */}
                    <div className="flex p-2 bg-slate-100 dark:bg-slate-900/50 mx-8 mt-8 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        {[
                            { id: 'local', icon: FileText, label: 'Local File' },
                            { id: 'url', icon: Link, label: 'Remote URL' },
                            { id: 'cloud', icon: Cloud, label: 'Cloud Sync' }
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setImportMethod(method.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                    importMethod === method.id 
                                    ? 'bg-white dark:bg-slate-800 text-red-600 shadow-sm border border-slate-200 dark:border-slate-700' 
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                            >
                                <method.icon size={14} />
                                {method.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {importMethod === 'local' && (
                            <div 
                                className={`border-2 border-dashed rounded-[32px] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${
                                    isDragging 
                                    ? 'border-red-500 bg-red-500/5' 
                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30'
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
                                    <div className="space-y-4">
                                        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">{file.name}</p>
                                            <p className="text-sm text-slate-500 font-medium">{(file.size / 1024).toFixed(2)} KB • Ready for processing</p>
                                        </div>
                                        <button className="text-xs font-black text-red-600 uppercase tracking-widest hover:underline">Change File</button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                                            <Upload size={32} />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">Select Wordlist File</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Drag and drop or click to browse files</p>
                                        </div>
                                        <div className="flex gap-2 justify-center">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">.TXT</span>
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">.CSV</span>
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">.LST</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {importMethod === 'url' && (
                            <div className="space-y-6 py-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Repository Endpoint</label>
                                    <div className="relative">
                                        <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input 
                                            type="text" 
                                            placeholder="https://raw.githubusercontent.com/..."
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[20px] text-sm focus:ring-2 ring-red-500/20 outline-none transition-all dark:text-white font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-4">
                                    <AlertCircle className="text-amber-500 shrink-0" size={20} />
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                        Ensure the target URL provides raw text content. Secured endpoints may require authentication tokens.
                                    </p>
                                </div>
                            </div>
                        )}

                        {importMethod === 'cloud' && (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[40px] flex items-center justify-center animate-pulse">
                                    <Cloud size={40} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cloud Integration</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">Connecting to your secure cloud storage... Please authenticate via the pop-up.</p>
                                </div>
                                <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black rounded-xl uppercase tracking-widest shadow-xl active:scale-95 transition-all">Connect Now</button>
                            </div>
                        )}
                    </div>

                    {/* Action Bar */}
                    <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-4">
                        <button 
                            onClick={onClose}
                            className="px-8 py-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-black rounded-2xl uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={importMethod === 'local' ? !file : importMethod === 'url' ? !url : true}
                            onClick={handleImportSubmit}
                            className="flex-1 px-8 py-4 bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black rounded-2xl uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                        >
                            Process Vector
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImportWordlistModal;
