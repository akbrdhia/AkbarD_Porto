import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../../../../../shared/constants/portfolioData";

const HeroContact = () => {
  return (
    <div className="reveal-right delay-4 flex flex-col gap-6">
      <div className="rounded-[20px] border border-white/5 bg-[#050505]/80 shadow-[0_25px_45px_rgba(0,0,0,0.45)] px-7 py-[26px] flex flex-col gap-3.5">
        <div className="text-[12px] tracking-[0.35em] text-[#7CB663]">
          CONTACT
        </div>
        <div className="text-[#dadada] leading-[1.7]">
          Open for Android/mobile-focused product collaborations. Prefer tight feedback loops and
          keeping backend + web in sync with the app experience.
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          <div>
            <div className="tracking-[0.3em] text-[11px] text-[#8d8d8d]">
              AVAILABILITY
            </div>
            <div className="text-[18px] text-[#f5ffea]">Remote · GMT+7</div>
          </div>
          <div>
            <div className="tracking-[0.3em] text-[11px] text-[#8d8d8d]">
              EMAIL
            </div>
            <div className="text-[16px] text-[#cfcfcf]">{PERSONAL_INFO.email}</div>
          </div>
        </div>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          data-cursor-interactive="true"
          data-cursor-label="SEND EMAIL"
          className="mt-2 inline-flex items-center gap-2.5 px-4 py-3 rounded-[10px] border border-white/10 tracking-[0.25em] text-[11px] no-underline text-[#f5f5f5] w-fit hover:bg-white/5 transition-colors"
        >
          EMAIL · BRIEF
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="rounded-[18px] border border-white/5 shadow-[0_25px_40px_rgba(0,0,0,0.45)] p-[26px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[18px]" style={{
        background: "linear-gradient(120deg, rgba(0,0,0,0.85), rgba(0,0,0,0.6))"
      }}>
        <div>
          <div className="tracking-[0.35em] text-[#666] text-[11px]">
            BASE
          </div>
          <div className="text-[18px] text-[#f6ffe7]">{PERSONAL_INFO.location}</div>
        </div>
        <div>
          <div className="tracking-[0.35em] text-[#666] text-[11px]">
            AVAILABILITY
          </div>
          <div className="text-[18px] text-[#7CB663]">Open for new work</div>
        </div>
        <div>
          <div className="tracking-[0.35em] text-[#666] text-[11px]">
            CONTACT
          </div>
          <div className="text-[16px] text-[#dcdcdc]">{PERSONAL_INFO.email}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroContact;
