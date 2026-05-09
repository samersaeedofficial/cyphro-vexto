import React from 'react';
import { FileText, Eye, Download, Trash2, ChevronRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentWordlists = ({ 
    wordlists, 
    onPreview, 
    onDownload, 
    onDelete, 
    getTypeIcon, 
    getTypeLabel 
}) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-red-600 rounded-full" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white italic tracking-tight">Recent Wordlists</h2>
                </div>
                <button className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-all bg-red-500/5 hover:bg-red-500/10 px-4 py-2 rounded-full border border-red-500/10">
                    Explore Archive
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            
            <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-[32px] overflow-hidden shadow-sm">
                <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50 sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Name & Stats</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Category</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {wordlists.map((list, idx) => (
                                <motion.tr 
                                    key={list.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/20 transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all duration-300">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">{list.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[11px] text-slate-400 font-bold uppercase">{list.words.toLocaleString()} vectors</span>
                                                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                                    <span className="text-[11px] text-slate-400 font-bold uppercase">{list.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-center">
                                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200 dark:border-slate-700 group-hover:border-red-500/30 transition-colors">
                                                {getTypeIcon(list.type)}
                                                {list.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                            <button 
                                                onClick={() => onPreview(list)} 
                                                className="p-2.5 bg-white dark:bg-slate-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-xl shadow-sm transition-all text-slate-500 hover:text-white active:scale-90"
                                                title="Preview Content"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button 
                                                onClick={() => onDownload(list)} 
                                                className="p-2.5 bg-white dark:bg-slate-800 hover:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl shadow-sm transition-all text-slate-500 hover:text-white active:scale-90"
                                                title="Download Asset"
                                            >
                                                <Download size={16} />
                                            </button>
                                            <button 
                                                onClick={() => onDelete(list)} 
                                                className="p-2.5 bg-white dark:bg-slate-800 hover:bg-rose-500 dark:hover:bg-rose-600 rounded-xl shadow-sm transition-all text-slate-500 hover:text-white active:scale-90"
                                                title="Delete Permanent"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(100, 116, 139, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(239, 68, 68, 0.3);
                }
            `}</style>
        </section>
    );
};

export default RecentWordlists;
