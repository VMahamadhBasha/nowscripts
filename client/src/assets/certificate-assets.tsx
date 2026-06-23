import React from "react";

// Professional SVG Logo for NowScripts
export const NowScriptsOfficialLogo = () => (
  <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5H30C32.7614 5 35 7.23858 35 10V30C35 32.7614 32.7614 35 30 35H10C7.23858 35 5 32.7614 5 30V10C5 7.23858 7.23858 5 10 5Z" fill="#0F172A"/>
    <path d="M13 13L21 21L27 13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 27L21 19L27 27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="45" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#0F172A">NowScripts</text>
  </svg>
);

// Professional Verified Stamp
export const NowScriptsStamp = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer dashed border */}
    <circle cx="60" cy="60" r="58" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" fill="none"/>
    {/* Inner solid borders */}
    <circle cx="60" cy="60" r="52" stroke="#1E3A8A" strokeWidth="2" fill="none"/>
    <circle cx="60" cy="60" r="36" stroke="#1E3A8A" strokeWidth="1" fill="none"/>
    
    {/* Circular Text (Approximated with curved paths) */}
    <path id="curveUp" d="M 20 60 A 40 40 0 0 1 100 60" fill="transparent" />
    <text fill="#1E3A8A" fontSize="11" fontWeight="bold" letterSpacing="2">
      <textPath href="#curveUp" startOffset="50%" textAnchor="middle">NOWSCRIPTS</textPath>
    </text>
    
    <path id="curveDown" d="M 100 60 A 40 40 0 0 1 20 60" fill="transparent" />
    <text fill="#1E3A8A" fontSize="10" fontWeight="bold" letterSpacing="1">
      <textPath href="#curveDown" startOffset="50%" textAnchor="middle">CONFIRMED</textPath>
    </text>

    {/* Center Icon (Shield/Check) */}
    <path d="M60 35L45 42V55C45 68 51 80 60 85C69 80 75 68 75 55V42L60 35Z" fill="#1E3A8A"/>
    <path d="M52 58L58 64L68 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// HR Signature
export const HRSignature = () => (
  <svg width="150" height="60" viewBox="0 0 150 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 40 C 20 20, 30 10, 40 30 S 60 50, 70 30 S 80 10, 90 20 S 110 50, 130 30 S 140 20, 145 25" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M80 40 C 90 30, 100 20, 110 35" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
