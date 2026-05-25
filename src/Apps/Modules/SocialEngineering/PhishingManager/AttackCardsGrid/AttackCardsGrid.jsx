// components/AttackCardsGrid.jsx
import React from "react";
import { ChevronRight } from "lucide-react";

const AttackCardsGrid = React.memo(
  ({ attackCards, onSelectSpecialTemplate }) => {
    const handleCardClick = (card) => {
      // FIXED: Hook interceptor added to check if user clicked on 'Fake Login Page' (ID: 1)
      if (card.id === 1 && onSelectSpecialTemplate) {
        onSelectSpecialTemplate();
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
            className="group relative bg-[#100f1c] border border-gray-800/80 rounded-2xl p-5 
                   hover:bg-[#151424] hover:border-purple-500/40 transition-all duration-300 cursor-pointer
                   hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:shadow-purple-500/[0.06] 
                   transform-gpu hover:-translate-y-1.5"
            style={{ willChange: "transform" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div
                className={`p-2.5 rounded-xl ${card.bgColor} border ${card.borderColor} \n                        transition-all duration-300 group-hover:scale-110 ${card.glowColor}`}
              >
                <div className="text-white group-hover:text-purple-200 transition-colors">
                  {card.icon}
                </div>
              </div>
              <span className="text-xs font-bold text-gray-300 bg-[#1c1b2d] px-2.5 py-1 rounded-lg border border-gray-800/80 shadow-inner">
                {card.stats}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors tracking-wide">
                {card.title}
              </h3>
              <p className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2">
                {card.subtitle}
              </p>
              <p className="text-sm text-gray-300/80 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between relative z-10">
              <div className="h-[3px] flex-1 rounded-full bg-gray-800/60 overflow-hidden">
                <div
                  className={`h-full w-1/3 rounded-full bg-gradient-to-r ${card.color} opacity-80 group-hover:w-full group-hover:opacity-100 transition-all duration-500`}
                />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors ml-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export default AttackCardsGrid;
