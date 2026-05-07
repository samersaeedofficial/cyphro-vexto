import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   X,
   Wifi,
   Target,
   Search,
   Info,
   Cpu,
   Zap,
   ArrowRight,
   Database,
   ShieldAlert,
   AlertCircle,
   Radio
} from "lucide-react";
import { Dialog, DialogContent } from "@/shared/ui/overlays";

// ─── Shimmer Component ──────────────────────────────────────────────────
const ShimmerItem = () => (
   <div className="w-full h-16 rounded-xl bg-white/[0.03] overflow-hidden relative border border-white/5">
      <motion.div
         initial={{ x: "-100%" }}
         animate={{ x: "100%" }}
         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />
      <div className="absolute inset-0 p-3 flex items-center gap-4">
         <div className="w-8 h-8 rounded-lg bg-white/5" />
         <div className="space-y-1.5 flex-1">
            <div className="w-24 h-2.5 bg-white/5 rounded" />
            <div className="w-36 h-1.5 bg-white/5 rounded" />
         </div>
      </div>
   </div>
);

// ─── Signal Bars Component ──────────────────────────────────────────────
const SignalBars = ({ strength, active }) => {
   const bars = [25, 50, 75, 100];
   return (
      <div className="flex items-end gap-0.5 h-3">
         {bars.map((threshold, i) => (
            <div
               key={i}
               className={`w-1 rounded-full transition-all duration-500 ${
                  strength >= threshold 
                     ? (active ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-emerald-500') 
                     : 'bg-white/10'
               }`}
               style={{ height: `${(i + 1) * 25}%` }}
            />
         ))}
      </div>
   );
};

const AttackModal = ({ isOpen, onClose }) => {
   const [isLoading, setIsLoading] = useState(true);
   const [view, setView] = useState("list"); // 'list' or 'manual'
   const [selectedWifi, setSelectedWifi] = useState(null);
   const [networks, setNetworks] = useState([]);

   // Simulate scanning and fetching data
   useEffect(() => {
      if (isOpen) {
         setIsLoading(true);
         const timer = setTimeout(() => {
            // Set to empty array to test empty state if needed, or mock data
            setNetworks([
               { id: 1, ssid: "TP-Link_Global", bssid: "BC:24:11:88:FF:02", strength: 82, security: "WPA2" },
               { id: 2, ssid: "Home_Secure_Net", bssid: "E4:95:6E:44:A2:10", strength: 65, security: "WPA3" },
               { id: 3, ssid: "Office_Wifi_Pro", bssid: "00:AF:91:2C:11:99", strength: 45, security: "WPA2-Enterprise" },
               { id: 4, ssid: "Public_Airport_Free", bssid: "D1:99:32:00:FF:E2", strength: 30, security: "Open" },
            ]);
            setIsLoading(false);
         }, 2500);
         return () => clearTimeout(timer);
      }
   }, [isOpen]);

   return (
      <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
         <DialogContent size="default" className="p-0 border-none bg-transparent shadow-none max-w-lg z-[9999]">
            
            {/* Main Container */}
            <div className="relative w-full bg-slate-900 border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
               
               {/* Header */}
               <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
                  <div>
                     <h3 className="text-xl font-black text-white flex items-center gap-3">
                        <Target className="w-5 h-5 text-cyan-400" />
                        Target Acquisition
                     </h3>
                     <p className="text-slate-500 text-[10px] font-mono mt-0.5 uppercase tracking-widest">Select objective for attack protocol</p>
                  </div>
               </div>

               {/* Views Controller */}
               <div className="p-6">
                  <div className="flex gap-3 mb-6">
                     <button
                        onClick={() => setView("list")}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${view === "list" ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300'}`}
                     >
                        Auto-Scan
                     </button>
                     <button
                        onClick={() => setView("manual")}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${view === "manual" ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300'}`}
                     >
                        Manual Entry
                     </button>
                  </div>

                  {/* Content Area */}
                  <div className="min-h-[250px] max-h-[350px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                     
                     {view === "list" && !isLoading && networks.length > 0 && (
                        <motion.div 
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-3"
                        >
                           <Database className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                           <p className="text-[10px] leading-relaxed text-slate-400">
                              <span className="text-cyan-400 font-bold uppercase">Note:</span> These networks have existing telemetry data. For new targets, use <span className="text-white">Manual Entry</span>.
                           </p>
                        </motion.div>
                     )}

                     {isLoading ? (
                        <div className="space-y-4">
                           <ShimmerItem />
                           <ShimmerItem />
                           <ShimmerItem />
                        </div>
                     ) : view === "list" ? (
                        networks.length > 0 ? (
                           <div className="space-y-3">
                              {networks.map((wifi) => (
                                 <motion.div
                                    key={wifi.id}
                                    whileHover={{ scale: 1.01, zIndex: 10 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setSelectedWifi(wifi.id)}
                                    className={`group relative cursor-pointer p-4 rounded-xl border transition-all ${selectedWifi === wifi.id ? 'bg-cyan-500/10 border-cyan-500/40' : 'bg-white/[0.03] border-white/5 hover:border-white/10'}`}
                                 >
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-4">
                                          <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-colors ${selectedWifi === wifi.id ? 'bg-cyan-500/20' : ''}`}>
                                             <Wifi className={`w-5 h-5 ${selectedWifi === wifi.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                                          </div>
                                          <div>
                                             <h4 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{wifi.ssid}</h4>
                                             <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">BSSID:</span>
                                                <span className="text-[9px] font-mono text-slate-400">{wifi.bssid}</span>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="flex flex-col items-end gap-2">
                                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">{wifi.security}</span>
                                          <div className="flex items-center gap-3">
                                             <div className="text-[10px] font-bold text-white">{wifi.strength}%</div>
                                             <SignalBars strength={wifi.strength} active={selectedWifi === wifi.id} />
                                          </div>
                                       </div>
                                    </div>
                                 </motion.div>
                              ))}
                           </div>
                        ) : (
                           <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600">
                                 <Radio className="w-8 h-8" />
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-white font-bold">No Local Telemetry Found</h4>
                                 <p className="text-slate-500 text-xs max-w-[200px]">No previously attacked networks are available in this spectrum zone.</p>
                              </div>
                              <button onClick={() => setView("manual")} className="px-6 py-2 rounded-lg bg-white/5 text-cyan-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Switch to Manual</button>
                           </div>
                        )
                     ) : (
                        /* Manual Entry View */
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-400">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target BSSID (MAC Address)</label>
                              <div className="relative group">
                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Cpu className="w-4 h-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                                 </div>
                                 <input
                                    type="text"
                                    placeholder="XX:XX:XX:XX:XX:XX"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-xs focus:outline-none focus:border-cyan-500/50 transition-all"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <div className="flex justify-between items-center ml-1">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Name (SSID)</label>
                                 <div className="flex items-center gap-1 text-[9px] text-amber-500/70 font-bold italic">
                                    <ShieldAlert className="w-3 h-3" />
                                    Exact match required
                                 </div>
                              </div>
                              <div className="relative group">
                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="w-4 h-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                                 </div>
                                 <input
                                    type="text"
                                    placeholder="Case-sensitive SSID"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-xs focus:outline-none focus:border-cyan-500/50 transition-all"
                                 />
                              </div>
                              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 mt-3">
                                 <p className="text-[9px] leading-relaxed text-amber-500/80 font-medium">
                                    <span className="font-black">NOTE:</span> Any mismatch in case or special characters will cause target acquisition to fail.
                                 </p>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* Footer Action */}
               <div className="p-6 bg-slate-950/50 border-t border-white/5">
                  <button
                     disabled={!selectedWifi && view === "list"}
                     className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_10px_20px_-5px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                  >
                     <Zap className="w-4 h-4 group-hover:animate-pulse" />
                     Initialize Attack
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>

            </div>
         </DialogContent>
      </Dialog>
   );
};

export default AttackModal;
