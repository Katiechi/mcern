import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { galleryItems, galleryFilters, heroImages, type GalleryItem } from "@/data/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — M-CERN" },
      { name: "description", content: "Photos from M-CERN's work in Mathare: disaster response, climate action, community health, empowerment, and trainings." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  // Reset lightbox when filter changes so we don't point at an invalid index.
  useEffect(() => {
    setActiveIdx(null);
  }, [filter]);

  const active = activeIdx !== null ? items[activeIdx] : null;

  const showPrev = () => setActiveIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const showNext = () => setActiveIdx((i) => (i === null ? null : (i + 1) % items.length));

  // Keyboard nav inside lightbox
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, items.length]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our Work in Pictures"
        description="Stories from the field — captured by our volunteers and community partners."
        imageSrc={heroImages.gallery}
        imageAlt="A volunteer stands silhouetted against a dramatic night fire response in Mathare"
      />

      <Section>
        {/* Filters */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
          {galleryFilters.map((f) => {
            const count = f === "All" ? galleryItems.length : galleryItems.filter((g) => g.category === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                role="tab"
                aria-selected={filter === f}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {f}
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", filter === f ? "bg-primary-foreground/20" : "bg-muted-foreground/15")}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry-ish grid */}
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              onClick={() => setActiveIdx(idx)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              aria-label={`Open image: ${item.caption}`}
            >
              <div className={cn("relative", idx % 3 === 0 ? "aspect-4/5" : idx % 3 === 1 ? "aspect-4/3" : "aspect-square")}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent p-4 text-left">
                  <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    {item.category}
                  </span>
                  <p className="mt-2 text-sm font-medium text-background">{item.caption}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">No photos in this category yet.</p>
        )}
      </Section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActiveIdx(null)}>
        <DialogContent className="max-w-5xl overflow-hidden p-0">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.caption}</DialogTitle>
              <DialogDescription className="sr-only">{active.alt}</DialogDescription>
              <div className="relative bg-foreground">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="mx-auto max-h-[75vh] w-auto object-contain"
                />
                {items.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); showPrev(); }}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); showNext(); }}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setActiveIdx(null)}
                  aria-label="Close"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{active.category}</span>
                  <p className="mt-2 font-display text-lg font-semibold">{active.caption}</p>
                </div>
                {activeIdx !== null && items.length > 1 && (
                  <span className="shrink-0 text-xs text-muted-foreground">{activeIdx + 1} / {items.length}</span>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
