export interface FieldNote {
  tag: string;
  title: string;
  body: string;
}

/**
 * Random "field notes" the Dive Buddy hands over on click — a mix of the
 * personal (from the Life section) and the professional (from Impact /
 * Projects), so every visit surfaces something a little different.
 */
export const FIELD_NOTES: FieldNote[] = [
  {
    tag: 'Personal log',
    title: 'Underwater hockey',
    body: "My signature hobby is genuinely underwater hockey — reading a 3D field through a snorkel teaches you a lot about staying calm in noisy data, too.",
  },
  {
    tag: 'Personal log',
    title: 'Slow craft',
    body: "When I'm not modeling pipelines, I'm probably crocheting or painting — one loop, one brushstroke at a time.",
  },
  {
    tag: 'Personal log',
    title: 'Always exploring',
    body: 'New coastlines and new cities reset how I see patterns — in places and in people, not just in data.',
  },
  {
    tag: 'Field sounding',
    title: '100K+ transcripts / week',
    body: 'AI-assisted analysis of 100K+ call & chat transcripts weekly lifted resolve rate by 10% and cut handle time by 15%.',
  },
  {
    tag: 'Field sounding',
    title: '$2M recovered',
    body: 'Root-causing a routing bug and redirecting insurance calls to the right department saved AT&T $2M annually.',
  },
  {
    tag: 'Field sounding',
    title: '75% forecast accuracy gain',
    body: 'A Prophet-based forecasting pipeline lifted revenue forecast accuracy by 75% across every AT&T line of business.',
  },
  {
    tag: 'Dive log',
    title: "You found the buddy",
    body: "Every good dive has a buddy. Mine's usually a dashboard — but I'll take a curious visitor too. Say hello via the Contact page.",
  },
];

export function getRandomFieldNote(excludeTitle?: string): FieldNote {
  const pool = excludeTitle ? FIELD_NOTES.filter((n) => n.title !== excludeTitle) : FIELD_NOTES;
  return pool[Math.floor(Math.random() * pool.length)];
}
