// GANTI data di bawah ini dengan kontak aslimu.
// Kosongkan nilai `value` (contoh: value: "") untuk menyembunyikan kontak yang tidak dipakai.
export const CONTACT = {
  email: "azmitarigan999@email.com",
  whatsapp: "6285189406982",
  whatsappDisplay: "+62 851-8940-6982",
  cv: "/CV-Azmi-Tarigan.pdf",
};

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const METHODS = [
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </Icon>
    ),
  },
  {
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: `https://wa.me/${CONTACT.whatsapp}`,
    external: true,
    icon: (
      <Icon>
        <path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.2-4.6A8 8 0 1 1 21 12z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z" />
      </Icon>
    ),
  },
].filter((m) => m.value);

export default function Contact() {
  const subject = encodeURIComponent("Peluang HR Legal");

  return (
    <section id="kontak" className="bg-sand-100 text-charcoal-900">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Kontak
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-600" aria-hidden="true" />

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Ajakan */}
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
              Terbuka untuk peluang di bidang HR Legal.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-charcoal-700">
              Silakan hubungi saya untuk diskusi atau kebutuhan dokumen
              pendukung.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${CONTACT.email}?subject=${subject}`}
                className="inline-flex items-center justify-center rounded-sm bg-charcoal-900 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-charcoal-700"
              >
                Kirim Email
              </a>
              <a
                href={CONTACT.cv}
                download
                className="inline-flex items-center justify-center rounded-sm border border-charcoal-900/30 px-6 py-3 text-sm font-semibold text-charcoal-900 transition-colors hover:border-gold-600 hover:text-gold-600"
              >
                Unduh CV
              </a>
            </div>
          </div>

          {/* Jalur kontak */}
          <ul className="space-y-3 lg:col-span-7">
            {METHODS.map((m) => (
              <li key={m.label}>
                <a
                  href={m.href}
                  {...(m.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-xl border border-charcoal-900/10 bg-paper p-4 transition-colors hover:border-gold-600/60 md:p-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                    {m.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-charcoal-700">
                      {m.label}
                    </span>
                    <span className="block truncate font-display text-lg font-medium group-hover:text-gold-600">
                      {m.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}