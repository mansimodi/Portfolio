/** Loads Microsoft Clarity (click heatmaps, scroll depth, time on page, session replays).
 * It only runs when VITE_CLARITY_PROJECT_ID is set, so local development and previews
 * without the variable send nothing. Clarity masks typed form input by default. */
export function loadClarity(projectId: string | undefined) {
  if (!projectId || typeof window === 'undefined') return;
  if (!/^[a-z0-9]+$/i.test(projectId)) return;

  type ClarityQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };
  const w = window as unknown as { clarity?: ClarityQueue };
  if (w.clarity) return;

  const queue: ClarityQueue = (...args: unknown[]) => {
    (queue.q = queue.q || []).push(args);
  };
  w.clarity = queue;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(script);
}
