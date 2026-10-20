const TOPICS = [
  "Hukum ketenagakerjaan",
  "Hubungan industrial",
  "Kepatuhan regulasi",
  "Kerahasiaan informasi",
];

const IconDocument = () => (
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
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

const IconShield = () => (
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
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CARDS = [
  {
    icon: <IconDocument />,
    title: "Teliti dan ringkas",
    text: "Pengalaman magang di Pengadilan Negeri membentuk ketelitian dalam menelaah dokumen hukum dan kemampuan menyusun analisis yang ringkas.",
  },
  {
    icon: <IconShield />,
    title: "Rahasia dan patuh",
    text: "Saya terbiasa menjaga kerahasiaan informasi serta berkomitmen pada kepatuhan regulasi.",
  },
];

export default function About() {
  return (
    <section
      id="tentang"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-sand-100 text-charcoal-900 md:-mt-14 md:rounded-t-[3.5rem]"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        {/* Kiri: judul dan topik, tetap menempel saat di-scroll */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
            Tentang Saya
          </h2>
          <div className="mt-6 h-px w-20 bg-gold-600" aria-hidden="true" />

          <ul className="mt-8 flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <li
                key={t}
                className="rounded-full border border-charcoal-900/15 bg-paper/60 px-3.5 py-1.5 text-sm text-charcoal-800"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Kanan: kalimat pembuka besar, lalu kartu */}
        <div className="lg:col-span-8">
          <p className="font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.2]">
            Saya lulusan Sarjana Hukum dengan minat pada hukum ketenagakerjaan
            dan hubungan industrial.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {CARDS.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-charcoal-900/10 bg-paper p-7 transition-colors hover:border-gold-600/50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                  {c.icon}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium">
                  {c.title}
                </h3>
                <p className="mt-2 leading-relaxed text-charcoal-700">
                  {c.text}
                </p>
              </article>
            ))}

            {/* Kartu gelap: menyambung dengan hero */}
            <article className="relative overflow-hidden rounded-3xl bg-charcoal-900 p-8 text-paper sm:col-span-2 md:p-10">
              <div
                className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-gold-500/40"
                aria-hidden="true"
              />
              <div
                className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-gold-500/25"
                aria-hidden="true"
              />
              <h3 className="relative font-display text-2xl font-medium text-gold-400">
                Siap berkontribusi
              </h3>
              <p className="relative mt-3 max-w-2xl text-lg leading-relaxed text-paper/85">
                Saya siap berkontribusi dalam penyusunan kontrak kerja,
                peraturan perusahaan, dan penanganan perselisihan hubungan
                industrial.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}