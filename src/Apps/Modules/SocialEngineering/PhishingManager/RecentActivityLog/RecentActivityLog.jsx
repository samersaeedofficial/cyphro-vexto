// components/RecentActivityLog.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Terminal,
  Activity,
  Filter,
  Calendar as CalendarIcon,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const initialActivities = [
  {
    id: 1,
    type: "success",
    attack: "Fake Login Page - Google",
    detail: "Credentials captured: user@email.com",
    time: "2026-05-24T10:30:00",
    timestamp: "2 min ago",
    icon: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 2,
    type: "info",
    attack: "Fake OTP Page",
    detail: "2FA code intercepted: 847291",
    time: "2026-05-24T10:15:00",
    timestamp: "15 min ago",
    icon: <Clock className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 3,
    type: "warning",
    attack: "Wi-Fi Captive Portal",
    detail: "Connection attempt failed - timeout",
    time: "2026-05-24T09:30:00",
    timestamp: "1 hour ago",
    icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 4,
    type: "success",
    attack: "Credential Harvester",
    detail: "Data stored: 24 records",
    time: "2026-05-24T08:45:00",
    timestamp: "2 hours ago",
    icon: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 5,
    type: "info",
    attack: "Session Hijacker",
    detail: "Cookie captured: session_id=ax9...",
    time: "2026-05-24T07:30:00",
    timestamp: "3 hours ago",
    icon: <Clock className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 6,
    type: "success",
    attack: "Fake Bank Login - Chase",
    detail: "Card details captured: ****1234",
    time: "2026-05-24T06:00:00",
    timestamp: "5 hours ago",
    icon: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 7,
    type: "warning",
    attack: "Fake OTP Page - Gmail",
    detail: "Rate limit exceeded - 3 attempts",
    time: "2026-05-24T04:30:00",
    timestamp: "7 hours ago",
    icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 8,
    type: "info",
    attack: "Credential Harvester",
    detail: "New credential pattern detected",
    time: "2026-05-24T03:00:00",
    timestamp: "8 hours ago",
    icon: <Clock className="w-4 h-4 text-blue-400" />,
  },
];

const RecentActivityLog = () => {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const calendarWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarWrapperRef.current &&
        !calendarWrapperRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredActivities = useMemo(() => {
    return initialActivities.filter((activity) => {
      if (filterType !== "all" && activity.type !== filterType) return false;
      if (
        searchTerm &&
        !activity.attack.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !activity.detail.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (selectedDate) {
        const activityDate = new Date(activity.time).toDateString();
        const filterDate = selectedDate.toDateString();
        if (activityDate !== filterDate) return false;
      }
      return true;
    });
  }, [filterType, searchTerm, selectedDate]);

  const clearFilters = () => {
    setFilterType("all");
    setSearchTerm("");
    setSelectedDate(null);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const calendarDays = useMemo(() => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: prevTotalDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevTotalDays - i),
      });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }
    const totalSlots = days.length > 35 ? 42 : 35;
    const nextMonthPadding = totalSlots - days.length;
    for (let i = 1; i <= nextMonthPadding; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }
    return days;
  }, [currentCalendarDate]);

  const changeMonth = (e, direction) => {
    e.stopPropagation();
    setCurrentCalendarDate((prev) => {
      const nextDate = new Date(prev);
      nextDate.setMonth(prev.getMonth() + direction);
      return nextDate;
    });
  };

  const getFormattedDateString = () => {
    if (!selectedDate) return "Select Date";
    return selectedDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#1d1c2d] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.01] rounded-full blur-[60px] pointer-events-none" />

      <div className="border-b border-gray-700/40 px-6 py-4 bg-[#232236]/50 backdrop-blur-sm relative z-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/15 border border-purple-500/30 rounded-xl">
              <Terminal className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Recent Activity Log
              </h2>
              <p className="text-xs text-gray-300/80 font-medium">
                Real-time telemetry and payload interception logs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-sm bg-[#151421] border border-gray-700/60 rounded-xl 
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 
                         transition-all duration-200 w-40 focus:w-48 font-medium"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#151421] border border-gray-700/60 
                         rounded-xl text-gray-200 hover:text-white hover:border-gray-600 transition-all font-medium"
              >
                <Filter className="w-4 h-4 text-gray-400" />
                Filter
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${showFilterDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-[#181726] border border-gray-700/60 rounded-xl shadow-2xl z-50 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterType("all");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/[0.04] transition-colors ${filterType === "all" ? "text-purple-400 bg-purple-500/10 font-bold" : "text-gray-300 font-medium"}`}
                  >
                    All Systems
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterType("success");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/[0.04] transition-colors ${filterType === "success" ? "text-emerald-400 bg-emerald-500/10 font-bold" : "text-gray-300 font-medium"}`}
                  >
                    Success Vectors
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterType("info");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/[0.04] transition-colors ${filterType === "info" ? "text-blue-400 bg-blue-500/10 font-bold" : "text-gray-300 font-medium"}`}
                  >
                    Info Telemetry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterType("warning");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/[0.04] transition-colors ${filterType === "warning" ? "text-amber-400 bg-amber-500/10 font-bold" : "text-gray-300 font-medium"}`}
                  >
                    Warning Notices
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={calendarWrapperRef}>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm bg-[#151421] border rounded-xl 
                         transition-all font-medium ${selectedDate ? "border-purple-500/60 text-purple-400 bg-purple-500/5 shadow-md" : "border-gray-700/60 text-gray-200 hover:border-gray-600"}`}
              >
                <CalendarIcon className="w-4 h-4 text-purple-400" />
                <span>{getFormattedDateString()}</span>
              </button>

              {showDatePicker && (
                <div
                  className="absolute right-0 mt-2.5 w-72 bg-[#12111f] border border-gray-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-white tracking-wide">
                      {months[currentCalendarDate.getMonth()]}{" "}
                      <span className="text-gray-400 font-medium">
                        {currentCalendarDate.getFullYear()}
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => changeMonth(e, -1)}
                        className="p-1.5 rounded-lg bg-[#1f1e33] border border-gray-700 text-gray-300 hover:text-white"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => changeMonth(e, 1)}
                        className="p-1.5 rounded-lg bg-[#1f1e33] border border-gray-700 text-gray-300 hover:text-white"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {daysOfWeek.map((day) => (
                      <span
                        key={day}
                        className="text-[11px] font-extrabold text-purple-400 uppercase tracking-wider"
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {calendarDays.map((item, idx) => {
                      const isSelected =
                        selectedDate &&
                        item.date.toDateString() ===
                          selectedDate.toDateString();
                      const isToday =
                        item.date.toDateString() === new Date().toDateString();
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(item.date);
                            setShowDatePicker(false);
                          }}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 relative
                            ${item.isCurrentMonth ? "text-gray-200 hover:bg-purple-500/20" : "text-gray-600"}
                            ${isSelected ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-600/30" : ""}
                            ${isToday && !isSelected ? "border border-purple-500/50 text-purple-300 bg-purple-500/5" : ""}
                          `}
                        >
                          {item.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {(filterType !== "all" || searchTerm || selectedDate) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-all font-semibold"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-700/30 custom-scrollbar bg-[#161524]/40 relative z-10">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-14 text-gray-500">
            <Activity className="w-10 h-10 mx-auto mb-3 text-gray-600 stroke-1" />
            <p className="text-sm font-semibold text-gray-400">
              No telemetry strings matched
            </p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="px-6 py-3.5 hover:bg-white/[0.02] transition-colors duration-150 flex items-start gap-3.5"
            >
              <div className="mt-0.5 flex-shrink-0">{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5 gap-2">
                  <h4 className="text-sm font-bold text-gray-200 truncate tracking-wide">
                    {activity.attack}
                  </h4>
                  <span className="text-xs font-semibold text-gray-500 flex-shrink-0">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono tracking-tight truncate bg-[#141322] border border-gray-700/50 px-2.5 py-1.5 rounded-lg mt-1 max-w-max">
                  {activity.detail}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-700/40 px-6 py-3.5 flex items-center justify-between bg-[#232236]/30 relative z-10">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Success:{" "}
            {filteredActivities.filter((a) => a.type === "success").length}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Info: {filteredActivities.filter((a) => a.type === "info").length}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Warning:{" "}
            {filteredActivities.filter((a) => a.type === "warning").length}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #141322; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2b2a42; border-radius: 9px; }
      `}</style>
    </div>
  );
};

export default RecentActivityLog;
