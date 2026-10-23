import { useState } from "react";

const PROFILE = {
  name: "M. Azmi Tarigan, S.H.",
  role: "HR Legal & Industrial Relations",
  summary:
    "Pengalaman magang di Pengadilan Negeri Medan, dengan pemahaman hukum ketenagakerjaan, kontrak kerja, dan penyelesaian perselisihan hubungan industrial.",
  photo: "/porto-img.png", // taruh file di folder public/
  cv: "/CV-Azmi-Tarigan.pdf", // taruh file di folder public/
};

// Pudar bertahap (eased) agar tidak ada garis batas yang terlihat
const FADE =
  "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.97) 60%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.67) 75%, rgba(0,0,0,0.53) 80%, rgba(0,0,0,0.38) 85%, rgba(0,0,0,0.23) 90%, rgba(0,0,0,0.09) 95%, rgba(0,0,0,0) 100%)";

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="beranda"
      className="relative isolate overflow-hidden bg-charcoal-900"
    >
      <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:gap-6 lg:gap-10 md:px-10">
        {/* Teks */}
        <div className="hero-in order-2 md:order-1">
          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            {PROFILE.name}
          </h1>

          <div className="mt-7 h-px w-20 bg-gold-500" aria-hidden="true" />

          <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-lg font-medium text-gold-400 sm:text-xl">
                 <span>{PROFILE.role}</span>
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
            {PROFILE.summary}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={PROFILE.cv}
              download
              className="inline-flex items-center justify-center rounded-sm bg-gold-500 px-7 py-3.5 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-gold-400"
            >
              Unduh CV
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center justify-center rounded-sm border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        {/* Foto: cutout transparan, menyatu dengan latar */}
        <div className="hero-in order-1 mx-auto w-full max-w-sm sm:max-w-md md:order-2 md:max-w-none [animation-delay:120ms]">
          <div className="group relative aspect-[4/5] md:origin-bottom md:scale-110">
            {/* Cahaya gold yang sangat lembut di belakang badan */}
            <div
              className="absolute bottom-[10%] left-1/2 h-[65%] w-[95%] -translate-x-1/2 rounded-full bg-gold-500/15 blur-[110px]"
              aria-hidden="true"
            />

            {photoFailed ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-7xl text-gold-500/80">
                  MAT
                </span>
              </div>
            ) : (
              <img
                src={PROFILE.photo}
                alt={`Foto ${PROFILE.name}`}
                className="absolute inset-0 h-full w-full origin-bottom object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{ WebkitMaskImage: FADE, maskImage: FADE }}
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}