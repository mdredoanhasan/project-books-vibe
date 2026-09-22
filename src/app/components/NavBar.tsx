import Link from "next/link";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-lg shadow-slate-900/15">
            B
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">
              Books Vibe
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            href="/AllBooks"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Books
          </Link>
          <Link
            href="/ListedBooks"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Listed Books
          </Link>
          <Link
            href="/PagesToRead"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Pages to Read
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            Sign In
          </button>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-700">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
