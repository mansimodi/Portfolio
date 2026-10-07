import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Loader2, Send } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  reason: string;
  phone: string;
  message: string;
  /** Honeypot: hidden from people, filled in by bots. */
  website: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

const OWNER_EMAIL = 'mansimodi90@gmail.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL_STATE: FormState = { name: '', email: '', reason: '', phone: '', message: '', website: '' };

/** Why people reach out. Logged as its own column so inquiries are easy to sort and count. */
const REASONS = ['A product role', 'A speaking invite', 'A project or collaboration', 'Something else'] as const;

/** Google Apps Script web app that logs the inquiry to a Sheet, emails Mansi,
 * and sends the visitor an auto-reply (see integrations/google-apps-script).
 * Until it is configured, the form falls back to opening a pre-filled email. */
const INQUIRY_ENDPOINT = import.meta.env.VITE_INQUIRY_ENDPOINT;

function mailtoFallback(form: FormState) {
  const subject = `Portfolio inquiry from ${form.name}`;
  const body = [`Name: ${form.name}`, `Email: ${form.email}`, `Reason: ${form.reason}`, `Phone: ${form.phone || '—'}`, '', form.message].join('\n');
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const openedAt = useRef(Date.now());

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Please share your name.';
    if (!form.email.trim()) next.email = 'Please share an email address.';
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "That email address doesn't look quite right.";
    if (!form.reason) next.reason = 'Choose what this is about.';
    if (!form.message.trim()) next.message = 'Tell me a little about what you have in mind.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending' || !validate()) return;

    if (!INQUIRY_ENDPOINT) {
      window.location.href = mailtoFallback(form);
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      // text/plain keeps this a "simple" request, so Apps Script needs no CORS preflight.
      const response = await fetch(INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          reason: form.reason,
          phone: form.phone.trim(),
          message: form.message.trim(),
          website: form.website,
          page: window.location.pathname,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      const result = (await response.json()) as { ok?: boolean };
      setStatus(result.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const fieldClass = (hasError?: string) =>
    `w-full rounded-lg border bg-background/40 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent ${
      hasError ? 'border-accent' : 'border-contour/30'
    }`;
  const labelClass = 'mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted';
  const firstName = form.name.trim().split(' ')[0] || 'there';

  return (
    // data-clarity-mask: keep visitors' names, emails, and messages out of Clarity recordings.
    <div data-clarity-mask="True" className="rounded-2xl border border-contour/30 bg-surface/50 p-6 sm:p-8">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-accent">Send a note</p>
      <h3 className="mb-6 font-serif text-xl font-light text-foreground">Submit an inquiry</h3>

      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="rounded-lg border border-accent/30 bg-accent/10 p-5"
        >
          <p className="font-sans text-sm leading-relaxed text-foreground">
            {INQUIRY_ENDPOINT
              ? `Thanks, ${firstName}. Your inquiry is in. A confirmation is on its way to ${form.email.trim()}, and I'll get back to you within 24–48 hours.`
              : `Thanks, ${firstName}. I've opened your email app with your note filled in. Hit send and I'll get back to you within 24–48 hours.`}
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(INITIAL_STATE);
              setStatus('idle');
              openedAt.current = Date.now();
            }}
            className="mt-4 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:text-foreground"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="inquiry-name" className={labelClass}>Name</label>
            <input
              id="inquiry-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Your name"
              className={fieldClass(errors.name)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            />
            {errors.name && <p id="inquiry-name-error" className="mt-1 font-sans text-xs text-accent">{errors.name}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inquiry-email" className={labelClass}>Email</label>
              <input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={fieldClass(errors.email)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
              />
              {errors.email && <p id="inquiry-email-error" className="mt-1 font-sans text-xs text-accent">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="inquiry-phone" className={labelClass}>Phone (optional)</label>
              <input
                id="inquiry-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="(555) 555-5555"
                className={fieldClass()}
              />
            </div>
          </div>

          <div>
            <label htmlFor="inquiry-reason" className={labelClass}>I'm reaching out about</label>
            <select
              id="inquiry-reason"
              value={form.reason}
              onChange={handleChange('reason')}
              className={`${fieldClass(errors.reason)} ${form.reason ? '' : 'text-muted/80'}`}
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? 'inquiry-reason-error' : undefined}
            >
              <option value="" disabled>
                Choose one
              </option>
              {REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {errors.reason && <p id="inquiry-reason-error" className="mt-1 font-sans text-xs text-accent">{errors.reason}</p>}
          </div>

          <div>
            <label htmlFor="inquiry-message" className={labelClass}>What can I help with?</label>
            <textarea
              id="inquiry-message"
              rows={4}
              value={form.message}
              onChange={handleChange('message')}
              placeholder="A product role, a speaking invite, a project, or just hello."
              className={`${fieldClass(errors.message)} resize-y`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
            />
            {errors.message && <p id="inquiry-message-error" className="mt-1 font-sans text-xs text-accent">{errors.message}</p>}
          </div>

          {/* Honeypot: off-screen and skipped by keyboard and screen readers; bots fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="inquiry-website">Website</label>
            <input id="inquiry-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange('website')} />
          </div>

          {status === 'error' && (
            <p role="alert" className="rounded-lg border border-accent/40 bg-accent/10 p-4 font-sans text-sm text-foreground">
              Something went wrong sending your note. Please try again, or{' '}
              <a href={mailtoFallback(form)} className="text-accent underline underline-offset-4">
                email me directly
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent-dim disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {status === 'sending' ? (
              <>
                Sending
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              </>
            ) : (
              <>
                Submit inquiry
                <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
