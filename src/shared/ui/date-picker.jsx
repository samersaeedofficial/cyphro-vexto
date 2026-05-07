import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/ui/ui-elements';

export const DatePicker = ({ selected, onSelect, placeholder = 'Select date', className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('days');
  const [direction, setDirection] = useState(0); 
  const [currentMonth, setCurrentMonth] = useState(
    selected ? new Date(selected) : new Date()
  );

  useEffect(() => {
    if (selected) {
      const d = new Date(selected);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(d);
      }
    }
  }, [selected]);
  
  const calendarRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear + 10 - i);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        setView('days');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = (date instanceof Date) ? date : new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelect(newDate);
    setIsOpen(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setView('days');
  };

  const changeMonth = (dir) => {
    setDirection(dir);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + dir, 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  return (
    <div className="relative w-full" ref={calendarRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-12 text-left bg-transparent focus:outline-none text-white text-sm flex items-center transition-all duration-300",
          className
        )}
      >
        <span className={cn('block truncate font-medium', !selected ? 'text-slate-500' : 'text-slate-100')}>
          {selected ? formatDate(selected) : placeholder}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
             
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-[300px] sm:w-[340px] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-4 text-white overflow-hidden ring-1 ring-black/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                {view === 'days' ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => changeMonth(-1)}
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <button 
                      type="button"
                      onClick={() => setView('years')}
                      className="flex items-center space-x-1 text-sm font-bold tracking-wide hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors group"
                    >
                      <span>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => changeMonth(1)}
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center w-full justify-between">
                     <span className="text-sm font-bold px-2">Select Year</span>
                     <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setView('days')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative min-h-[280px]"> 
                <AnimatePresence mode="wait">
                  {view === 'days' ? (
                    <motion.div
                      key="days-view"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                       {/* Days Header */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                          <div key={day} className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider py-1">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {emptyDays.map((_, index) => (
                          <div key={`empty-${index}`} className="aspect-square" />
                        ))}
                        {days.map((day) => {
                          const normalizedSelected = selected ? new Date(selected) : null;
                          const isSelected =
                            normalizedSelected &&
                            !isNaN(normalizedSelected.getTime()) &&
                            normalizedSelected.getDate() === day &&
                            normalizedSelected.getMonth() === currentMonth.getMonth() &&
                            normalizedSelected.getFullYear() === currentMonth.getFullYear();

                          const isToday = 
                            new Date().getDate() === day &&
                            new Date().getMonth() === currentMonth.getMonth() &&
                            new Date().getFullYear() === currentMonth.getFullYear();

                          return (
                            <motion.button
                              key={day}
                              type="button" // Important so form doesn't submit
                              onClick={() => handleDateSelect(day)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={cn(
                                'aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center relative',
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 z-10 font-bold'
                                  : 'text-slate-300 hover:bg-white/10 hover:text-white',
                                isToday && !isSelected && 'text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20'
                              )}
                            >
                              {day}
                              {isToday && !isSelected && (
                                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="years-view"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute inset-0 overflow-y-auto custom-scrollbar pr-1"
                    >
                      <div className="grid grid-cols-4 gap-2 pb-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => handleYearSelect(year)}
                            className={cn(
                              "py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10",
                              currentMonth.getFullYear() === year 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                                : "text-slate-300"
                            )}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
