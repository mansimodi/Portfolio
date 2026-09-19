interface SectionLabelProps {
  depth?: string;
  label: string;
  variant?: 'deep' | 'surface';
}

export default function SectionLabel({ depth, label, variant = 'deep' }: SectionLabelProps) {
  const isSurface = variant === 'surface';

  return (
    <div className="mb-12 flex items-center gap-4">
      <div
        className={`h-px w-12 ${isSurface ? 'bg-life-accent/40' : 'bg-contour'}`}
        aria-hidden="true"
      />
      <div className="flex items-center gap-3">
        {depth && (
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.35em] ${
              isSurface ? 'text-life-accent' : 'text-accent'
            }`}
          >
            {depth}
          </span>
        )}
        <p
          className={`font-mono text-xs uppercase tracking-widest ${
            isSurface ? 'text-life-muted' : 'text-muted'
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
