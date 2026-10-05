import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Check, Copy } from 'lucide-react';
import TextReveal from '../components/TextReveal';
import SectionLabel from '../components/SectionLabel';
import { getTalk } from '../data/talks';

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

export default function TalkPage() {
  const { slug } = useParams();
  const talk = getTalk(slug);

  if (!talk) return <Navigate to="/work#speaking" replace />;

  return (
    <div className="pt-28 md:pt-32">
      {/* Header */}
      <header className="relative z-20 bg-background px-4 pb-16 md:px-24">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/work#speaking"
            className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All talks
          </Link>

          <p className="depth-label mb-6">
            {talk.event} // {talk.dates} // {talk.format}
          </p>
          <TextReveal>
            <h1 className="max-w-4xl font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
              {talk.title}
            </h1>
          </TextReveal>
          <p className="mt-6 max-w-2xl font-serif text-xl italic text-muted md:text-2xl">
            {talk.subtitle}
          </p>
        </div>
      </header>

      <div className="contour-rule mx-4 md:mx-24" aria-hidden="true" />

      {/* The promise */}
      <section id="takeaways" className="relative z-20 scroll-mt-24 bg-background px-4 py-16 md:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionLabel id="takeaways" label="Today" />
          <TextReveal className="mb-12">
            <h2 className="max-w-3xl font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
              Give me the next {talk.minutes} minutes, and you'll walk away with{' '}
              <span className="italic text-accent">three things.</span>
            </h2>
          </TextReveal>

          <ol className="grid gap-6 md:grid-cols-3">
            {talk.takeaways.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-contour/30 bg-surface/50 p-7"
              >
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <p className="mt-4 font-sans text-sm font-light leading-relaxed text-foreground/85">{item}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-16 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {talk.whyDifferent.map((point) => (
              <div key={point.title} className="border-l border-contour pl-6">
                <h3 className="font-serif text-lg text-foreground">{point.title}</h3>
                <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="relative z-20 scroll-mt-24 border-y border-contour/30 bg-surface px-4 py-16 md:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionLabel id="agenda" label="What we'll cover" />
          <ol className="divide-y divide-contour/40">
            {talk.agenda.map((item, index) => (
              <li key={item.title} className="grid gap-2 py-6 md:grid-cols-[4rem_16rem_1fr] md:gap-8">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h3 className="font-serif text-xl font-light text-foreground">{item.title}</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prompt formula */}
      <section id="formula" className="relative z-20 scroll-mt-24 bg-background px-4 py-16 md:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionLabel id="formula" label="The formula" />
          <TextReveal className="mb-12">
            <h2 className="max-w-3xl font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
              One prompt structure that works in <span className="italic text-muted">every</span> AI tool.
            </h2>
          </TextReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {talk.formula.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col rounded-2xl border border-contour/30 bg-surface/50 p-7"
              >
                <span className="font-serif text-5xl font-light italic text-accent">{step.letter}</span>
                <h3 className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">{step.body}</p>
                <p className="mt-auto pt-5 font-serif text-sm italic leading-relaxed text-foreground/75">
                  {step.example}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-muted">
            Tip: end any prompt with <span className="text-foreground">"Before you answer, ask me any questions you need."</span>{' '}
            Then run the same prompt in two or three tools and compare what each one misses.
          </p>
        </div>
      </section>

      {/* Live demo prompt */}
      <section id="demo" className="relative z-20 scroll-mt-24 border-y border-contour/30 bg-surface px-4 py-16 md:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionLabel id="demo" label="Live demo" />
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <TextReveal>
              <h2 className="max-w-2xl font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
                Build your own portfolio site <span className="italic text-accent">with Claude.</span>
              </h2>
            </TextReveal>
            <CopyPromptButton text={talk.demoPrompt} />
          </div>

          <ol className="mb-8 grid gap-4 font-sans text-sm font-light leading-relaxed text-muted md:grid-cols-3">
            <li>
              <span className="font-mono text-xs text-accent">01</span> Copy the prompt and fill in every [bracket] with
              your own details. Paste in your resume, too, if you like.
            </li>
            <li>
              <span className="font-mono text-xs text-accent">02</span> Paste it into{' '}
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-accent/50 underline-offset-4 hover:text-accent">
                claude.ai
              </a>
              , answer its questions, and watch the site appear next to the chat.
            </li>
            <li>
              <span className="font-mono text-xs text-accent">03</span> Ask for changes one section at a time, then publish it
              using the free steps Claude gives you.
            </li>
          </ol>

          <pre
            data-lenis-prevent
            tabIndex={0}
            aria-label="Portfolio website prompt"
            className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-contour/40 bg-background p-6 font-mono text-xs leading-relaxed text-foreground/85 md:p-8"
          >
            {talk.demoPrompt}
          </pre>

          <div className="mt-10">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Good follow-ups</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {talk.followUps.map((followUp) => (
                <li
                  key={followUp}
                  className="rounded-xl border border-contour/30 bg-background/60 px-5 py-4 font-serif text-sm italic text-foreground/80"
                >
                  "{followUp}"
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section id="tools" className="relative z-20 scroll-mt-24 bg-background px-4 py-16 md:px-24">
        <div className="mx-auto max-w-6xl">
          <SectionLabel id="tools" label="The toolkit" />
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <TextReveal>
              <h2 className="max-w-2xl font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
                Pick a job, <span className="italic text-muted">then</span> pick a tool.
              </h2>
            </TextReveal>
            <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-muted">{talk.startHere}</p>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {talk.toolkit.map((group) => (
              <div key={group.category}>
                <h3 className="mb-5 border-b border-contour/40 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {group.category}
                </h3>
                <ul className="space-y-4">
                  {group.tools.map((tool) => (
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
          <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-muted/70">
            Tools change monthly. Check pricing and terms before you commit.
          </p>
        </div>
      </section>

      {/* Use it wisely */}
      <section id="wisely" className="relative z-20 scroll-mt-24 border-t border-contour/30 bg-surface px-4 py-16 md:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionLabel id="wisely" label="Use it wisely" />
          <div className="grid gap-6 sm:grid-cols-2">
            {talk.rules.map((rule, index) => (
              <div key={rule.title} className="rounded-2xl border border-contour/30 bg-background/60 p-7">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h3 className="mt-3 font-serif text-xl font-light text-foreground">{rule.title}</h3>
                <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{rule.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="relative z-20 bg-background px-4 py-20 md:px-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
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
