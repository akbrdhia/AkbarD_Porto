import React from "react";

const HeroControlSystem = () => {
  return (
    <div className="flex justify-between mt-[30px] text-[11px] tracking-[0.5em] text-[#555]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-px bg-white/15" />
        CONTROL SYSTEM
      </div>
      <div
        data-cursor-interactive="true"
        data-cursor-label="SCROLL"
        className="flex items-center gap-2.5 text-[#7CB663]"
      >
        01
        <div className="w-[6px] h-10 bg-white/10 relative rounded-full overflow-hidden">
          <span
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #7CB663, transparent)",
              animation: "scrollLine 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroControlSystem;
