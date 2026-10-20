// Pastikan data pendidikan (gelar dan universitas) sudah sesuai ijazahmu.
const EDUCATION = {
  degree: "Sarjana Hukum (S.H.)",
  school: "Universitas Malikussaleh",
  thesisLabel: "Skripsi",
  thesis:
    "Tanggungjawab Hukum Otoritas Jasa Keuangan Terhadap Peminjam yang Dirugikan dalam Perjanjian Financial Technology Lending Legal (Studi Penelitian di Otoritas Jasa Keuangan Regional 5 Kota Medan)",
};

const TRAININGS = [
  {
    title: "Pelatihan Kompetensi HR Staff",
    org: "PT. Wahana Insan Prima",
    year: "2026",
    desc: "Mempelajari dasar-dasar tugas Human Resources.",
  },
  {
    title: "Pendidikan Khusus Profesi Advokat",
    org: "PERADI",
    year: "2025",
    desc: "Mempelajari materi dasar profesi advokat seperti teknik wawancara, penelusuran hukum dan dokumentasi hukum, serta legal reasoning.",
  },
  {
    title: "Pelatihan Komputer",
    org: "Bestcame Education",
    year: "2023",
    desc: "Mempelajari pengoperasian Microsoft (Word, Excel, PowerPoint).",
  },
  {
    title: "Kaderisasi Tingkat Dasar",
    org: "GMNI",
    year: "2022",
    desc: "Pelatihan yang bertujuan meningkatkan kemampuan leadership dan penulisan.",
  },
];

const CERTIFICATION = {
  issuer: "PERADI",
  name: "Sertifikasi Ujian Profesi Advokat",
  year: "2025",
};

const SubTitle = ({ children }) => (
  <h3 className="font-display text-xl font-medium">{children}</h3>
);

export default function Education() {
  return (
    <section id="pendidikan" className="bg-sand-100 text-charcoal-900">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Pendidikan, Pelatihan & Sertifikasi
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-600" aria-hidden="true" />

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Kiri: pendidikan dan sertifikasi */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <SubTitle>Pendidikan</SubTitle>
              <article className="mt-3 rounded-xl border border-charcoal-900/10 bg-paper p-5">
                <h4 className="font-display text-xl font-medium leading-snug">
                  {EDUCATION.degree}
                </h4>
                <p className="mt-0.5 font-medium text-charcoal-700">
                  {EDUCATION.school}
                </p>

                <div className="my-4 h-px bg-charcoal-900/10" aria-hidden="true" />

                <p className="text-sm font-medium text-gold-600">
                  {EDUCATION.thesisLabel}
                </p>
                <p className="mt-1 font-display text-base leading-snug text-charcoal-900">
                  {EDUCATION.thesis}
                </p>
              </article>
            </div>

            <div>
              <SubTitle>Sertifikasi</SubTitle>
              <article className="relative mt-3 overflow-hidden rounded-xl bg-charcoal-900 p-5 text-paper">
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-gold-500/40"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-gold-500/25"
                  aria-hidden="true"
                />
                <p className="relative text-sm font-medium text-gold-400">
                  {CERTIFICATION.issuer} · {CERTIFICATION.year}
                </p>
                <p className="relative mt-1 max-w-[16rem] font-display text-xl font-medium leading-snug">
                  {CERTIFICATION.name}
                </p>
              </article>
            </div>
          </div>

          {/* Kanan: pelatihan */}
          <div className="lg:col-span-7">
            <SubTitle>Pelatihan</SubTitle>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {TRAININGS.map((t) => (
                <li
                  key={t.title}
                  className="flex flex-col rounded-xl border border-charcoal-900/10 bg-paper p-4 transition-colors hover:border-gold-600/50"
                >
                  <h4 className="font-display text-base font-medium leading-snug">
                    {t.title}
                  </h4>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-charcoal-700">
                    <span className="font-medium">{t.org}</span>
                    {t.year && (
                      <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-xs font-medium text-gold-600">
                        {t.year}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                    {t.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}