import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Lock, 
  Zap, 
  Clock, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Filter,
  Database,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// ─── Constants (Moved outside to prevent recreation) ──────────────────────────
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ACTIVITY_LEVELS = [0, 1, 2, 0, 4, 0, 3, 1, 0, 2, 4, 0, 1, 2, 0, 1, 3, 0, 4, 1, 0, 2, 3, 0, 1, 4, 0, 2, 1, 0, 3];

const LEVEL_COLORS = {
  1: "#059669", 
  2: "#10b981", 
  3: "#34d399", 
  4: "#6ee7b7", 
};

// ─── Specialized Card Content Component (Memoized) ──────────────────────────
const CardMetrics = memo(({ item }) => {
  switch (item.type) {
    case "discovery":
      return (
        <div className="flex items-center gap-4">
          <div className="flex flex-col"><span className="text-[8px] font-mono text-slate-500 uppercase">Found</span><span className="text-white font-bold text-xs">{item.metrics.totalFound} SSIDs</span></div>
          <div className="flex flex-col"><span className="text-[8px] font-mono text-slate-500 uppercase">Probed</span><span className="text-white font-bold text-xs">{item.metrics.probed} Active</span></div>
          <div className="w-24 flex h-1 rounded-full overflow-hidden bg-white/5 ml-2">
            <div className="bg-cyan-500" style={{ width: '60%' }} />
            <div className="bg-purple-500" style={{ width: '25%' }} />
            <div className="bg-emerald-500" style={{ width: '15%' }} />
          </div>
        </div>
      );
    case "handshake":
      return (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2"><Database className="w-3 h-3 text-purple-400" /><span className="text-white font-bold text-xs">{item.metrics.fileSize}</span></div>
          <div className="flex flex-col"><span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">BSSID</span><span className="text-white font-mono text-[9px]">{item.bssid}</span></div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Ready</div>
        </div>
      );
    case "wps":
      return (
        <div className="flex items-center gap-6">
          <div className="flex flex-col"><span className="text-[8px] font-mono text-slate-500 uppercase">Pins</span><span className="text-white font-bold text-xs">{item.metrics.pinTested}</span></div>
          <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold">{item.metrics.result}</div>
        </div>
      );
    default: return null;
  }
});

// ─── Separate History Card Component (Memoized) ──────────────────────────────
const HistoryCard = memo(({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }} // Faster, more efficient animations
      className="group relative h-fit"
    >
      {/* Background Glow - Reduced intensity for performance */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-transparent rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-5 transition-all duration-300 group-hover:bg-slate-900/80 group-hover:border-white/20 group-hover:-translate-y-1">
        
        <div className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: `${item.color}10`, border: `1px solid ${item.color}20` }}>
          <item.icon className="w-7 h-7" style={{ color: item.color }} />
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <h4 className="text-white font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors truncate">{item.target || item.title}</h4>
            {item.target && <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase tracking-tighter">{item.title}</div>}
          </div>
          <CardMetrics item={item} />
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0 border-l border-white/5 pl-6">
           <div className="text-right">
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.time}</div>
              <div className="text-[9px] font-mono text-slate-600 mt-0.5">{item.date}</div>
           </div>
           <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter border" style={{ backgroundColor: `${item.color}05`, color: item.color, borderColor: `${item.color}30` }}>{item.status}</span>
        </div>
      </div>
    </motion.div>
  );
});

const WifiHistory = () => {
  const [selectedDate, setSelectedDate] = useState("2024-05-07");
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(2024, 4, 1)); 
  const calendarRef = useRef(null);

  // Memoized activity and color logic
  const getActivityLevel = useCallback((day) => ACTIVITY_LEVELS[(day - 1) % ACTIVITY_LEVELS.length], []);
  const getLevelColor = useCallback((level) => LEVEL_COLORS[level] || "transparent", []);

  const nextMonth = useCallback(() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)), []);
  const prevMonth = useCallback(() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  // Memoized Data
  const historyData = useMemo(() => [
    { id: 1, type: "discovery", title: "Global Network Discovery", date: "2024-05-07", time: "10:30 AM", status: "Completed", color: "#00d4ff", icon: Search, metrics: { totalFound: 42, probed: 15, distribution: { wpa2: 28, wpa3: 8, open: 6 } } },
    { id: 2, type: "handshake", title: "Handshake Capture", target: "Home_Secure_5G", bssid: "E4:95:6E:44:A2:10", date: "2024-05-07", time: "01:15 PM", status: "Success", color: "#c084fc", icon: Lock, metrics: { captured: true, attempts: 2, fileSize: "4.2 MB" } },
    { id: 3, type: "wps", title: "WPS PIN Attack", target: "Cafe_Guest", date: "2024-05-06", time: "04:45 PM", status: "Failed", color: "#facc15", icon: Zap, metrics: { pinTested: 142, result: "AP Locked", duration: "18m" } },
    { id: 4, type: "handshake", title: "Handshake Capture", target: "Office_Wifi", bssid: "BC:24:11:88:FF:02", date: "2024-05-06", time: "11:20 AM", status: "Success", color: "#c084fc", icon: Lock, metrics: { captured: true, attempts: 1, fileSize: "3.8 MB" } }
  ], []);

  const daysInMonth = useMemo(() => new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate(), [viewDate]);
  const firstDay = useMemo(() => new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay(), [viewDate]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 px-2">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
           <h3 className="text-2xl font-bold text-white tracking-tight">Activity Log History</h3>
        </div>
        
        <div className="flex items-center gap-4 relative">
           <div onClick={() => setShowCalendar(!showCalendar)} className="relative group/date cursor-pointer">
              <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-2xl blur opacity-0 group-hover/date:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-all">
                 <CalendarIcon className="w-4 h-4 text-cyan-400" />
                 <span className="text-sm font-bold text-white">{selectedDate}</span>
                 <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform ${showCalendar ? 'rotate-90' : ''}`} />
              </div>

              <AnimatePresence>
                {showCalendar && (
                  <motion.div 
                    ref={calendarRef} 
                    initial={{ opacity: 0, y: 5, scale: 0.98 }} // Subtler entrance
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 5, scale: 0.98 }} 
                    className="absolute top-full right-0 mt-4 z-50 w-[340px] p-6 rounded-[2.5rem] bg-slate-900/98 backdrop-blur-3xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7)]" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-8">
                       <button onClick={prevMonth} className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 transition-all active:scale-90"><ChevronLeft className="w-5 h-5" /></button>
                       <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-1">Select History Date</span>
                          <span className="text-lg font-black text-white uppercase tracking-wider">{MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
                       </div>
                       <button onClick={nextMonth} className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 transition-all active:scale-90"><ChevronRight className="w-5 h-5" /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4 px-2">
                       {DAY_LABELS.map(day => (
                         <div key={day} className="text-[9px] font-black text-slate-600 text-center uppercase tracking-tighter">{day}</div>
                       ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2 px-1">
                       {Array.from({ length: firstDay }).map((_, i) => (
                         <div key={`empty-${i}`} className="h-10 w-10" />
                       ))}
                       
                       {Array.from({ length: daysInMonth }).map((_, i) => {
                         const day = i + 1;
                         const level = getActivityLevel(day);
                         const isSelected = selectedDate === `${viewDate.getFullYear()}-${(viewDate.getMonth()+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                         const levelColor = getLevelColor(level);
                         
                         return (
                           <motion.button 
                             key={day} 
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                             onClick={() => { 
                               setSelectedDate(`${viewDate.getFullYear()}-${(viewDate.getMonth()+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`); 
                               setShowCalendar(false); 
                             }} 
                             className={`group/day h-11 w-11 rounded-xl transition-all flex flex-col items-center justify-center relative border ${isSelected ? 'border-cyan-500 bg-cyan-500/10' : 'border-transparent hover:border-white/10'}`}
                           >
                             <span className={`text-[13px] font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-300 group-hover/day:text-white'}`}>{day}</span>
                             {level > 0 && (
                               <div className="absolute bottom-1.5 w-4 h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${levelColor}20` }}>
                                  <div className="h-full rounded-full" style={{ backgroundColor: levelColor, width: '100%' }} />
                               </div>
                             )}
                           </motion.button>
                         )
                       })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           <button className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white transition-all"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="relative rounded-[3rem] overflow-hidden bg-slate-900/20 border border-white/5 p-8 md:p-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {historyData.map((item, index) => (
            <HistoryCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(WifiHistory);
