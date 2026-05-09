import React, { useState, memo } from 'react';
import { createPortal } from 'react-dom';
import { 
    FileText, 
    Eye, 
    Download, 
    Trash2, 
    ChevronRight, 
    AlertTriangle,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecentWordlists = memo(({ wordlists, onPreview, onDownload, onDelete }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDeleteClick = (list) => {
        setShowDeleteConfirm(list);
    };

    const confirmDelete = () => {
        onDelete(showDeleteConfirm);
        setShowDeleteConfirm(null);
    };

    const deleteModalContent = (
        <AnimatePresence>
            {showDeleteConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm"
                    onClick={() => setShowDeleteConfirm(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
                                <AlertTriangle size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Deletion</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-slate-200">{showDeleteConfirm.name}</span>? 
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3 w-full mt-4">
                                <button 
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/20 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <section className="space-y-6 h-full flex flex-col will-change-transform">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-8 bg-red-600 rounded-full" />
                    Recent Wordlists
                </h2>
                <button className="group flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 hover:bg-red-600 hover:text-white text-slate-600 dark:text-slate-400 text-xs font-bold rounded-xl transition-all duration-300 border border-slate-200 dark:border-slate-700/50">
                    View All Files
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className="flex-1 min-h-0 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-[32px] shadow-sm flex flex-col overflow-hidden">
                <div className="overflow-y-auto custom-scrollbar flex-1 transform-gpu">
                    <table className="w-full text-left border-collapse table-auto">
                        <thead className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700/50">
                            <tr>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {wordlists.map((list) => (
                                <motion.tr 
                                    key={list.id} 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{list.name}</p>
                                                <p className="text-[11px] text-slate-400 font-medium">{list.words.toLocaleString()} words • {list.size}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-center">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200/50 dark:border-slate-700/50">
                                                {list.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => onPreview(list)} 
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-slate-500 hover:text-red-500"
                                                title="Preview"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button 
                                                onClick={() => onDownload(list)} 
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-slate-500 hover:text-emerald-500"
                                                title="Download"
                                            >
                                                <Download size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(list)} 
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-slate-500 hover:text-rose-500"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {wordlists.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <FileText size={48} className="mb-4 opacity-20" />
                            <p className="text-sm font-medium">No wordlists found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal using Portal */}
            {createPortal(deleteModalContent, document.body)}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                .transform-gpu {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000;
                }
            `}</style>
        </section>
    );
});

export default RecentWordlists;
