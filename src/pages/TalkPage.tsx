import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import TextReveal from '../components/TextReveal';
import SectionLabel from '../components/SectionLabel';
import { scrollToSection } from '../hooks/useLenis';
import { getTalk } from '../data/talks';

/** The page's four chapters. The top cards, the section headers, and the
 * "next" links all read from this list so they can't drift apart. */
const SECTIONS = [
  {
    id: 'prompting',
    title: 'Prompting',
    description: 'The four-part formula that gets better answers from any AI tool.',
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'What I recommend for writing, data, code, slides, sites, video, and music.',
  },
  {
    id: 'use-wisely',
    title: 'Use AI wisely',
    description: 'Four rules I learned using AI on real customer data.',
  },
  {
    id: 'prompt-to-try',
    title: 'Prompt to try',
    description: 'Copy one prompt and build your own portfolio website with Claude.',
  },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

const sectionNumber = (index: number) => String(index + 1).padStart(2, '0');

function JumpLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(to);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Clipboard API is blocked in some embedded / non-secure contexts —
      // fall back to the legacy copy command via an off-screen textarea.
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      ok = document.execCommand('copy');
      area.remove();
    }

    setCopied(ok);
    clearTimeout(resetTimer.current);
    if (ok) resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-background"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy prompt'}</span>
    </button>
  );
}

/** One chapter of the page: numbered label, headline, lead, content, and a
 * footer that hands the reader to the next chapter or back to the overview. */
function Chapter({
  id,
  headline,
  lead,
  tone = 'background',
  children,
}: {
  id: SectionId;
  headline: ReactNode;
  lead?: ReactNode;
  tone?: 'background' | 'surface';
  children: ReactNode;
}) {
  const index = SECTIONS.findIndex((section) => section.id === id);
  const next = SECTIONS[index + 1];

  return (
    <section
      id={id}
      className={`relative z-20 scroll-mt-24 border-t border-contour/30 px-4 py-20 md:px-24 ${
        tone === 'surface' ? 'bg-surface' : 'bg-background'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel id={id} label={`${sectionNumber(index)} / 04 — ${SECTIONS[index].title}`} />
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_22rem] md:items-end md:gap-12">
          <TextReveal>
            <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-5xl">{headline}</h2>
          </TextReveal>
          {lead && <p className="font-sans text-sm font-light leading-relaxed text-muted">{lead}</p>}
        </div>

        {children}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-contour/30 pt-6">
          <JumpLink
            to="sections"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" /> All sections
          </JumpLink>
          {next && (
            <JumpLink
              to={next.id}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:text-foreground"
            >
              Next: {sectionNumber(index + 1)} {next.title} <ArrowDown className="h-3.5 w-3.5" />
            </JumpLink>
          )}
        </div>
      </div>
    </section>
  );
}

export default function TalkPage() {
  const { slug } = useParams();
  const talk = getTalk(slug);

  if (!talk) return <Navigate to="/speaking" replace />;

  return (
    <div className="pt-28 md:pt-32">
      {/* Overview */}
      <header id="sections" className="relative z-20 scroll-mt-24 bg-background px-4 pb-20 md:px-24">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/speaking"
            className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All speaking engagements
          </Link>

          <p className="depth-label mb-6">
            {talk.event} // {talk.dates} // {talk.format} // {talk.minutes} min
          </p>
          <TextReveal>
            <h1 className="max-w-4xl font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
              {talk.title}
            </h1>
          </TextReveal>
          <p className="mt-6 max-w-2xl font-serif text-xl italic text-muted md:text-2xl">{talk.subtitle}</p>
          <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-foreground/80">
            {talk.intro}
          </p>

          <nav aria-label="Sections on this page" className="mt-14">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SECTIONS.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                >
                  <JumpLink
                    to={section.id}
                    className="group flex h-full flex-col rounded-2xl border border-contour/40 bg-surface/50 p-6 transition-colors hover:border-accent/60 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="font-mono text-xs text-accent">{sectionNumber(index)}</span>
                    <span className="mt-4 font-serif text-xl font-light text-foreground transition-colors group-hover:text-accent">
                      {section.title}
                    </span>
                    <span className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">
                      {section.description}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-6 font-mono text-[10px] uppercase tracking-widest text-accent">
                      Jump to section
                      <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </JumpLink>
                </motion.li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      {/* 01 — Prompting */}
      <Chapter
        id="prompting"
        tone="surface"
        headline={
          <>
            One formula for <span className="italic text-accent">every</span> AI tool.
          </>
        }
        lead="Write your prompt in four parts before you hit enter. It works the same in a chatbot, a video generator, or a music tool."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {talk.formula.map((step) => (
            <div key={step.title} className="flex flex-col rounded-2xl border border-contour/30 bg-background/60 p-7">
              <span className="font-serif text-5xl font-light italic text-accent">{step.letter}</span>
              <h3 className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">{step.title}</h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">{step.body}</p>
              <p className="mt-auto pt-5 font-serif text-sm italic leading-relaxed text-foreground/75">{step.example}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-6 mt-14 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Three habits that make it work
        </h3>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {talk.promptTips.map((tip) => (
            <div key={tip.title} className="border-l border-accent/50 pl-5">
              <h4 className="font-serif text-lg text-foreground">{tip.title}</h4>
              <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{tip.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* 02 — Tools */}
      <Chapter
        id="tools"
        headline={
          <>
            Pick a job, <span className="italic text-muted">then</span> pick a tool.
          </>
        }
        lead="Grouped by what you want to do. You don't need all of them. Pick one for the task in front of you this week."
      >
        <p className="mb-14 rounded-2xl border border-accent/40 bg-accent/5 px-6 py-5 font-sans text-sm leading-relaxed text-foreground/85">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-accent">Start here</span>
          {talk.startHere}
        </p>

        <div className="space-y-16">
          {talk.toolkit.map((group) => (
            <div key={group.group}>
              <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-contour/40 pb-4">
                <h3 className="font-serif text-2xl font-light text-foreground">{group.group}</h3>
                <p className="font-sans text-sm font-light text-muted">{group.blurb}</p>
              </div>
              <div
                className={`grid gap-x-10 gap-y-10 sm:grid-cols-2 ${
                  group.categories.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                }`}
              >
                {group.categories.map((category) => (
                  <div key={category.category}>
                    <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      {category.category}
                    </h4>
                    <ul className="space-y-4">
                      {category.tools.map((tool) => (
                        <li key={tool.name}>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 font-sans text-base text-foreground transition-colors hover:text-accent"
                          >
                            {tool.name}
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
                          </a>
                          <p className="font-sans text-xs font-light leading-relaxed text-muted">{tool.bestFor}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-muted/70">
          Tools change monthly. Check pricing and terms before you commit.
        </p>
      </Chapter>

      {/* 03 — Use AI wisely */}
      <Chapter
        id="use-wisely"
        tone="surface"
        headline={
          <>
            Make AI your friend, <span className="italic text-accent">not your enemy.</span>
          </>
        }
        lead={talk.wiselyIntro}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {talk.rules.map((rule, index) => (
            <div key={rule.title} className="rounded-2xl border border-contour/30 bg-background/60 p-7">
              <span className="font-mono text-xs text-accent">{sectionNumber(index)}</span>
              <h3 className="mt-3 font-serif text-xl font-light text-foreground">{rule.title}</h3>
              <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{rule.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* 04 — Prompt to try */}
      <Chapter
        id="prompt-to-try"
        headline={
          <>
            Build your own portfolio site <span className="italic text-accent">with Claude.</span>
          </>
        }
        lead="This is the prompt from my live demo. It uses the same four-part formula from section 01."
      >
        <ol className="mb-10 grid gap-6 md:grid-cols-3">
          {talk.demoSteps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="font-mono text-xs text-accent">{sectionNumber(index)}</span>
              <p className="font-sans text-sm font-light leading-relaxed text-muted">{step}</p>
            </li>
          ))}
        </ol>

        <div className="overflow-hidden rounded-2xl border border-contour/40 bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-contour/40 px-6 py-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Portfolio website prompt</p>
            <CopyPromptButton text={talk.demoPrompt} />
          </div>
          <pre
            data-lenis-prevent
            tabIndex={0}
            aria-label="Portfolio website prompt"
            className="max-h-[28rem] overflow-auto whitespace-pre-wrap p-6 font-mono text-xs leading-relaxed text-foreground/85 md:p-8"
          >
            {talk.demoPrompt}
          </pre>
        </div>

        <h3 className="mb-4 mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Then try follow-ups like
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {talk.followUps.map((followUp) => (
            <li
              key={followUp}
              className="rounded-xl border border-contour/30 bg-surface/60 px-5 py-4 font-serif text-sm italic text-foreground/80"
            >
              "{followUp}"
            </li>
          ))}
        </ul>
      </Chapter>

      {/* Connect */}
      <section className="relative z-20 border-t border-contour/30 bg-surface px-4 py-20 md:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-xl font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
            Questions, or want to grab a coffee in the <span className="italic text-accent">Bay Area?</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://linkedin.com/in/mansimodi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-contour px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:mansimodi90@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-background transition-colors hover:bg-foreground"
            >
              Email me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
