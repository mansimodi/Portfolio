import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import FieldNoteModal from './FieldNoteModal';
import { getRandomFieldNote, type FieldNote } from '../data/fieldNotes';

/** A small scuba diver who lives in the corner of every page. Click him and
 * he surfaces a random "field note" — a mix of personal and professional
 * trivia — in a dialogue box styled like a dive log entry. */
export default function DiveBuddy() {
  const [note, setNote] = useState<FieldNote | null>(null);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const handleOpen = () => {
    setNote(getRandomFieldNote(note?.title));
    setHasBeenClicked(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-8">
        {!hasBeenClicked && (
          <div
            className="dive-buddy-speech pointer-events-none rounded-full border border-contour/40 bg-surface-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted shadow-sm"
            style={{ animationDelay: '2.5s', opacity: 0 }}
          >
            Tap for a field note
          </div>
        )}

        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open a random field note from Mansi's dive log"
          className="dive-buddy-float group relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16"
        >
          {/* Bubbles rising from the regulator */}
          <span
            className="dive-buddy-bubble absolute left-[58%] top-1 h-1.5 w-1.5 rounded-full bg-accent/50"
            style={{ animationDelay: '0s' }}
            aria-hidden="true"
          />
          <span
            className="dive-buddy-bubble absolute left-[68%] top-2 h-1 w-1 rounded-full bg-accent/40"
            style={{ animationDelay: '1s' }}
            aria-hidden="true"
          />
          <span
            className="dive-buddy-bubble absolute left-[50%] top-0 h-[3px] w-[3px] rounded-full bg-accent/40"
            style={{ animationDelay: '2s' }}
            aria-hidden="true"
          />

          <svg
            viewBox="0 0 100 100"
            className="h-full w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"
          >
            {/* Fins */}
            <path d="M38 78 L20 92 Q34 88 42 80 Z" fill="var(--color-accent-dim)" />
            <path d="M62 78 L80 92 Q66 88 58 80 Z" fill="var(--color-accent-dim)" />

            {/* Tank */}
            <rect x="41" y="18" width="18" height="34" rx="6" fill="var(--color-surface-elevated)" stroke="var(--color-contour)" strokeWidth="1.5" />
            <rect x="46" y="14" width="8" height="6" rx="2" fill="var(--color-contour)" />

            {/* Body */}
            <ellipse cx="50" cy="58" rx="17" ry="22" fill="var(--color-accent)" />

            {/* Arm (waving) */}
            <path
              d="M64 50 Q78 44 76 30"
              stroke="var(--color-accent)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="76" cy="28" r="5" fill="var(--color-accent)" />

            {/* Other arm, resting */}
            <path
              d="M36 52 Q26 62 30 74"
              stroke="var(--color-accent)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Head */}
            <circle cx="50" cy="34" r="15" fill="var(--color-accent)" />

            {/* Mask */}
            <rect x="38" y="27" width="24" height="14" rx="7" fill="var(--color-surface-elevated)" opacity="0.9" />
            <circle cx="46" cy="34" r="3.2" fill="var(--color-background)" />
            <circle cx="56" cy="34" r="3.2" fill="var(--color-background)" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {note && <FieldNoteModal note={note} onClose={() => setNote(null)} />}
      </AnimatePresence>
    </>
  );
}
