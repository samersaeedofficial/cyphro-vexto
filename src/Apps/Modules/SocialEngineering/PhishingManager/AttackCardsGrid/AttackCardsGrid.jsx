// components/AttackCardsGrid.jsx
import React from "react";
import { ChevronRight } from "lucide-react";

const AttackCardsGrid = React.memo(
  ({ attackCards, onSelectSpecialTemplate }) => {
    const handleCardClick = (card) => {
      // FIXED: Hook interceptor added to check if user clicked on 'Fake Login Page' (ID: 1)
      // AttackCardsGrid.jsx line tweak:
      if (onSelectSpecialTemplate) {
        onSelectSpecialTemplate(card.id);
        return;
      }
      alert(`You selected: ${card.title}\n${card.description}`);
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 transform-gpu">
        {attackCards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="group relative bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 rounded-2xl p-5 
                   hover:bg-white dark:hover:bg-white/[0.06] hover:border-purple-500/40 transition-all duration-300 cursor-pointer
                   shadow-sm hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-2xl
                   transform-gpu hover:-translate-y-1"
            style={{ willChange: "transform" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/[0.02] dark:from-white/[0.01] to-transparent pointer-events-none" />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div
                className={`p-2.5 rounded-xl ${card.bgColor} border ${card.borderColor} 
                        transition-all duration-300 group-hover:scale-110 ${card.glowColor}`}
              >
                <div className="text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors">
                  {card.icon}
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm">
                {card.stats}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors tracking-wide">
                {card.title}
              </h3>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase mb-2">
                {card.subtitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between relative z-10">
              <div className="h-[3px] flex-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className={`h-full w-1/3 rounded-full bg-gradient-to-r ${card.color} opacity-80 group-hover:w-full group-hover:opacity-100 transition-all duration-500`}
                />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ml-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export default AttackCardsGrid;
