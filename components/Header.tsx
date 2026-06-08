import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" aria-label="ATL Thrones home">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-400" fill="currentColor" aria-hidden>
            <path d="M2 7l4 3 6-7 6 7 4-3-2 12H4L2 7z" />
          </svg>
          <span className="text-[15px] font-extrabold tracking-tight text-white">
            ATL<span className="text-gold-400"> THRONES</span>
          </span>
        </Link>

        <Link
          href="/availability"
          className="btn-gold rounded-lg px-4 py-1.5 text-sm font-semibold"
        >
          Check availability
        </Link>
      </div>
    </header>
  );
}
