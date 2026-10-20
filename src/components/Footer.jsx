import { scrollToTop } from "./ScrollToTop";

const LINKS = [
  { id: "tentang", label: "Tentang" },
  { id: "kompetensi", label: "Kompetensi" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "organisasi", label: "Organisasi" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "keahlian", label: "Keahlian" },
  { id: "kontak", label: "Kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl font-medium">
              M. Azmi Tarigan, S.H.
            </p>
            <p className="mt-1 text-sm text-gold-400">
              HR Legal & Industrial Relations
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/70">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="transition-colors hover:text-gold-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-5 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} M. Azmi Tarigan, S.H.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="self-start text-paper/70 transition-colors hover:text-gold-300 sm:self-auto"
          >
            Kembali ke atas
          </button>
        </div>
      </div>
    </footer>
  );
}