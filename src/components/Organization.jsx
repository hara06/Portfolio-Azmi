const ORGS = [
  {
    role: "Ketua Umum",
    org: "UKM Karate Club UNIMAL",
    year: "2023",
    featured: true,
    duties: [
      "Mengoordinasikan pengelolaan kegiatan keorganisasian secara tertib dan terstruktur",
      "Merencanakan dan menyelenggarakan kejuaraan karate tahunan sebagai program kerja unggulan organisasi",
    ],
  },
  {
    role: "Kabid Kajian",
    org: "Indonesia Law Career Network",
    year: "2023",
    duties: [
      "Menyusun legal opinion atas isu-isu hukum yang berkembang di masyarakat",
      "Menganalisis isu hukum secara sistematis dengan merujuk pada peraturan perundang-undangan yang berlaku",
    ],
  },
  {
    role: "Kabid Advokasi",
    org: "DPC GMNI Lhokseumawe",
    year: "2022",
    duties: [
      "Melakukan advokasi bagi masyarakat yang menghadapi sengketa hukum",
      "Menyusun legal opinion atas isu-isu hukum yang berkembang di masyarakat",
    ],
  },
];

export default function Organization() {
  return (
    <section id="organisasi" className="bg-charcoal-900 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Pengalaman Organisasi
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-500" aria-hidden="true" />

        {/* Garis waktu: urutan tahun memang berurutan, jadi penanda titik bermakna */}
        <ol className="relative ml-2 mt-8 space-y-3 border-l border-paper/15 md:max-w-4xl">
          {ORGS.map((o) => (
            <li key={o.org} className="relative pl-6 md:pl-8">
              <span
                className="absolute -left-[6px] top-7 h-2.5 w-2.5 rounded-full bg-gold-400 ring-4 ring-charcoal-900"
                aria-hidden="true"
              />

              <article
                className={`rounded-xl border p-4 transition-colors md:p-5 ${
                  o.featured
                    ? "border-gold-500/40 bg-gold-500/[0.07] hover:border-gold-400/70"
                    : "border-paper/10 bg-charcoal-800/60 hover:border-gold-500/50"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div>
                    <h3 className="font-display text-lg font-medium leading-snug sm:text-xl">
                      {o.role}
                    </h3>
                    <p className="text-paper/70">{o.org}</p>
                  </div>
                  <p className="rounded-full border border-gold-500/40 px-3 py-0.5 text-sm text-gold-300">
                    {o.year}
                  </p>
                </div>

                <ul className="mt-3 space-y-2">
                  {o.duties.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-paper/75"
                    >
                      <span
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}