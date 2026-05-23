import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-foreground text-background">
      <div className="container-x grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background/95 p-1 shadow-sm">
              <img src={site.logo} alt="" aria-hidden="true" className="h-full w-full object-contain" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold">{site.name}</div>
              <div className="text-[11px] text-background/60">{site.tagline}</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-background/70">{site.description}</p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-background/80">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-background/70 transition-colors hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-background/80">Contact</h3>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-accent break-all">{site.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
              <a href={site.phoneHref} className="hover:text-accent">{site.phone}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
              <span>{site.location}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-background/80">Follow</h3>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-5 text-center text-xs text-background/60">
          © 2025 M-CERN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
