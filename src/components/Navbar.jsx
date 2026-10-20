import { useEffect, useState } from "react";

const BRAND = "Portofolio.";

const LINKS = [
  { id: "tentang", label: "Tentang" },
  { id: "kompetensi", label: "Kompetensi" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "organisasi", label: "Organisasi" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "keahlian", label: "Keahlian" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("beranda");

  // Latar navbar menebal setelah halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tandai menu sesuai section yang sedang dibaca
  useEffect(() => {
    const ids = ["beranda", ...LINKS.map((l) => l.id), "kontak"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Tutup menu HP dengan tombol Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Menu langsung aktif saat diklik, tanpa menunggu scroll selesai
  const handleNav = (id) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-paper/10 bg-charcoal-900/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10"
      >
        <a
          href="#beranda"
          onClick={() => handleNav("beranda")}
          className="font-display text-lg font-medium tracking-tight text-paper transition-colors hover:text-gold-300"
        >
          {BRAND}
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => handleNav(l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative inline-block py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gold-400"
                      : "text-paper/75 hover:text-paper"
                  }`}
                >
                  {l.label}
                  {/* Garis gold: tumbuh saat hover, menetap saat aktif */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold-400 transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#kontak"
              onClick={() => handleNav("kontak")}
              aria-current={active === "kontak" ? "true" : undefined}
              className={`inline-block rounded-sm border px-4 py-2 text-sm font-semibold transition-colors ${
                active === "kontak"
                  ? "border-gold-400 bg-gold-500 text-charcoal-950"
                  : "border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950"
              }`}
            >
              Kontak
            </a>
          </li>
        </ul>

        {/* Tombol menu HP */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-paper transition-colors hover:text-gold-300 lg:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu HP */}
      {open && (
        <div id="menu-mobile" className="border-t border-paper/10 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-3 md:px-10">
            {[...LINKS, { id: "kontak", label: "Kontak" }].map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => handleNav(l.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block border-l-2 py-3 pl-4 text-base transition-colors ${
                      isActive
                        ? "border-gold-500 text-gold-400"
                        : "border-transparent text-paper/75 hover:border-gold-500/50 hover:text-paper"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}