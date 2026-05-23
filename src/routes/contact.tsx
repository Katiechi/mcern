import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Heart, Handshake, HandCoins, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { site, heroImages, phones } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — M-CERN" },
      { name: "description", content: "Get in touch with the Mathare Community Emergency Response Network. Volunteer, partner, donate, or send us a message." },
    ],
  }),
  component: Contact,
});

const subjects = ["General Inquiry", "Volunteer", "Partnership", "Donate", "Media"] as const;
type Subject = (typeof subjects)[number];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.enum(subjects),
  message: z.string().trim().min(10, "Please share a bit more (10+ chars)").max(1000),
});

function Contact() {
  const [subject, setSubject] = useState<Subject>("General Inquiry");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject,
      message: String(fd.get("message") || ""),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path.join(".")] = i.message;
      });
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);

    // If the API endpoint is unavailable (not configured yet, or running on a
    // host without the function), open the visitor's email client instead.
    const openMailtoFallback = () => {
      const body = encodeURIComponent(
        `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone || "—"}\nSubject: ${parsed.data.subject}\n\n${parsed.data.message}`,
      );
      const subjectLine = encodeURIComponent(`[M-CERN] ${parsed.data.subject} — ${parsed.data.name}`);
      window.location.href = `mailto:${site.email}?subject=${subjectLine}&body=${body}`;
      toast.info("Opening your email app so you can send the message directly.");
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone ?? "",
          subject: parsed.data.subject,
          message: parsed.data.message,
          "bot-field": String(fd.get("bot-field") ?? ""),
        }),
      });

      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && json?.ok) {
        toast.success("Message sent — we'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
        setSubject("General Inquiry");
      } else {
        openMailtoFallback();
      }
    } catch {
      openMailtoFallback();
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = (s: Subject) => {
    setSubject(s);
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Have a question, want to volunteer, or interested in partnering? We'd love to hear from you."
        imageSrc={heroImages.contact}
        imageAlt="M-CERN team and partners gathered together in Mathare"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: contact info */}
          <div className="space-y-4 lg:col-span-2">
            <ContactCard
              icon={Mail}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <PhonesCard phones={phones} />
            <ContactCard
              icon={MapPin}
              label="Location"
              value={site.location}
              href={site.mapsHref}
            />

            {/* Embedded map */}
            <div className="mt-2 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                src={site.mapsEmbed}
                title="Map of Mathare, Nairobi, Kenya"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[280px] w-full border-0"
              />
            </div>
          </div>

          {/* Right: form */}
          <Card id="contact-form" className="rounded-2xl shadow-sm lg:col-span-3">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">We typically respond within 2–3 business days.</p>

              <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
                {/* Honeypot — hidden from humans, bots typically fill it. */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    <Input id="name" name="name" required autoComplete="name" maxLength={100} />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <Input id="email" name="email" type="email" required autoComplete="email" maxLength={255} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="phone" label="Phone (optional)" error={errors.phone}>
                    <Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} />
                  </Field>
                  <Field id="subject" label="Subject">
                    <Select value={subject} onValueChange={(v) => setSubject(v as Subject)}>
                      <SelectTrigger id="subject"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {subjects.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field id="message" label="Message" error={errors.message}>
                  <Textarea id="message" name="message" required rows={5} maxLength={1000} placeholder="Tell us how we can help…" />
                </Field>

                <Button type="submit" size="lg" disabled={submitting} className="rounded-full font-semibold">
                  {submitting ? "Sending…" : (<>Send message <Send className="h-4 w-4" /></>)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* How You Can Help */}
      <Section className="bg-muted/40">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Get Involved</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">How you can help</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <HelpCard
            icon={Heart}
            title="Volunteer"
            description="Give your time and skills to community trainings, response drills, and outreach."
            cta="Volunteer with us"
            onClick={() => scrollToForm("Volunteer")}
          />
          <HelpCard
            icon={Handshake}
            title="Partner With Us"
            description="Bring your organization alongside ours to expand impact across Mathare."
            cta="Start a partnership"
            onClick={() => scrollToForm("Partnership")}
          />
          <HelpCard
            icon={HandCoins}
            title="Donate"
            description="Your support funds training kits, equipment, and emergency response capacity."
            cta="Donate today"
            onClick={() => scrollToForm("Donate")}
          />
        </div>
      </Section>
    </>
  );
}

function PhonesCard({ phones }: { phones: { role: string; number: string; href: string }[] }) {
  return (
    <Card className="rounded-2xl border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-5">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Phone className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
          <ul className="mt-2 divide-y divide-border/60">
            {phones.map((p) => (
              <li key={p.href} className="py-2 first:pt-0 last:pb-0">
                <div className="text-xs font-medium text-muted-foreground">{p.role}</div>
                <a
                  href={p.href}
                  className="mt-0.5 block break-words font-display text-base font-semibold text-foreground hover:text-primary"
                >
                  {p.number}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <Card className="rounded-2xl border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-5">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="mt-1 block break-words font-display text-lg font-semibold text-foreground hover:text-primary"
          >
            {value}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function HelpCard({ icon: Icon, title, description, cta, onClick }: { icon: typeof Heart; title: string; description: string; cta: string; onClick: () => void }) {
  return (
    <Card className="rounded-2xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="space-y-4 p-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button onClick={onClick} variant="outline" className="rounded-full font-semibold">{cta}</Button>
      </CardContent>
    </Card>
  );
}
