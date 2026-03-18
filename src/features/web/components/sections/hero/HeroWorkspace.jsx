import React from "react";
import { PERSONAL_INFO } from "../../../../../shared/constants/portfolioData";

const setupImage = "/setup.jpg";

const HeroWorkspace = () => {
  return (
    <div className="reveal-right delay-3 flex flex-col gap-6">
      <div className="rounded-[22px] border border-white/5 bg-black/70 shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-[30px] flex flex-col gap-[18px]">
        <div className="flex justify-between items-center tracking-[0.35em] text-[11px] text-[#7CB663]">
          WORKSPACE
          <span className="text-[#8f8f8f] tracking-[0.2em]">LIVE</span>
        </div>
        <div
          className="w-full h-[260px] rounded-[16px] border border-white/10 bg-cover bg-center shadow-[0_25px_40px_rgba(0,0,0,0.45)]"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${setupImage})`,
          }}
        />
        <div>
          <div className="text-[24px] font-bold text-[#f6ffe7]">
            {PERSONAL_INFO.location}
          </div>
          <div className="text-[#8d8d8d] tracking-[0.2em] text-[11px] mt-1">
            BASE · GMT+7 · REMOTE
          </div>
          <div className="mt-3 text-[14px] text-[#bfbfbf] leading-[1.6]">
            Available for product work worldwide. Studio lights on, setup dialed in,
            and every sprint starts with a playlist.
          </div>
          <div className="flex gap-2.5 mt-3 flex-wrap">
            {["Android", "Backend", "Web"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-white/10 text-[11px] tracking-[0.2em] text-[#dcdcdc]"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWorkspace;
