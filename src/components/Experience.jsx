import { useEffect, useRef, useState } from "react";

const ROLE = {
  title: "Staf Magang",
  place: "Pengadilan Negeri Medan",
  period: "2024 – Sekarang",
  duties: [
    "Melakukan wawancara/klarifikasi data dengan pihak berperkara dalam rangka administrasi perkara",
    "Menyusun resume perkara yang ringkas dan terstruktur",
    "Menelaah dan mengadministrasikan berkas perkara dengan teliti dan menjaga kerahasiaan dokumen",
    "Mengikuti persidangan untuk memahami hukum acara dan proses litigasi",
  ],
};

// Taruh foto di folder public/dokumentasi/ lalu sesuaikan nama file dan keterangannya.
// Catatan: jangan pakai foto yang memperlihatkan identitas pihak, nomor perkara, atau isi berkas.
const DOCS = [
  { src: "/dokumentasi/kegiatan-1.jpeg", caption: "Mengikuti persidangan" },
  { src: "/dokumentasi/kegiatan-2.jpeg", caption: "Kegiatan di Pengadilan Negri" },
];

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
    aria-hidden="true"
  >
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

function Slide({ doc, onOpen }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full shrink-0 flex-col items-center justify-center gap-2 bg-sand-200 text-charcoal-700">
        <CameraIcon />
        <span className="text-sm">Foto dokumentasi belum ditambahkan</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(doc)}
      className="relative h-full w-full shrink-0 cursor-zoom-in"
      aria-label={`Perbesar foto: ${doc.caption}`}
    >
      <img
        src={doc.src}
        alt={doc.caption}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </button>
  );
}

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

function Carousel({ docs, onOpen }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const last = docs.length - 1;

  const go = (i) => setIndex(i < 0 ? last : i > last ? 0 : i);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const navBtn =
    "absolute top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal-900/70 text-paper backdrop-blur transition-colors hover:bg-gold-500 hover:text-charcoal-950";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Dokumentasi kegiatan"
      className="relative aspect-[4/3] overflow-hidden rounded-xl bg-charcoal-800 lg:col-span-7 lg:aspect-auto lg:min-h-[20rem]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      {/* Slide */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {docs.map((doc) => (
          <Slide key={doc.src} doc={doc} onOpen={onOpen} />
        ))}
      </div>

      {/* Label */}
      <span className="absolute left-3 top-3 z-10 rounded-full bg-charcoal-900/70 px-3 py-1 text-xs font-medium text-paper backdrop-blur">
        Dokumentasi Kegiatan
      </span>

      {/* Keterangan dan indikator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-charcoal-950/80 to-transparent px-4 pb-3.5 pt-12">
        <p className="text-sm font-medium text-paper">{docs[index].caption}</p>
        {docs.length > 1 && (
          <div className="pointer-events-auto flex items-center gap-1.5 pb-1">
            {docs.map((d, i) => (
              <button
                key={d.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1} dari ${docs.length}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-gold-400" : "w-1.5 bg-paper/50 hover:bg-paper"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Panah */}
      {docs.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Foto sebelumnya"
            className={`${navBtn} left-3`}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Foto berikutnya"
            className={`${navBtn} right-3`}
          >
            <Chevron dir="right" />
          </button>
        </>
      )}
    </div>
  );
}

function Lightbox({ doc, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doc.caption}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal-950/90 p-4 backdrop-blur-sm"
    >
      <figure
        className="relative max-h-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={doc.src}
          alt={doc.caption}
          className="max-h-[80vh] w-auto rounded-lg object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-paper/80">
          {doc.caption}
        </figcaption>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup foto"
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
      </figure>
    </div>
  );
}

export default function Experience() {
  const [active, setActive] = useState(null);

  return (
    <section id="pengalaman" className="bg-sand-100 text-charcoal-900">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Pengalaman Kerja
        </h2>
        <div className="mt-4 h-px w-14 bg-gold-600" aria-hidden="true" />

        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Peran dan tugas */}
          <article className="rounded-xl border border-charcoal-900/10 bg-paper p-5 md:p-6 lg:col-span-5">
            <p className="inline-flex rounded-full bg-gold-500/15 px-3 py-1 text-sm font-medium text-gold-600">
              {ROLE.period}
            </p>
            <h3 className="mt-3 font-display text-2xl font-medium leading-tight">
              {ROLE.title}
            </h3>
            <p className="mt-1 font-medium text-charcoal-700">{ROLE.place}</p>

            <div className="my-5 h-px bg-charcoal-900/10" aria-hidden="true" />

            <ul className="space-y-3">
              {ROLE.duties.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-charcoal-700">
                  <span
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600"
                    aria-hidden="true"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Dokumentasi kegiatan */}
          <Carousel docs={DOCS} onOpen={setActive} />
        </div>
      </div>

      {active && <Lightbox doc={active} onClose={() => setActive(null)} />}
    </section>
  );
}