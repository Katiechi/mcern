import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/Section";
import { values, heroImages, origin } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — M-CERN" },
      { name: "description", content: "Learn about Mathare Community Emergency Response Network: who we are, our vision, mission, and C-I-V-I-T-A-S core values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A network rooted in Mathare, built by its people."
        description="Volunteers, training, and a shared commitment to a safer, more resilient community."
        imageSrc={heroImages.about}
        imageAlt="M-CERN volunteers seated together during a Kenya Red Cross UCRB capacity-building training"
      />

      {/* Who we are */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-3">
            <SectionHeader eyebrow="Who We Are" title="Grassroots experience, formally united." />
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              M-CERN is a grassroots, community-led network operating in Nairobi, Kenya's informal settlements. Formed by dedicated volunteers from the Future Hope Response Team and Reach Community, our network was established after receiving intensive capacity-building trainings through the Urban Community Resilience Building (UCRB) program supported by the Kenya Red Cross Society. Officially registered on November 5, 2025, M-CERN leverages over five years of active grassroots experience working directly with communities in emergency response, climate action, community health, and socio-economic empowerment.
            </p>

            {/* Origin & reach */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-secondary">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <span className="font-display text-sm font-semibold uppercase tracking-wider">Our Origin &amp; Reach</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                M-CERN was originally founded in Mathare, Nairobi, and that remains our point of origin and base. We are not, however, limited to Mathare — the organization has the capacity and intention to collaborate and operate across other wards, sub-counties, and counties in Kenya whenever we are invited or engaged.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-sm font-medium">
                {origin.trail.map((step, i) => (
                  <Fragment key={step}>
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">{step}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60 lg:col-span-2">
            <img
              src={heroImages.team}
              alt="M-CERN team gathered for a group portrait"
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section className="bg-muted/40">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Vision</span>
              <p className="mt-3 font-display text-xl font-semibold leading-snug md:text-2xl">
                A resilient and united Mathare community, well-prepared to respond to emergencies and disasters.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-l-4 border-l-secondary shadow-sm">
            <CardContent className="p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Mission</span>
              <p className="mt-3 font-display text-xl font-semibold leading-snug md:text-2xl">
                To coordinate, strengthen, and empower community-led efforts in disaster preparedness, emergency response, climate action, and resilience building across Mathare.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Core values - CIVITAS */}
      <Section>
        <SectionHeader
          eyebrow="Our Core Values"
          title="C-I-V-I-T-A-S"
          description="Seven values that guide every decision, response, and partnership."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-2xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="space-y-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-display text-5xl font-bold text-accent/40">{v.letter}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
