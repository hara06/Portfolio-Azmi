import { useEffect, useRef, useState } from "react";

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

const isPdf = (src) => src.toLowerCase().endsWith(".pdf");

// Daftar gambar untuk lightbox (hanya organisasi yang punya bukti berformat gambar)
const GALLERY = ORGS.filter((o) => o.proof && !isPdf(o.proof)).map((o) => ({
  src: o.proof,
  caption: `${o.role} – ${o.org} (${o.year})`,
}));

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

// Thumbnail bukti. Klik: gambar → lightbox, PDF → tab baru.
function ProofThumb({ org, onOpen }) {
  const [failed, setFailed] = useState(false);
  const label = `${org.role} ${org.org}`;
  const frame =
    "relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-paper/15 bg-charcoal-900 transition-colors hover:border-gold-400";

  const placeholder = (text) => (
    <span className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center text-xs text-paper/60">
      <DocIcon />
      {text}
    </span>
  );

  if (isPdf(org.proof)) {
    return (
      <a
        href={org.proof}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buka PDF: ${label}`}
        className={frame}
      >
        {placeholder("Buka sertifikat (PDF)")}
      </a>
    );
  }

  if (failed) {
    return (
      <div className={frame}>{placeholder("Sertifikat belum ditambahkan")}</div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(org.proof)}
      aria-label={`Perbesar sertifikat: ${label}`}
      className={`${frame} cursor-zoom-in`}
    >
      <img
        src={org.proof}
        alt={`Sertifikat ${label}`}
        loading="lazy"
        className="h-full w-full object-cover object-top"
        onError={() => setFailed(true)}
      />
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
      if (items.length > 1 && e.key === "ArrowLeft") go(index - 1);
      if (items.length > 1 && e.key === "ArrowRight") go(index + 1);
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
          {items.length > 1 && (
            <span className="ml-2 text-paper/50">
              {index + 1}/{items.length}
            </span>
          )}
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

        {items.length > 1 && (
          <>
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
          </>
        )}
      </figure>
    </div>
  );
}

export default function Organization() {
  // index GALLERY yang sedang dibuka (null = tertutup)
  const [open, setOpen] = useState(null);
  const openBySrc = (src) => setOpen(GALLERY.findIndex((g) => g.src === src));

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

                {/* Tugas di kiri, bukti sertifikat di kanan (bertumpuk di HP) */}
                <div
                  className={`mt-3 ${
                    o.proof ? "grid gap-4 sm:grid-cols-[1fr_11rem] sm:items-start" : ""
                  }`}
                >
                  <ul className="space-y-2">
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

                  {o.proof && (
                    <div className="max-w-[14rem] sm:max-w-none">
                      <ProofThumb org={o} onOpen={openBySrc} />
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>

      {open !== null && open >= 0 && (
        <Lightbox
          items={GALLERY}
          index={open}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}