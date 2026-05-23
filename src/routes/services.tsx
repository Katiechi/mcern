import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pillars, heroImages, activeHubs, expansionZones, futureHorizons } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — M-CERN Thematic Pillars" },
      { name: "description", content: "Disaster Management, Climate Action, Community Health, and Empowerment & Inclusion — four pillars driving M-CERN's impact, plus our phased expansion across Nairobi's 17 sub-counties." },
    ],
  }),
  component: Services,
});

function Hub({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium">
      {label}
    </span>
  );
}

function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Thematic Pillars of Impact"
        description="Four interconnected areas of work that protect, prepare, and uplift the communities we serve."
        imageSrc={heroImages.services}
        imageAlt="M-CERN volunteer addressing a crowd at an International Firefighters Day demonstration"
      />

      {pillars.map((p, idx) => {
        const Icon = p.icon;
        const reverse = idx % 2 === 1;
        return (
          <section key={p.id} className={cn("py-16 md:py-24", p.tint)}>
            <div className="container-x">
              <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", reverse && "lg:[&>div:first-child]:order-2")}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover"
                  />
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold text-primary/30">{p.number}</span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-card text-primary shadow-sm ring-1 ring-border">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">{p.title}</h2>
                  <p className="text-base text-muted-foreground md:text-lg">{p.description}</p>
                  <ul className="space-y-2.5 pt-2">
                    {p.activities.map((a) => (
                      <li key={a} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span className="font-medium">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Areas of Operation & Phased Expansion */}
      <Section>
        <SectionHeader
          eyebrow="Where We Work"
          title="Areas of Operation & Phased Expansion"
          description="Mathare is our base and point of origin. From there, our strategic vision is to deploy active emergency response and community resilience frameworks across all 17 sub-counties of Nairobi County — and to collaborate beyond Nairobi when invited or engaged."
        />

        {/* Tier 1 — Active Hubs */}
        <div className="mt-12">
          <TierHeading dotClass="bg-secondary" title="Active Hubs" note="Established responder networks and primary intervention zones." />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {activeHubs.map((h) => (
              <Card key={h.subCounty} className="rounded-2xl border-t-4 border-t-secondary border-border/60 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                    <h4 className="font-display text-lg font-bold">{h.subCounty}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{h.focus}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {h.hubs.map((hub) => <Hub key={hub} label={hub} />)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tier 2 — Immediate Expansion Zones */}
        <div className="mt-14">
          <TierHeading dotClass="bg-accent" title="Immediate Expansion Zones" note="Where we are actively laying foundations, engaging stakeholders, and onboarding new responder teams." />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {expansionZones.map((z) => (
              <Card key={z.subCounty} className="rounded-2xl border-t-4 border-t-accent border-border/60 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="space-y-3 p-6">
                  <h4 className="font-display text-lg font-bold">{z.subCounty}</h4>
                  <div className="flex flex-wrap gap-2">
                    {z.hubs.map((hub) => <Hub key={hub} label={hub} />)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tier 3 — Future Horizons */}
        <div className="mt-14">
          <TierHeading dotClass="bg-muted-foreground/50" title="Future Horizons: The Road to 17" note="The remaining sub-counties on our path to 100% county-wide coverage." />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {futureHorizons.map((r) => (
              <Card key={r.region} className="rounded-2xl border-border/60 bg-muted/40 shadow-sm">
                <CardContent className="space-y-3 p-6">
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">{r.region}</h4>
                  <div className="flex flex-wrap gap-2">
                    {r.subCounties.map((sc) => <Hub key={sc} label={sc} />)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-[oklch(0.34_0.1_150)] p-8 text-background shadow-xl md:p-12">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold md:text-3xl">Bring M-CERN to your sub-county</h3>
            <p className="mt-3 text-background/90">
              Are you a community leader, local administrator, or resident in our active or expansion zones? Let's collaborate to build a safer, more prepared Nairobi.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full bg-background px-6 font-semibold text-foreground hover:bg-accent hover:text-accent-foreground">
              <Link to="/contact">Partner with us <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function TierHeading({ dotClass, title, note }: { dotClass: string; title: string; note: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2.5">
        <span className={cn("inline-block h-3 w-3 rounded-full", dotClass)} aria-hidden="true" />
        <h3 className="font-display text-xl font-bold md:text-2xl">{title}</h3>
      </div>
      <p className="max-w-2xl text-sm text-muted-foreground">{note}</p>
    </div>
  );
}
