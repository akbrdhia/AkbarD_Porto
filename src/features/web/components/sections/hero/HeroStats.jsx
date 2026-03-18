import React from "react";

const heroStats = [
  {
    label: "PLATFORMS",
    value: "Android & Web",
    detail: "Native mobile plus responsive web builds.",
  },
  {
    label: "STACK",
    value: "Kotlin · Laravel · React",
    detail: "One pipeline from backend to front.",
  },
  {
    label: "MODE",
    value: "Remote · GMT+7",
    detail: "Available for product work worldwide.",
  },
];

const HeroStats = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[18px]">
      {heroStats.map((stat) => (
        <div
          key={stat.label}
          data-cursor-interactive="true"
          data-cursor-label={stat.label}
          className="p-[18px] rounded-[12px] flex flex-col gap-[6px] border border-white/10 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
        >
          <span className="text-[12px] tracking-[0.4em] text-[#7CB663]">
            {stat.label}
          </span>
          <span className="text-[32px] font-extrabold text-[#f6ffe7] tracking-[-0.03em]">
            {stat.value}
          </span>
          <span className="text-[13px] text-[#a0a0a0] leading-[1.4]">
            {stat.detail}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
