import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/Section";
import { pillars, stats, activeHubs, site, heroImages } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M-CERN — A Resilient and United Mathare" },
      { name: "description", content: "Community-led disaster preparedness, climate action, and emergency response across Nairobi's informal settlements." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages.home}
            alt="M-CERN volunteer conducting a live fire-response demonstration in a Mathare neighbourhood"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/85 via-foreground/65 to-primary/55" />
        </div>
        <div className="container-x relative z-10 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl text-background">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" /> Mathare, Nairobi
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] md:text-6xl lg:text-7xl">
              A Resilient and<br />United Mathare
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-background/90 md:text-xl">
              Community-led disaster preparedness, climate action, and emergency response across Nairobi's informal settlements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6 font-semibold">
                <Link to="/services">Our Work <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-background/40 bg-background/10 px-6 font-semibold text-background backdrop-blur hover:bg-background hover:text-foreground">
                <Link to="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are snapshot */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">Who We Are</span>
            <h2 className="text-3xl font-bold md:text-4xl">Grassroots, community-led, and built to respond.</h2>
            <p className="text-base text-muted-foreground md:text-lg">
              M-CERN is a network of volunteers from the Future Hope Response Team and Reach Community, trained through the Urban Community Resilience Building (UCRB) program supported by the Kenya Red Cross Society. Officially registered on November 5, 2025, we bring over five years of grassroots experience to emergency response, climate action, community health, and empowerment.
            </p>
            <p className="text-base text-muted-foreground md:text-lg">
              Founded in Mathare, Nairobi — our point of origin — we are not limited to Mathare. M-CERN is ready to collaborate and operate across other wards, sub-counties, and counties in Kenya whenever we are invited or engaged.
            </p>
            <Button asChild variant="link" className="h-auto p-0 text-primary">
              <Link to="/about">Read our full story <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60">
            <img
              src={heroImages.team}
              alt="M-CERN team gathered for a group portrait after a training session"
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Stats */}
      <section className="border-y border-border bg-foreground py-12 text-background md:py-16">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-3xl font-bold text-accent md:text-4xl lg:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-background/75 md:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <Section>
        <SectionHeader
          eyebrow="What We Do"
          title="Four pillars driving community resilience"
          description="Each pillar reflects what Mathare residents need most — and what our volunteers are trained to deliver."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.id} className="group overflow-hidden rounded-2xl border-border/60 p-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-5/4 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <span className={`absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background/95 text-foreground shadow-sm ring-1 ring-border/60`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <CardContent className="space-y-3 p-6 pt-5">
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.blurb}</p>
                  <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section className="bg-muted/40">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-l-4 border-l-primary">
            <CardContent className="p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Vision</span>
              <h3 className="mt-2 font-display text-2xl font-bold">A resilient and united Mathare</h3>
              <p className="mt-3 text-muted-foreground">
                A community well-prepared to respond to emergencies and disasters — where every resident, regardless of ability or age, has the skills and support to stay safe.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-l-4 border-l-secondary">
            <CardContent className="p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Mission</span>
              <h3 className="mt-2 font-display text-2xl font-bold">Coordinate. Strengthen. Empower.</h3>
              <p className="mt-3 text-muted-foreground">
                To coordinate, strengthen, and empower community-led efforts in disaster preparedness, emergency response, climate action, and resilience building across Mathare.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Areas of Operation */}
      <Section>
        <SectionHeader
          eyebrow="Where We Work"
          title="Active across Nairobi — and growing"
          description="From our base in Mathare, M-CERN runs established responder networks in three sub-counties, with a phased plan to reach all 17 sub-counties of Nairobi County."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {activeHubs.map((h) => (
            <Card key={h.subCounty} className="rounded-2xl border-t-4 border-t-secondary border-border/60 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold">{h.subCounty}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {h.hubs.map((hub) => (
                    <span key={hub} className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium">
                      {hub}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="rounded-full font-semibold">
            <Link to="/services">See our full coverage &amp; expansion plan <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[oklch(0.45_0.2_25)] p-10 text-primary-foreground shadow-xl md:p-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-bold md:text-5xl">Join us in building a safer Mathare.</h2>
              <p className="mt-4 text-base text-primary-foreground/90 md:text-lg">
                Volunteer, partner, or support {site.name}. Every hand strengthens our network.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full bg-background px-6 font-semibold text-foreground hover:bg-accent hover:text-accent-foreground">
                <Link to="/contact">Contact us <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
