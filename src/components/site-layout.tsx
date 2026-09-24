import { Link, useLocation } from "@tanstack/react-router";
import { Clock3, Facebook, Flame, MapPin, Phone, Snowflake } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    const observer = new ResizeObserver(() => setHeaderHeight(bars.offsetHeight));
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
          <div className="bg-secondary text-secondary-foreground">
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
                  ? "border-border/80 bg-background/95 shadow-[var(--shadow-soft)]"
                  : "border-transparent bg-background/80",
              )}
            >
              <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-5">
                <Brand />
                <NavLinks className="hidden lg:flex" />
                <Button asChild variant="warm" className="shrink-0">
                  <a href="tel:0767875716" aria-label="Appeler Régis au 07 67 87 57 16">
                    <Phone /> <span className="hidden sm:inline">Appeler Régis</span>
                  </a>
                </Button>
              </div>
              <div className="border-t border-border/60 px-2 py-1.5 lg:hidden">
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
        "relative items-center gap-1 overflow-x-auto rounded-full border border-border/70 bg-muted/60 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
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
          activeProps={{ className: "bg-background text-primary! shadow-sm" }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-secondary-border bg-secondary text-secondary-foreground">
      <div className="glow-blob -top-32 -left-24 size-80 bg-primary/25" />
      <div className="glow-blob -right-24 -bottom-32 size-80 bg-accent/15" />
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
            <span className="w-fit rounded-full border border-secondary-border px-3 py-1 text-xs font-semibold text-secondary-foreground">
              RGE QualiPAC · Artisan CMA
            </span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-secondary-border py-6 text-center text-xs text-secondary-muted">
        © 2026 RegisClim · Site original réalisé par Charles Pons
      </div>
    </footer>
  );
}

type PageHeroVariant = "dark" | "split" | "light" | "image" | "warm" | "minimal";

export function PageHero({
  eyebrow,
  title,
  children,
  variant = "dark",
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  variant?: PageHeroVariant;
  image?: string;
  imageAlt?: string;
}) {
  if (variant === "split") {
    return (
      <section className="border-b border-border bg-muted">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="animate-rise flex flex-col justify-center px-5 py-16 sm:px-8 lg:py-24 lg:pr-16">
            <p className="eyebrow text-accent">{eyebrow}</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-bold sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{children}</p>
            <span className="bg-gradient-warm mt-10 h-1 w-24" />
          </div>
          {image && (
            <img
              src={image}
              width={1200}
              height={900}
              alt={imageAlt}
              className="aspect-[4/3] size-full object-cover lg:aspect-auto lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"
            />
          )}
        </div>
      </section>
    );
  }

  if (variant === "light") {
    return (
      <section className="relative overflow-hidden px-5 pt-16 pb-8 text-center sm:pt-24">
        <div className="glow-blob top-0 left-1/2 size-[28rem] -translate-x-1/2 bg-primary/10" />
        <div className="animate-rise relative mx-auto max-w-4xl">
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] font-bold sm:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {children}
          </p>
          <div className="mx-auto mt-12 flex max-w-xs items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <Snowflake className="size-4 text-primary" />
            <Flame className="size-4 text-accent" />
            <span className="h-px flex-1 bg-border" />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "image") {
    return (
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-secondary text-secondary-foreground">
        {image && (
          <img
            src={image}
            width={1600}
            height={1000}
            alt={imageAlt}
            className="absolute inset-0 size-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/10" />
        <div className="animate-rise relative mx-auto w-full max-w-7xl px-5 pt-32 pb-14 sm:px-8 sm:pb-20">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] font-bold sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl border-l-2 border-accent pl-5 text-lg leading-8 text-secondary-foreground/85">
            {children}
          </p>
        </div>
      </section>
    );
  }

  if (variant === "warm") {
    return (
      <section className="bg-gradient-warm relative overflow-hidden text-accent-foreground">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="animate-rise relative mx-auto grid max-w-7xl items-end gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-accent-foreground/80">{eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.02] font-bold sm:text-7xl">
              {title}
            </h1>
          </div>
          <p className="text-lg leading-8 text-accent-foreground/90 lg:pb-3">{children}</p>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className="border-b border-border">
        <div className="animate-rise mx-auto max-w-5xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20">
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{children}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-secondary text-secondary-foreground">
        <div className="grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="glow-blob -top-24 right-0 size-96 bg-primary/40" />
        <div className="glow-blob -bottom-40 right-1/3 size-80 bg-accent/25" />
        <div className="animate-rise relative px-6 py-16 sm:px-12 sm:py-24">
          <p className="eyebrow-pill border border-white/15 bg-white/10 text-secondary-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.1] font-bold sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-secondary-muted sm:text-lg">
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactBand({
  title = "Parlons de votre projet",
  variant = "gradient",
}: {
  title?: string;
  variant?: "gradient" | "dark" | "light";
}) {
  const intro = "Un interlocuteur unique pour étudier la solution adaptée à vos besoins.";
  const call = (
    <Button asChild size="hero" variant="warm">
      <a href="tel:0767875716">
        <Phone /> 07 67 87 57 16
      </a>
    </Button>
  );

  if (variant === "dark") {
    return (
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 md:grid-cols-[auto_1fr_auto] md:gap-12">
          <p className="eyebrow text-accent md:[writing-mode:vertical-rl] md:rotate-180">
            Conseil personnalisé
          </p>
          <div className="md:border-l md:border-secondary-border md:pl-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-secondary-muted">{intro}</p>
          </div>
          {call}
        </div>
      </section>
    );
  }

  if (variant === "light") {
    return (
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <p className="eyebrow text-primary">Conseil personnalisé</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{intro}</p>
          <div className="mt-8">{call}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-3 pb-16 sm:px-5 sm:pb-24">
      <div className="bg-gradient-cool relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] text-primary-foreground shadow-[var(--shadow-lift)]">
        <div className="grid-pattern absolute inset-0 opacity-60" />
        <div className="glow-blob -top-20 -right-10 size-72 bg-white/25" />
        <div className="glow-blob -bottom-24 left-1/4 size-72 bg-accent/40" />
        <div className="relative flex flex-col items-start justify-between gap-8 px-6 py-12 sm:px-12 sm:py-14 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-primary-foreground/75">Conseil personnalisé</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/85">{intro}</p>
          </div>
          {call}
        </div>
      </div>
    </section>
  );
}
