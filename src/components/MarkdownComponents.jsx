import React from "react";

export const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-[#CC7832] text-[28px] mb-4 border-b border-[#3C3F41] pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[#6A8759] text-[22px] mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[#FFC66D] text-[18px] mt-5 mb-2.5">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[#A9B7C6] leading-[1.8] mb-3">
      {children}
    </p>
  ),
  li: ({ children }) => (
    <li className="text-[#A9B7C6] mb-1.5 ml-5">
      {children}
    </li>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc">
      {children}
    </ul>
  ),
  hr: () => (
    <hr className="border-none border-t border-[#3C3F41] my-6" />
  ),
  code: ({ children }) => (
    <code className="bg-[#1E1E1E] px-1.5 py-0.5 rounded text-[#6A8759] text-[14px]">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#6A8759] underline transition-colors duration-200 ease-in hover:text-[#8BC34A] cursor-pointer"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      className="inline-block my-1 mr-1 align-middle max-h-[28px]"
    />
  ),
  details: ({ children, open }) => (
    <details
      open={open}
      className="mb-4 bg-[#1a1a1a] rounded-lg p-3 border border-[#3C3F41]"
    >
      {children}
    </details>
  ),
  summary: ({ children }) => (
    <summary className="cursor-pointer text-[#6A8759] font-bold text-[16px] mb-2">
      {children}
    </summary>
  ),
  div: ({ children, style, align }) => (
    <div
      className={`flex flex-wrap gap-1 ${align === "center" ? "justify-center text-center" : align === "right" ? "justify-end text-right" : "justify-start text-left"}`}
      style={style}
    >
      {children}
    </div>
  ),
};
