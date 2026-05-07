import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, MessageSquare } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "mansimodi90@gmail.com",
      link: "mailto:mansimodi90@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "(408) 917-8064",
      link: "tel:+14089178064"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/mansimodi",
      link: "https://linkedin.com/in/mansimodi"
    }
  ];

  return (
    <section className="relative z-20 bg-background px-4 py-20 md:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-white/20" />
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Connect</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-sans text-3xl font-light tracking-tighter text-white/90 sm:text-4xl md:text-5xl">
              Let's <span className="italic">connect</span>
            </h2>
            <p className="mt-8 max-w-md font-sans text-lg font-light leading-relaxed text-white/60">
              I'm always open to discussing data strategy, AI innovation, or potential collaborations. Whether you have a specific project in mind or just want to say hello, feel free to reach out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-4"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.link}
                target={info.label === "Email" || info.label === "Phone" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/5 hover:border-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-colors group-hover:bg-white group-hover:text-black">
                  {info.icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">{info.label}</p>
                  <p className="font-sans text-base text-white/80 transition-colors group-hover:text-white">{info.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
