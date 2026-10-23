const Icon = ({ paths }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[18px] w-[18px]"
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

const ITEMS = [
  {
    title: "Kontrak kerja dan perjanjian terkait",
    tags: ["PKWT", "PKWTT", "NDA", "Administrasi Pengupahan", "Administrasi Jaminan Sosial", "Administrasi Kebijakan MSDM"],
    featured: true,
    paths: [
      "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z",
      "M14 3v5h5",
      "M9 13h6",
      "M9 17h3",
    ],
  },
  {
    title: "Peraturan Perusahaan dan Perjanjian Kerja Bersama",
    tags: ["PKB", "Administrasi OSS-RBA"],
    paths: [
      "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
    ],
  },
  {
    title: "Prosedur disipliner sesuai ketentuan",
    tags: ["SP", "PHK"],
    paths: [
      "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      "M12 9v4",
      "M12 17h.01",
    ],
  },
  {
    title: "Penyelesaian perselisihan hubungan industrial",
    tags: ["Bipartit", "Mediasi", "PHI"],
    paths: [
      "M12 3v18",
      "M6 21h12",
      "M3 7h18",
      "M6 7l-3 7a3.5 3.5 0 0 0 6 0z",
      "M18 7l-3 7a3.5 3.5 0 0 0 6 0z",
    ],
  },
  {
    title: "Kepatuhan regulasi",
    tags: ["UU Ketenagakerjaan", "UU Cipta Kerja", "PP turunannya", "BPJS"],
    paths: ["M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z", "M9 12l2 2 4-4"],
  },
  {
    title: "Legal drafting dan review dokumen",
    tags: [],
    paths: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"],
  },
];

export default function Competence() {
  return (
    <section id="kompetensi" className="bg-charcoal-900 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Area Kompetensi HR Legal
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-500" aria-hidden="true" />

        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className={`rounded-xl border p-4 transition-colors md:p-5 ${
                item.featured
                  ? "border-gold-500/40 bg-gold-500/[0.07] hover:border-gold-400/70"
                  : "border-paper/10 bg-charcoal-800/60 hover:border-gold-500/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/30">
                  <Icon paths={item.paths} />
                </span>
                <h3 className="pt-1 font-display text-base font-medium leading-snug sm:text-lg">
                  {item.title}
                </h3>
              </div>

              {item.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5 sm:pl-12">
                  {item.tags.map((t) => (
                    <li
                      key={t}
                      className={`rounded-full border px-2.5 py-0.5 text-xs ${
                        item.featured
                          ? "border-gold-500/50 text-gold-300"
                          : "border-paper/15 text-paper/70"
                      }`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}