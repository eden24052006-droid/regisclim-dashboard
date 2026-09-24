import { Link } from "@tanstack/react-router";
import { Clock3, Facebook, Flame, Menu, Phone, Snowflake, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/" as const, label: "Accueil" },
  { to: "/installation-de-climatisation-a-nimes" as const, label: "Installation" },
  { to: "/pose-et-entretien-de-climatisation" as const, label: "Entretien" },
  { to: "/climatisation-pour-votre-maison" as const, label: "Quel usage ?" },
  { to: "/aides-et-subventions" as const, label: "Aides" },
];

export function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="RegisClim, accueil">
      <span className="relative grid size-11 place-items-center rounded-sm bg-primary text-primary-foreground">
        <Snowflake className="size-6 transition-transform duration-500 group-hover:rotate-90" />
        <Flame className="absolute -bottom-1 -right-1 size-5 rounded-full bg-accent p-1 text-accent-foreground" />
      </span>
      <span className="font-display text-2xl font-extrabold text-foreground">Régis<span className="text-primary">.</span><span className="text-accent">CLIM</span></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(117);

  useEffect(() => {
    const bars = barsRef.current;
    if (!bars) return;
    const observer = new ResizeObserver(() => setHeaderHeight(bars.offsetHeight + 1));
    observer.observe(bars);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div aria-hidden style={{ height: headerHeight }} />
    <header className="fixed inset-x-0 top-0 z-50 max-h-screen overflow-y-auto border-b border-border/80 bg-background/95 backdrop-blur">
      <div ref={barsRef}>
      <div className="border-b border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 text-xs font-semibold sm:px-8">
          <span className="hidden items-center gap-2 sm:flex"><Clock3 className="size-3.5 text-accent" /> Lun–Ven · 8h–17h</span>
          <span>Climaticien à Nîmes et ses environs</span>
          <a href="tel:0767875716" className="flex items-center gap-2 transition-colors hover:text-accent"><Phone className="size-3.5" /> 07 67 87 57 16</a>
        </div>
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{item.label}</Link>
          ))}
        </nav>
        <Button asChild variant="warm" className="hidden md:inline-flex"><a href="tel:0767875716"><Phone /> Appeler Régis</a></Button>
        <Button size="icon" variant="ghost" className="lg:hidden" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Navigation mobile">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-border py-3 text-sm font-bold">{item.label}</Link>)}
            <Button asChild variant="warm" className="mt-3"><a href="tel:0767875716"><Phone /> 07 67 87 57 16</a></Button>
          </div>
        </nav>
      )}
    </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div><Brand /><p className="mt-5 max-w-sm text-sm leading-7 text-secondary-muted">Installation et entretien de climatisation, pompes à chaleur et chauffe-eau thermodynamiques à Nîmes.</p></div>
        <div><h2 className="text-sm font-extrabold uppercase text-secondary-foreground">Nous contacter</h2><div className="mt-4 space-y-3 text-sm text-secondary-muted"><p>2 Impasse des Caprices<br />30900 Nîmes</p><a href="tel:0767875716" className="block font-bold text-secondary-foreground">07 67 87 57 16</a><p>Lundi au vendredi · 8h–17h</p></div></div>
        <div><h2 className="text-sm font-extrabold uppercase text-secondary-foreground">Informations</h2><div className="mt-4 grid gap-3 text-sm text-secondary-muted"><Link to="/mentions-legales" className="hover:text-secondary-foreground">Mentions légales</Link><a href="https://www.facebook.com/regis.clim30/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-secondary-foreground"><Facebook className="size-4" /> Facebook</a><span>RGE QualiPAC · Artisan CMA</span></div></div>
      </div>
      <div className="border-t border-secondary-border py-5 text-center text-xs text-secondary-muted">© 2026 RegisClim · Site original réalisé par Charles Pons</div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-secondary py-16 text-secondary-foreground sm:py-20">
      <div className="absolute inset-y-0 right-0 w-1/3 bg-primary opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8"><p className="eyebrow text-accent">{eyebrow}</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold sm:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-secondary-muted sm:text-lg">{children}</p></div>
    </section>
  );
}

export function ContactBand({ title = "Parlons de votre projet" }: { title?: string }) {
  return (
    <section className="bg-primary py-12 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center"><div><p className="eyebrow text-primary-foreground/70">Conseil personnalisé</p><h2 className="mt-2 font-display text-3xl font-extrabold">{title}</h2><p className="mt-2 text-primary-foreground/80">Un interlocuteur unique pour étudier la solution adaptée à vos besoins.</p></div><Button asChild size="hero" variant="warm"><a href="tel:0767875716"><Phone /> 07 67 87 57 16</a></Button></div></section>
  );
}