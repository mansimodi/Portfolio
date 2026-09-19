import { motion } from 'motion/react';
import { Mail, Linkedin, FileDown } from 'lucide-react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'mansimodi90@gmail.com',
      link: 'mailto:mansimodi90@gmail.com',
      primary: true,
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/mansimodi',
      link: 'https://linkedin.com/in/mansimodi',
      primary: false,
    },
    {
      icon: <FileDown className="h-5 w-5" />,
      label: 'Resume',
      value: 'Download PDF',
      link: '/resume.pdf',
      primary: false,
      downloadName: 'Mansi-Modi-Resume.pdf',
    },
  ];

  return (
    <section id="contact" className="relative z-20 scroll-mt-24 bg-surface px-4 py-16 md:px-24 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel depth="Shore" label="Connect" />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <TextReveal>
              <h2 className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Let's <span className="italic text-accent">connect</span>
              </h2>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 max-w-md font-sans text-lg font-light leading-relaxed text-muted"
            >
              I'm always open to discussing data strategy, AI innovation, or potential
              collaborations. Email is the best way to reach me — whether you have a
              specific project in mind or just want to say hello.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.link}
                  download={info.downloadName}
                  target={info.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={info.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  className={`group flex flex-col items-center gap-4 rounded-xl border p-6 transition-all sm:flex-row sm:items-center ${
                    info.primary
                      ? 'border-accent/40 bg-accent/10 hover:border-accent hover:bg-accent/15'
                      : 'border-contour/30 bg-background/40 hover:border-contour hover:bg-background/60'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      info.primary
                        ? 'bg-accent text-background group-hover:bg-accent-dim'
                        : 'bg-contour/30 text-muted group-hover:bg-accent group-hover:text-background'
                    }`}
                  >
                    {info.icon}
                  </div>
                  <div className="min-w-0 text-center sm:text-left">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {info.label}
                    </p>
                    <p
                      className={`font-sans text-base transition-colors ${
                        info.primary
                          ? 'text-foreground group-hover:text-accent'
                          : 'text-foreground/80 group-hover:text-foreground'
                      }`}
                    >
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
