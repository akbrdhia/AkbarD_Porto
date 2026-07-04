import React, { forwardRef, useRef, useEffect } from "react";

const ModeCard = forwardRef((props, forwardedRef) => {
  const { mode, title, description, selected, onSelect, onHover, accentBorder, accentSolid } = props;
  const Icon = props.Icon;
  const localRef = useRef(null);

  // Mirror the local ref to the forwarded ref (supports function and object refs)
  useEffect(() => {
    if (!forwardedRef) return;
    const el = localRef.current;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else forwardedRef.current = el;
    return () => {
      if (typeof forwardedRef === "function") forwardedRef(null);
      else if (forwardedRef) forwardedRef.current = null;
    };
  }, [forwardedRef]);

  const getEl = () => localRef.current;

  return (
    <div
      ref={localRef}
      className={`mode-card ${selected ? "mode-card-selected" : ""} w-[340px] min-h-[280px] p-6 flex flex-col items-center justify-center cursor-pointer transition-[background,border,transform] opacity-0`}
      onClick={() => onSelect(mode, getEl())}
      onMouseEnter={() => onHover(getEl(), true)}
      onMouseLeave={() => onHover(getEl(), false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(mode, getEl());
        }
      }}
      aria-pressed={selected}
      style={{
        background: selected ? "#0b0b0b" : "#050505",
        border: selected ? `4px solid ${accentBorder}` : "4px solid #222",
        boxShadow: selected ? `inset 0 0 0 2px rgba(124,182,99,0.06)` : undefined,
      }}
    >
      <div className="mb-4">
        <Icon size={44} color={selected ? accentSolid : "#9AA0A6"} />
      </div>
      <div className={`text-xl font-black mb-2 uppercase ${selected ? "text-[rgb(124,182,99)]" : "text-white"}`} style={{ letterSpacing: '0.02em' }}>
        {title}
      </div>
      <div className="text-sm text-[#9AA0A6] leading-[1.4] text-center uppercase">{description}</div>
    </div>
  );
});

export default React.memo(ModeCard);
