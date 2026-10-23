const LEGAL_SKILLS = [
  "Legal drafting",
  "Legal opinion",
  "Legal reasoning",
  "Legal due diligence",
  "Hukum Pengadilan Hubungan Industrial",
];

const SUPPORT_SKILLS = [
  "Rekrutmen",
  "Wawancara",
  "Administrasi berkas",
  "Kebijakan MSDM",
];

const TOOLS = [
  { mark: "W", name: "Microsoft Word", use: "Penyusunan dokumen" },
  { mark: "X", name: "Microsoft Excel", use: "Pengolahan data" },
  { mark: "P", name: "Microsoft PowerPoint", use: "Presentasi" },
];

const SubTitle = ({ children }) => (
  <h3 className="font-display text-xl font-medium">{children}</h3>
);

export default function Skills() {
  return (
    <section id="keahlian" className="bg-charcoal-900 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Keahlian & Tools
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-500" aria-hidden="true" />

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Keahlian */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <SubTitle>Keahlian hukum</SubTitle>
              <ul className="mt-3 flex flex-wrap gap-2">
                {LEGAL_SKILLS.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-gold-500/40 bg-gold-500/[0.07] px-3.5 py-1.5 text-sm text-gold-300 transition-colors hover:border-gold-400"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SubTitle>Keahlian pendukung</SubTitle>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SUPPORT_SKILLS.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-paper/15 px-3.5 py-1.5 text-sm text-paper/80 transition-colors hover:border-gold-500/50 hover:text-paper"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tools */}
          <div className="lg:col-span-5">
            <SubTitle>Tools</SubTitle>
            <ul className="mt-3 space-y-3">
              {TOOLS.map((t) => (
                <li
                  key={t.name}
                  className="flex items-center gap-4 rounded-xl border border-paper/10 bg-charcoal-800/60 p-4 transition-colors hover:border-gold-500/50"
                >
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 font-display text-lg font-semibold text-gold-400 ring-1 ring-gold-500/30"
                    aria-hidden="true"
                  >
                    {t.mark}
                  </span>
                  <div>
                    <p className="font-medium leading-tight">{t.name}</p>
                    <p className="text-sm text-paper/60">{t.use}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}