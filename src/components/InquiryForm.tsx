import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

interface FormState {
  name: string;
  phone: string;
  email: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_STATE: FormState = { name: '', phone: '', email: '' };

/**
 * A lightweight inquiry form. This is a static site with no backend, so
 * "submit" hands the details to the visitor's own email client via a
 * pre-filled mailto: link addressed to Mansi — no third-party form service
 * or account needed to make it work today.
 */
export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = 'Please share your name.';
    if (!form.phone.trim()) nextErrors.phone = 'Please share a phone number.';
    if (!form.email.trim()) {
      nextErrors.email = 'Please share an email address.';
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'That email address doesn\'t look quite right.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = `Portfolio inquiry from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      '',
      'What can I help with?',
    ].join('\n');

    window.location.href = `mailto:mansimodi90@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  const fieldClass = (hasError?: string) =>
    `w-full rounded-lg border bg-background/40 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent ${
      hasError ? 'border-life-accent/60' : 'border-contour/30'
    }`;

  return (
    <div className="rounded-2xl border border-contour/30 bg-surface/50 p-6 sm:p-8">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
        Send a Note
      </p>
      <h3 className="mb-6 font-serif text-xl font-light text-foreground">
        Submit an inquiry
      </h3>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-accent/30 bg-accent/10 p-5"
        >
          <p className="font-sans text-sm text-foreground">
            Thanks, {form.name.split(' ')[0] || 'there'} — I've opened your email client with the
            details filled in. Just hit send and I'll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(INITIAL_STATE);
              setSubmitted(false);
            }}
            className="mt-4 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:text-foreground"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="inquiry-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
              Name
            </label>
            <input
              id="inquiry-name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Your name"
              className={fieldClass(errors.name)}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="mt-1 font-sans text-xs text-life-accent">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="inquiry-phone" className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
              Phone number
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="(555) 555-5555"
              className={fieldClass(errors.phone)}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className="mt-1 font-sans text-xs text-life-accent">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="inquiry-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              id="inquiry-email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              className={fieldClass(errors.email)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="mt-1 font-sans text-xs text-life-accent">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-colors hover:bg-accent-dim sm:w-auto"
          >
            Submit inquiry
            <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      )}
    </div>
  );
}
