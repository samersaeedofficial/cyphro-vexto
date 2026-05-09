import React from 'react';
import { 
    User, 
    Globe, 
    Shuffle, 
    Hash, 
    Star, 
    Download,
    ArrowUpRight,
    Zap,
    Cloud
} from 'lucide-react';
import { motion } from 'framer-motion';

const QuickActions = ({ onAction }) => {
    const actions = [
        { 
            icon: User, 
            label: 'Profile Gen', 
            tab: 'profile', 
            desc: 'Target-specific keywords',
            color: 'from-blue-500/20 to-blue-600/5',
            iconColor: 'text-blue-500'
        },
        { 
            icon: Globe, 
            label: 'Web Spider', 
            tab: 'spider', 
            desc: 'Crawl URLs for data',
            color: 'from-emerald-500/20 to-emerald-600/5',
            iconColor: 'text-emerald-500'
        },
        { 
            icon: Shuffle, 
            label: 'Mutation', 
            tab: 'mutation', 
            desc: 'Expand existing lists',
            color: 'from-amber-500/20 to-amber-600/5',
            iconColor: 'text-amber-500'
        },
        { 
            icon: Hash, 
            label: 'Mask Attack', 
            tab: 'mask', 
            desc: 'Custom charset patterns',
            color: 'from-purple-500/20 to-purple-600/5',
            iconColor: 'text-purple-500'
        },
        { 
            icon: Star, 
            label: 'Templates', 
            tab: 'templates', 
            desc: 'Ready-to-use presets',
            color: 'from-red-500/20 to-red-600/5',
            iconColor: 'text-red-500',
            badge: 'PRO'
        },
        { 
            icon: Download, 
            label: 'Import List', 
            tab: 'import', 
            desc: 'Upload external files',
            color: 'from-slate-500/20 to-slate-600/5',
            iconColor: 'text-slate-500',
            badge: 'New'
        }
    ];

    return (
        <section>
            <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    Quick Actions
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    <Zap size={12} className="text-amber-500" />
                    Express Mode Active
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {actions.map((action, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAction(action.tab)}
                        className={`group relative flex flex-col p-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-[28px] hover:border-red-500/30 transition-all duration-300 text-left overflow-hidden`}
                    >
                        {/* Background Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Badge */}
                        {action.badge && (
                            <div className="absolute top-4 right-4 px-2 py-0.5 bg-red-600 text-white text-[8px] font-black rounded-md tracking-tighter z-10">
                                {action.badge}
                            </div>
                        )}

                        <div className="relative z-10">
                            <div className={`w-12 h-12 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${action.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-slate-200/50 dark:border-slate-700/50`}>
                                <action.icon size={22} />
                            </div>
                            
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                    {action.label}
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500" />
                                </h3>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                    {action.desc}
                                </p>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    );
};

export default QuickActions;
