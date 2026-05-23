import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/85 via-foreground/65 to-primary/65" />
      </div>
      <div className="container-x relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl text-background">
          {eyebrow && (
            <span className="inline-block rounded-full bg-accent/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base text-background/90 md:text-lg">{description}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
