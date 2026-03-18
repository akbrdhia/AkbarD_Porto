import React from "react";
import { ArrowUpRight, Github, Play } from "lucide-react";
import { PERSONAL_INFO } from "../../../../../shared/constants/portfolioData";

const HeroContent = ({ glitchActive, scrollY }) => {
  const [firstName = "AKBAR", lastName = "DHIA"] =
    PERSONAL_INFO.name?.split(" ") ?? [];

  return (
    <>
      <h1 className="reveal delay-2 text-[clamp(48px,13vw,170px)] font-black tracking-[-0.05em] leading-[0.85] uppercase">
        <span
          className="block text-[#f7fff1]"
          style={{
            transform: glitchActive
              ? `translate(${Math.random() * 10 - 5}px, ${
                  Math.random() * 4
                }px)`
              : "none",
            textShadow: glitchActive
              ? "3px 0 #ff004d, -3px 0 #00ffe5"
              : "0 0 20px rgba(0,0,0,0.35)",
          }}
        >
          {firstName}
        </span>
        <span
          className="inline-flex items-center gap-4 text-transparent transition-transform duration-300 ease-out"
          style={{
            WebkitTextStroke: "2px #7CB663",
            transform: `translateX(${scrollY * 0.1}px)`,
          }}
        >
          {lastName || "D"}
          <span className="text-[clamp(18px,2vw,28px)] tracking-[0.35em] text-[#7CB663]" style={{ WebkitTextStroke: "initial" }}>
            Developer
          </span>
        </span>
      </h1>

      <div className="reveal-left delay-3 font-mono text-[#bfbfbf] text-[clamp(15px,2vw,24px)] flex items-center gap-3 bg-black/60 px-[22px] py-4 rounded-[10px] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.35)] w-fit">
        <span className="text-[#baf36a]">~/akbard</span>
        <span className="text-[#666]">build</span>
        <span>{PERSONAL_INFO.role}</span>
        <span className="w-3 h-6 bg-[#baf36a] animate-[blink_1s_step-end_infinite]" />
      </div>

      <div className="reveal delay-4 flex gap-[18px] flex-wrap">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          data-cursor-interactive="true"
          data-cursor-label="SEND BRIEF"
          className="inline-flex items-center gap-3.5 px-[42px] py-[22px] bg-[#baf36a] text-[#050505] no-underline text-[13px] font-extrabold tracking-[0.4em] font-mono rounded-[10px] shadow-[0_20px_40px_rgba(186,243,106,0.35)] transition-transform duration-200 ease-in hover:scale-[1.02]"
        >
          <Play size={16} fill="#050505" />
          DEPLOY REQUEST
          <ArrowUpRight size={18} strokeWidth={3} />
        </a>

        <a
          href="https://github.com/akbrdhia"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-interactive="true"
          data-cursor-label="OPEN GITHUB"
          className="inline-flex items-center gap-3 px-[36px] py-[22px] rounded-[10px] border-[1.5px] border-white/20 text-[#eaeaea] no-underline text-[13px] font-bold tracking-[0.3em] font-mono relative overflow-hidden transition-all duration-200 hover:bg-white/5"
        >
          <Github size={18} />
          CODE ARCHIVE
          <ArrowUpRight size={18} strokeWidth={3} />
          <span className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent mix-blend-screen opacity-60 pointer-events-none" />
        </a>
      </div>
    </>
  );
};

export default HeroContent;
