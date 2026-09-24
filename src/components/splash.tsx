/**
 * Intro shown once per browser session: the AC unit switches on and cools
 * from 30° to 19°, then the site is revealed. Visibility is driven by the
 * `splash-active` class that SPLASH_SCRIPT puts on <html> before hydration,
 * so the page never flashes and returning visitors skip it entirely.
 */
export const SPLASH_SCRIPT = `try{var d=document.documentElement;if(!sessionStorage.getItem("rc-splash")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("rc-splash","1");d.classList.add("splash-active");setTimeout(function(){d.classList.remove("splash-active")},2300)}}catch(e){}`;

export function Splash() {
  return (
    <div
      aria-hidden
      className="splash fixed inset-0 z-[100] flex-col items-center justify-center bg-background"
    >
      <div className="splash-glow absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
      <div className="relative w-64 sm:w-80">
        <svg
          viewBox="0 0 200 76"
          className="w-full overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <linearGradient id="splash-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7f9fc" />
              <stop offset="1" stopColor="#d9e1ea" />
            </linearGradient>
            <filter id="splash-glow-filter" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <rect x="2" y="2" width="196" height="60" rx="18" fill="url(#splash-body)" />
          <rect x="16" y="8" width="168" height="3" rx="1.5" fill="#ffffff" opacity="0.9" />
          <text
            x="20"
            y="31"
            fontFamily="Sora, sans-serif"
            fontSize="12"
            fontWeight="700"
            fill="#1d2a3a"
          >
            Régis<tspan fill="#0a86c4">.</tspan>
            <tspan fill="#f07a1d">CLIM</tspan>
          </text>
          <rect x="126" y="15" width="58" height="24" rx="6" fill="#1d2a3a" />
          <circle
            className="splash-led"
            cx="173"
            cy="27"
            r="5"
            fill="#5fd0ff"
            filter="url(#splash-glow-filter)"
          />
          <circle cx="173" cy="27" r="3" fill="#bfeaff" />
          <rect x="12" y="44" width="176" height="12" rx="6" fill="#16202c" />
          <rect
            className="splash-flap"
            x="14"
            y="50"
            width="172"
            height="8"
            rx="4"
            fill="#dfe6ee"
          />
        </svg>
        <span className="splash-temp absolute top-[19%] left-[65%] font-mono text-sm text-[#5fd0ff] sm:text-base" />
        <svg
          viewBox="0 0 240 200"
          className="absolute top-[88%] left-1/2 h-40 w-56 -translate-x-1/2 overflow-visible"
        >
          <g
            fill="none"
            stroke="rgb(190,232,255)"
            strokeLinecap="round"
            opacity="0.6"
            className="splash-wind"
          >
            {[
              "M100 0 C 96 50, 76 90, 66 150",
              "M120 0 C 122 60, 112 110, 120 170",
              "M140 0 C 146 50, 166 90, 176 150",
            ].map((d, i) => (
              <path
                key={d}
                d={d}
                strokeWidth={4}
                className="wind-line"
                style={{ animationDelay: `${-i * 0.6}s`, filter: "blur(2px)" }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
