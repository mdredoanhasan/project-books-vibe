"use client";

import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
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

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            Sign In
          </button>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-700">
            Sign Up
          </button>
        </div>

        <button
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200/80 bg-white px-4 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/ListedBooks"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Listed Books
            </Link>
            <Link
              href="/PagesToRead"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Pages to Read
            </Link>
            <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3">
              <button className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                Sign In
              </button>
              <button className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
