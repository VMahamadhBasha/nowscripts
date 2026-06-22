export const BrandLogo = ({ className = "", hideTextOnMobile = true, textColor = "text-black" }: { className?: string, hideTextOnMobile?: boolean, textColor?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img src="/logo.png" alt="NowScripts" className="h-[28px] md:h-[32px] w-auto" />
    <span className={`font-bold text-[24px] md:text-[28px] font-serif tracking-tight ${textColor} ${hideTextOnMobile ? 'hidden md:block' : ''}`}>
      NowScripts
    </span>
  </div>
);

export const BrandIconOnly = ({ className = "" }: { className?: string }) => (
  <img src="/logo.png" alt="NowScripts" className={`h-[28px] md:h-[32px] w-auto ${className}`} />
);
