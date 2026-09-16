// components/RecentActivityLog.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Terminal,
  Activity,
  Filter,
  Calendar as CalendarIcon,
  X,
  Search,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Modernized Mock Data with Categories, Statuses, and Extended Details
const initialActivities = [
  {
    id: 1,
    category: "Credential Phishing",
    attack: "Fake Login Page - Google",
    detail: "Credentials captured: user@email.com",
    time: "2026-05-24T10:30:00",
    timestamp: "2 min ago",
    status: "active", // active | completed | failed
    targetUrl: "/campaigns/google-login-v1",
  },
  {
    id: 2,
    category: "2FA Bypass",
    attack: "Fake OTP Page",
    detail: "2FA code intercepted: 847291",
    time: "2026-05-24T10:15:00",
    timestamp: "15 min ago",
    status: "completed",
    targetUrl: "/campaigns/otp-bypass-v2",
  },
  {
    id: 3,
    category: "Wireless Attacks",
    attack: "Wi-Fi Captive Portal",
    detail: "Inbound handshake dropped - handshake timeout rule",
    time: "2026-05-24T09:30:00",
    timestamp: "1 hour ago",
    status: "failed",
    targetUrl: "/campaigns/captive-portal-wifi",
  },
  {
    id: 4,
    category: "Data Exfiltration",
    attack: "Credential Harvester",
    detail: "Data synced: 24 active database records",
    time: "2026-05-24T08:45:00",
    timestamp: "2 hours ago",
    status: "completed",
    targetUrl: "/campaigns/harvester-db",
  },
  {
    id: 5,
    category: "Session Interception",
    attack: "Session Hijacker",
    detail: "Cookie captured: session_id=ax9z72km1b...",
    time: "2026-05-24T07:30:00",
    timestamp: "3 hours ago",
    status: "active",
    targetUrl: "/campaigns/session-hijack",
  },
  {
    id: 6,
    category: "Financial Phishing",
    attack: "Fake Bank Login - Chase",
    detail: "Card parameters captured: ****1234",
    time: "2026-05-24T06:00:00",
    timestamp: "5 hours ago",
    status: "completed",
    targetUrl: "/campaigns/chase-bank-v4",
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
      if (filterType !== "all" && activity.status !== filterType) return false;
      if (
        searchTerm &&
        !activity.attack.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !activity.detail.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !activity.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Completed
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-2.5 h-2.5" />
            Failed
          </span>
        );
      default:
        return null;
    }
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

  return (
    <div className="bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm dark:shadow-2xl relative mx-auto transition-colors duration-300">
      {/* High-end design glowing accent gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/[0.07] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="border-b border-slate-200/80 dark:border-white/5 px-8 py-6 bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-md relative z-20 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl shadow-inner">
              <Terminal className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Live Activity Stream
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-0.5">
                Real-time telemetry vectors, active intercepts, and node states
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search metrics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#151423] border border-slate-200 dark:border-white/[0.06] rounded-xl 
                         text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500/40 
                         focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 w-44 focus:w-56 font-medium shadow-sm"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-[#151423] border border-slate-200 dark:border-white/[0.06] 
                         rounded-xl text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/[0.15] transition-all font-semibold shadow-sm"
              >
                <Filter className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Status</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${showFilterDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#151424] border border-slate-200 dark:border-white/[0.08] rounded-xl shadow-2xl z-50 p-1.5 backdrop-blur-xl">
                  {["all", "active", "completed", "failed"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setFilterType(type);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs capitalize rounded-lg transition-colors ${
                        filterType === type
                          ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 font-bold"
                          : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/[0.03] font-medium"
                      }`}
                    >
                      {type === "all" ? "All Vectored States" : `${type} Nodes`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Custom DatePicker Trigger */}
            <div className="relative" ref={calendarWrapperRef}>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-xl 
                         transition-all duration-200 font-semibold shadow-sm ${
                           selectedDate
                             ? "border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/5 shadow-md shadow-purple-500/5"
                             : "bg-white dark:bg-[#151423] border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-gray-300 hover:border-slate-300 dark:hover:border-white/[0.15]"
                         }`}
              >
                <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>
                  {selectedDate
                    ? selectedDate.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })
                    : "Timeline"}
                </span>
              </button>

              {showDatePicker && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#12111f] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-2xl z-50 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-900 dark:text-white tracking-wider uppercase">
                      {months[currentCalendarDate.getMonth()]}{" "}
                      <span className="text-slate-400 dark:text-gray-500 font-medium">
                        {currentCalendarDate.getFullYear()}
                      </span>
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => changeMonth(e, -1)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1a192b] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => changeMonth(e, 1)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1a192b] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {daysOfWeek.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-bold text-purple-600 dark:text-purple-400/80 uppercase"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
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
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                            ${item.isCurrentMonth ? "text-slate-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-500/20" : "text-slate-300 dark:text-gray-600"}
                            ${isSelected ? "bg-purple-600 text-white font-bold" : ""}
                            ${isToday && !isSelected ? "border border-purple-500/40 text-purple-600 dark:text-purple-300" : ""}
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

            {/* Clear Button */}
            {(filterType !== "all" || searchTerm || selectedDate) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all font-bold"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container / Content Grid */}
      <div className="p-6 max-h-[520px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActivities.length === 0 ? (
          <div className="col-span-full text-center py-20 text-slate-400 dark:text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-gray-700 stroke-1 animate-pulse" />
            <p className="text-sm font-bold text-slate-600 dark:text-gray-400">
              No active telemetry pipelines matches query
            </p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group relative bg-white dark:bg-[#121122]/40 border border-slate-200/90 dark:border-white/[0.04] hover:border-purple-500/40 dark:hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle card hover top glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />

              <div>
                {/* Meta Bar: Category, Status & Time */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-purple-600 dark:text-purple-400/90 bg-purple-50 dark:bg-purple-500/5 px-2.5 py-1 rounded-md border border-purple-200 dark:border-purple-500/10">
                    {activity.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-gray-500 font-mono">
                      {activity.timestamp}
                    </span>
                    {getStatusBadge(activity.status)}
                  </div>
                </div>

                {/* Core Header info */}
                <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-200">
                  {activity.attack}
                </h3>

                {/* Industrial Code block details */}
                <div className="mt-3 bg-slate-50 dark:bg-[#08070e]/80 border border-slate-200 dark:border-white/[0.03] rounded-xl p-3 font-mono text-[11px] text-slate-700 dark:text-gray-400 tracking-tight break-all relative">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/10" />
                  <span className="text-purple-600 dark:text-purple-400/70 select-none mr-1.5 font-bold">
                    $ logs_
                  </span>
                  {activity.detail}
                </div>
              </div>

              {/* Action Button Section */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/[0.03] flex items-center justify-between">
                <span className="text-[10px] text-slate-400 dark:text-gray-500 font-mono">
                  ISO:{" "}
                  {new Date(activity.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>

                <a
                  href={activity.targetUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(
                      `Navigating to dashboard segment: ${activity.targetUrl}`,
                    );
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-white bg-slate-50 dark:bg-white/[0.02] group-hover:bg-purple-50 dark:group-hover:bg-purple-600/20 border border-slate-200 dark:border-white/[0.05] group-hover:border-purple-300 dark:group-hover:border-purple-500/30 px-3 py-1.5 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <span>Inspect Node</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer System Telemetry Status */}
      <div className="border-t border-slate-200/80 dark:border-white/[0.06] px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/80 dark:bg-[#11101c]/40 relative z-10 transition-colors">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]" />
            Active Vector Pipelines:{" "}
            {initialActivities.filter((a) => a.status === "active").length}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#60a5fa]" />
            Completed Execution:{" "}
            {initialActivities.filter((a) => a.status === "completed").length}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            Failed Requests:{" "}
            {initialActivities.filter((a) => a.status === "failed").length}
          </div>
        </div>

        <div className="text-[11px] text-purple-600 dark:text-purple-400/60 font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
          <Play className="w-3 h-3 fill-purple-600/20 dark:fill-purple-400/20" /> Engine Connected
        </div>
      </div>
    </div>
  );
};

export default RecentActivityLog;

