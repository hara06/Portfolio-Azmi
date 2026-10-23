import { useEffect, useRef, useState } from "react";

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
    proof: "/sertifikat/pelatihan-hr.pdf",
  },
  {
    title: "Pendidikan Khusus Profesi Advokat",
    org: "PERADI",
    year: "2025",
    desc: "Mempelajari materi dasar profesi advokat seperti teknik wawancara, penelusuran hukum dan dokumentasi hukum, serta legal reasoning.",
    proof: "/sertifikat/pkpa-peradi.jpeg",
  },
  {
    title: "Pelatihan Komputer",
    org: "Bestcame Education",
    year: "2023",
    desc: "Mempelajari pengoperasian Microsoft (Word, Excel, PowerPoint).",
    proof: "/sertifikat/pelatihan-komputer.jpeg",
  },
  {
    title: "Kaderisasi Tingkat Dasar",
    org: "GMNI",
    year: "2022",
    desc: "Pelatihan yang bertujuan meningkatkan kemampuan leadership dan penulisan.",
    proof: "/sertifikat/kaderisasi-gmni.jpeg",
  },
  {
    title: 'Course Online "Refugee Protection and Response in Indonesia"',
    org: "UNHCR",
    year: "", // isi tahun sertifikat, mis. "2025"
    desc: "Mempelajari dasar-dasar perlindungan pengungsi dan respons penanganannya di Indonesia.",
    proof: "/sertifikat/unhcr.jpeg",
  },
];

const CERTIFICATION = {
  issuer: "PERADI",
  name: "Sertifikasi Ujian Profesi Advokat",
  year: "2025",
  proof: "/sertifikat/upa-peradi.jpeg",
};

// Daftar bukti untuk lightbox (urutan: sertifikasi dulu, lalu pelatihan)
const PROOFS = [
  {
    src: CERTIFICATION.proof,
    caption: `${CERTIFICATION.name} – ${CERTIFICATION.issuer} (${CERTIFICATION.year})`,
  },
  ...TRAININGS.map((t) => ({
    src: t.proof,
    caption: `${t.title} – ${t.org}${t.year ? ` (${t.year})` : ""}`,
  })),
];

const isPdf = (src) => src.toLowerCase().endsWith(".pdf");

const SubTitle = ({ children }) => (
  <h3 className="font-display text-xl font-medium">{children}</h3>
);

const DocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </svg>
);

const Chevron = ({ dir }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

const ZoomIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5M11 8.5v5M8.5 11h5" />
  </svg>
);

// Thumbnail bukti (rasio 3:2). Klik: gambar → lightbox, PDF → tab baru.
function ProofThumb({
  src,
  label,
  index,
  onOpen,
  dark = false,
  className = "w-full",
}) {
  const [failed, setFailed] = useState(false);

  const frame = `group relative block aspect-[3/2] overflow-hidden rounded-lg border ${
    dark ? "border-paper/20 bg-charcoal-800" : "border-charcoal-900/10 bg-sand-200"
  } ${className}`;

  const placeholder = (text) => (
    <span
      className={`flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center text-xs ${
        dark ? "text-paper/70" : "text-charcoal-700"
      }`}
    >
      <DocIcon />
      {text}
    </span>
  );

  if (isPdf(src)) {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={`${frame} transition-colors hover:border-gold-500`}
        aria-label={`Buka PDF: ${label}`}
      >
        {placeholder("Buka sertifikat (PDF)")}
      </a>
    );
  }

  if (failed) {
    return <div className={frame}>{placeholder("Sertifikat belum ditambahkan")}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Perbesar sertifikat: ${label}`}
      className={`${frame} cursor-zoom-in transition-colors hover:border-gold-500`}
    >
      <img
        src={src}
        alt={`Sertifikat ${label}`}
        loading="lazy"
        className="h-full w-full object-cover object-top"
        onError={() => setFailed(true)}
      />
      {/* Petunjuk perbesar saat hover/fokus */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-charcoal-950/45 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <ZoomIcon />
      </span>
    </button>
  );
}

function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const item = items[index];
  const last = items.length - 1;
  const go = (i) => onChange(i < 0 ? last : i > last ? 0 : i);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const navBtn =
    "absolute top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal-900/70 text-paper backdrop-blur transition-colors hover:bg-gold-500 hover:text-charcoal-950";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal-950/90 p-4 backdrop-blur-sm"
    >
      <figure
        className="relative max-h-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.caption}
          className="max-h-[80vh] w-auto rounded-lg bg-paper object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-paper/80">
          {item.caption}
          <span className="ml-2 text-paper/50">
            {index + 1}/{items.length}
          </span>
        </figcaption>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup sertifikat"
          className="absolute -right-2 -top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper text-charcoal-900 transition-colors hover:bg-gold-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Sertifikat sebelumnya"
          className={`${navBtn} left-2 sm:-left-12`}
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Sertifikat berikutnya"
          className={`${navBtn} right-2 sm:-right-12`}
        >
          <Chevron dir="right" />
        </button>
      </figure>
    </div>
  );
}

export default function Education() {
  // index PROOFS yang sedang dibuka di lightbox (null = tertutup)
  const [open, setOpen] = useState(null);

  // Lightbox hanya berisi gambar; PDF dibuka di tab baru
  const imageProofs = PROOFS.filter((p) => !isPdf(p.src));
  const openByIndex = (proofIndex) => {
    const src = PROOFS[proofIndex].src;
    setOpen(imageProofs.findIndex((p) => p.src === src));
  };

  // Grid 6 kolom (layar lebar): 3 kartu pertama masing-masing 2 kolom,
  // sisanya masing-masing 3 kolom. Cocok untuk 5 pelatihan; sesuaikan bila jumlahnya berubah.
  const topCount = 3;

  return (
    <section id="pendidikan" className="bg-sand-100 text-charcoal-900">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Pendidikan, Pelatihan & Sertifikasi
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-600" aria-hidden="true" />

        {/* Baris 1: pendidikan + sertifikasi, tinggi kartu sama */}
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-5">
            <SubTitle>Pendidikan</SubTitle>
            <article className="mt-3 flex-1 rounded-xl border border-charcoal-900/10 bg-paper p-5 md:p-6">
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

          <div className="flex flex-col lg:col-span-7">
            <SubTitle>Sertifikasi</SubTitle>
            <article className="relative mt-3 flex flex-1 flex-col gap-5 overflow-hidden rounded-xl bg-charcoal-900 p-5 text-paper sm:flex-row sm:items-center md:p-6">
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-gold-500/40"
                aria-hidden="true"
              />
              <div
                className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-gold-500/25"
                aria-hidden="true"
              />

              <ProofThumb
                dark
                src={CERTIFICATION.proof}
                label={CERTIFICATION.name}
                index={0}
                onOpen={openByIndex}
                className="relative w-full shrink-0 sm:w-60"
              />

              <div className="relative min-w-0">
                <p className="text-sm font-medium text-gold-400">
                  {CERTIFICATION.issuer} · {CERTIFICATION.year}
                </p>
                <p className="mt-1 font-display text-2xl font-medium leading-snug">
                  {CERTIFICATION.name}
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Baris 2: pelatihan selebar penuh */}
        <div className="mt-8">
          <SubTitle>Pelatihan</SubTitle>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {TRAININGS.map((t, i) => {
              const top = i < topCount;
              const oddLast =
                i === TRAININGS.length - 1 && TRAININGS.length % 2 === 1;
              return (
                <li
                  key={t.title}
                  className={`flex gap-4 rounded-xl border border-charcoal-900/10 bg-paper p-4 transition-colors hover:border-gold-600/50 ${
                    top ? "lg:col-span-2 lg:flex-col" : "lg:col-span-3"
                  } ${oddLast ? "sm:col-span-2" : ""}`}
                >
                  <ProofThumb
                    src={t.proof}
                    label={t.title}
                    index={i + 1}
                    onOpen={openByIndex}
                    className={`w-28 shrink-0 self-start sm:w-32 ${
                      top ? "lg:w-full" : "lg:w-56"
                    }`}
                  />
                  <div className="min-w-0">
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
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {open !== null && (
        <Lightbox
          items={imageProofs}
          index={open}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}