import React, { useState, useEffect } from 'react';
import { CONFIG_2026 } from '../constants/config';

const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const cleanTime = timeString.replace(/ [A-Z]{3,4}$/, ''); 
      setTime(cleanTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-screen h-screen left-1/2 -translate-x-1/2 bg-black text-white select-none overflow-hidden">
      
      {/* PARENT 1: THE BLACK CURTAIN (Social, Metadata, etc.) */}
      <div className="relative z-20 bg-black px-[4vw] pr-[10vw] pt-24 pb-4 min-h-[68vh] flex flex-col justify-between">
        
        {/* Middle: Social Links */}
        <div className="flex justify-end mt-12">
          <div className="w-full max-w-2xl">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] font-bold text-white/30 mb-8 text-right">(Social)</p>
            <div className="grid grid-cols-1 gap-y-2 md:gap-y-4 justify-items-end">
              {CONFIG_2026.social.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-tighter hover:text-white/50 transition-colors duration-300 uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Metadata */}
        <div className="mt-auto">
          <div className="flex justify-between items-end text-[0.7rem] uppercase tracking-[0.2em] font-bold">
            <div className="flex gap-12 md:gap-24">
              <div>
                <p>{CONFIG_2026.location}</p>
              </div>
              <div>
                <p>{time}<br />{CONFIG_2026.timezone}</p>
              </div>
            </div>
            <div className="text-right">
              <p>© 2026,</p>
              <p>All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>

      {/* PARENT 2: THE PEEKING TEXT (AkbarD) */}
      <div className="relative z-10 w-screen h-[32vh] overflow-hidden bg-black left-1/2 -translate-x-1/2">
        <h1 
          className="absolute bottom-0 left-0 w-full text-left text-[30vw] font-black tracking-[-0.1em] text-white leading-[0.7] whitespace-nowrap ml-[-1.5vw] mb-8"
        >
          AkbarD
        </h1>
      </div>

    </footer>
  );
};

export default Footer;
