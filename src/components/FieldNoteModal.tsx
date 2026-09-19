import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import type { FieldNote } from '../data/fieldNotes';

interface FieldNoteModalProps {
  note: FieldNote;
  onClose: () => void;
}

export default function FieldNoteModal({ note, onClose }: FieldNoteModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="field-note-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-contour/40 bg-surface-elevated p-7 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close field note"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-contour/20 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          {note.tag}
        </p>
        <h3 id="field-note-title" className="mb-3 font-serif text-2xl font-light text-foreground">
          {note.title}
        </h3>
        <p className="font-sans text-sm font-light leading-relaxed text-muted">{note.body}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:text-foreground"
        >
          Close log →
        </button>
      </motion.div>
    </motion.div>
  );
}
