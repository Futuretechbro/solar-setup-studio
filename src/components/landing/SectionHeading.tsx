import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.25em] ${light ? "text-sun" : "text-leaf"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${light ? "text-forest-foreground" : "text-forest"}`}
      >
        {title}
      </h2>
      {children && (
        <p className={`mt-4 text-lg ${light ? "text-forest-foreground/75" : "text-muted-foreground"}`}>
          {children}
        </p>
      )}
    </div>
  );
}
