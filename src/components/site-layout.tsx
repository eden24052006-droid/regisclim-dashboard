import { Link, useLocation } from "@tanstack/react-router";
import { Clock3, Facebook, Flame, MapPin, Phone, Snowflake } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, SplitWords } from "@/components/motion";

const navItems = [
  { to: "/" as const, label: "Accueil" },
  { to: "/installation-de-climatisation-a-nimes" as const, label: "Installation" },
  { to: "/pose-et-entretien-de-climatisation" as const, label: "Entretien" },
  { to: "/climatisation-pour-votre-maison" as const, label: "Quel usage ?" },
  { to: "/aides-et-subventions" as const, label: "Aides" },
];

export function Brand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="RegisClim, accueil">
      <span className="bg-gradient-cool relative grid size-10 place-items-center rounded-xl text-primary-foreground shadow-md shadow-primary/30">
        <Snowflake className="size-5 transition-transform duration-500 group-hover:rotate-90" />
        <Flame className="bg-gradient-warm absolute -bottom-1.5 -right-1.5 size-5 rounded-full p-1 text-accent-foreground ring-2 ring-background" />
      </span>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight",
          tone === "light" ? "text-secondary-foreground" : "text-foreground",
        )}
      >
        Régis<span className="text-primary">.</span>
        <span className="text-accent">CLIM</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(112);

  useEffect(() => {
    const bars = barsRef.current;
    if (!bars) return;
    const observer = new ResizeObserver(() => {
      setHeaderHeight(bars.offsetHeight);
      document.documentElement.style.setProperty("--header-h", `${bars.offsetHeight}px`);
    });
    observer.observe(bars);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div aria-hidden style={{ height: headerHeight }} />
      <header className="fixed inset-x-0 top-0 z-50 max-h-screen overflow-y-auto">
        <div ref={barsRef}>
          <div className="border-b border-white/5 bg-secondary/80 text-secondary-foreground backdrop-blur-xl">
            <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 text-xs font-semibold sm:px-8">
              <span className="hidden items-center gap-2 text-secondary-muted sm:flex">
                <Clock3 className="size-3.5 text-accent" /> Lun–Ven · 8h–17h
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="hidden size-3.5 text-primary sm:block" />
                Climaticien à Nîmes et ses environs
              </span>
              <a
                href="tel:0767875716"
                className="flex shrink-0 items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="size-3.5" /> 07 67 87 57 16
              </a>
            </div>
          </div>
          <div className="px-3 pt-3 sm:px-5">
            <div
              className={cn(
                "mx-auto max-w-7xl rounded-2xl border backdrop-blur-xl transition-all duration-300",
                scrolled
                  ? "border-white/10 bg-background/75 shadow-[var(--shadow-lift)]"
                  : "border-white/5 bg-background/40",
              )}
            >
              <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-5">
                <Brand />
                <NavLinks className="hidden lg:flex" />
                <Button asChild variant="warm" className="btn-shine shrink-0">
                  <a href="tel:0767875716" aria-label="Appeler Régis au 07 67 87 57 16">
                    <Phone /> <span className="hidden sm:inline">Appeler Régis</span>
                  </a>
                </Button>
              </div>
              <div className="border-t border-white/10 px-2 py-1.5 lg:hidden">
                <NavLinks className="flex rounded-none border-0 bg-transparent px-1 [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-28px),transparent)]" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function NavLinks({ className }: { className?: string }) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>("[data-status='active']");
    if (!nav || !active) return;
    nav.scrollTo({
      left: active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      aria-label="Navigation principale"
    >
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.to === "/" }}
          className="shrink-0 rounded-full px-3 py-2 text-[13px] font-semibold sm:px-4 sm:text-sm whitespace-nowrap text-muted-foreground transition-all hover:text-foreground"
          activeProps={{ className: "bg-white/10 text-foreground! shadow-sm" }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-secondary/70 text-secondary-foreground backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Brand tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-secondary-muted">
            Installation et entretien de climatisation, pompes à chaleur et chauffe-eau
            thermodynamiques à Nîmes.
          </p>
        </div>
        <div>
          <h2 className="eyebrow text-secondary-muted">Nous contacter</h2>
          <div className="mt-5 space-y-3 text-sm text-secondary-muted">
            <p>
              2 Impasse des Caprices
              <br />
              30900 Nîmes
            </p>
            <a
              href="tel:0767875716"
              className="block font-display text-lg font-semibold text-secondary-foreground transition-colors hover:text-accent"
            >
              07 67 87 57 16
            </a>
            <p>Lundi au vendredi · 8h–17h</p>
          </div>
        </div>
        <div>
          <h2 className="eyebrow text-secondary-muted">Informations</h2>
          <div className="mt-5 grid gap-3 text-sm text-secondary-muted">
            <Link
              to="/mentions-legales"
              className="transition-colors hover:text-secondary-foreground"
            >
              Mentions légales
            </Link>
            <a
              href="https://www.facebook.com/regis.clim30/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-secondary-foreground"
            >
              <Facebook className="size-4" /> Facebook
            </a>
            <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-secondary-foreground">
              RGE QualiPAC · Artisan CMA
            </span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-6 text-center text-xs text-secondary-muted">
        © 2026 RegisClim · Site original réalisé par Charles Pons
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  image,
  imageAlt = "",
  icon,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  icon?: ReactNode;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pt-14 pb-6 sm:px-8 sm:pt-20">
      <div
        className={cn(
          "grid items-center gap-12",
          image ? "lg:grid-cols-[1.15fr_1fr]" : "text-center",
        )}
      >
        <div className={cn(!image && "mx-auto max-w-4xl")}>
          <p className="eyebrow-pill animate-rise text-foreground/90">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
            <SplitWords text={title} delay={100} />
          </h1>
          <p
            className={cn(
              "animate-rise mt-7 max-w-2xl text-lg leading-8 text-muted-foreground [animation-delay:500ms]",
              !image && "mx-auto",
            )}
          >
            {children}
          </p>
        </div>
        {image ? (
          <div className="animate-rise relative [animation-delay:300ms]">
            <div className="bg-gradient-cool absolute -inset-4 rounded-[3rem] opacity-30 blur-2xl" />
            <div className="float-slow glow-border relative overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem]">
              <img
                src={image}
                width={1200}
                height={900}
                alt={imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            {icon && (
              <div className="float-slower glass absolute -bottom-6 -left-4 grid size-20 place-items-center rounded-2xl text-accent sm:-left-8">
                {icon}
              </div>
            )}
          </div>
        ) : (
          icon && (
            <div className="animate-rise mx-auto -mt-2 flex items-center gap-4 text-primary [animation-delay:700ms]">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
              {icon}
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          )
        )}
      </div>
    </section>
  );
}

export function ContactBand({ title = "Parlons de votre projet" }: { title?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div
          data-wind
          className="glow-border spotlight relative overflow-hidden rounded-[2rem] bg-secondary/60 backdrop-blur-xl"
        >
          <div className="glow-blob -top-24 -right-16 size-80 bg-primary/30" />
          <div className="glow-blob -bottom-24 -left-10 size-72 bg-accent/25" />
          <div className="relative flex flex-col items-start justify-between gap-8 px-6 py-12 sm:px-12 sm:py-16 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-accent">Conseil personnalisé</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{title}</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Un interlocuteur unique pour étudier la solution adaptée à vos besoins.
              </p>
            </div>
            <Button asChild size="hero" variant="warm" className="btn-shine shrink-0">
              <a href="tel:0767875716">
                <Phone /> 07 67 87 57 16
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
