"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BooksType } from "@/app/type/book.type";

type SortType = "title" | "rating" | "year";

const getWishlistFromStorage = () => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      localStorage.getItem("wishlistBooks") || "[]",
    ) as number[];
  } catch {
    return [];
  }
};

const ListedBooksPage = () => {
  const [activeTab, setActiveTab] = useState<"read" | "wishlist">("read");
  const [sortBy, setSortBy] = useState<SortType>("title");
  const [books, setBooks] = useState<BooksType[]>([]);
  const [wishlist, setWishlist] = useState<number[]>(getWishlistFromStorage);

  useEffect(() => {
    let isCancelled = false;

    const loadBooks = async () => {
      const response = await fetch("/booksData.json");
      const data = (await response.json()) as BooksType[];
      if (!isCancelled) setBooks(data);
    };

    void loadBooks();

    const handleWishlistUpdate = () => {
      setWishlist(getWishlistFromStorage());
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => {
      isCancelled = true;
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const sortedBooks = useMemo(() => {
    const items = [...books];

    if (sortBy === "title") {
      return items.sort((a, b) => a.bookName.localeCompare(b.bookName));
    }

    if (sortBy === "rating") {
      return items.sort((a, b) => b.rating - a.rating);
    }

    return items.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
  }, [books, sortBy]);

  const readBooks = sortedBooks.filter(
    (book) => !wishlist.includes(book.bookId),
  );
  const wishlistBooks = sortedBooks.filter((book) =>
    wishlist.includes(book.bookId),
  );

  const toggleWishlist = (bookId: number) => {
    const nextWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];

    localStorage.setItem("wishlistBooks", JSON.stringify(nextWishlist));
    setWishlist(nextWishlist);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const renderBookCard = (book: BooksType, isWishlistView = false) => (
    <article
      key={book.bookId}
      className="flex w-full flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.1)] sm:flex-row sm:p-5"
    >
      <div className="relative h-52 w-full overflow-hidden rounded-[22px] bg-slate-100 sm:h-48 sm:w-36">
        <Image
          src={book.image}
          alt={book.bookName}
          fill
          sizes="(max-width: 640px) 100vw, 144px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {book.category}
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              ★ {book.rating.toFixed(1)}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {book.bookName}
            </h3>
            <p className="mt-1 text-base text-slate-600">by {book.author}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-slate-50 px-3 py-2">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Publisher
              </span>
              <span className="mt-1 block font-medium text-slate-700">
                {book.publisher}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Year
              </span>
              <span className="mt-1 block font-medium text-slate-700">
                {book.yearOfPublishing}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Pages
              </span>
              <span className="mt-1 block font-medium text-slate-700">
                {book.totalPages}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Format
              </span>
              <span className="mt-1 block font-medium text-slate-700">
                {book.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link href={`/Books/${book.bookId}`}>
              <button className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                View Details
              </button>
            </Link>

            {!isWishlistView && (
              <button
                onClick={() => toggleWishlist(book.bookId)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Wishlist
              </button>
            )}
          </div>

          {isWishlistView && (
            <button
              onClick={() => toggleWishlist(book.bookId)}
              className="rounded-full bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
            Library
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            My Books
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-1.5">
            <button
              onClick={() => setActiveTab("read")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "read"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                  : "text-slate-600"
              }`}
            >
              Read Books
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "wishlist"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                  : "text-slate-600"
              }`}
            >
              Wishlist Books
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-slate-600"
            >
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400"
            >
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="year">Publishing Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {activeTab === "read"
          ? readBooks.map((book) => renderBookCard(book, false))
          : wishlistBooks.map((book) => renderBookCard(book, true))}
      </div>

      {activeTab === "read" && readBooks.length === 0 && (
        <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-xl font-semibold text-slate-700">
            Your reading list is empty
          </p>
          <p className="mt-2 text-slate-500">
            Add books to your wishlist to keep them here.
          </p>
        </div>
      )}

      {activeTab === "wishlist" && wishlistBooks.length === 0 && (
        <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-xl font-semibold text-slate-700">
            No books saved yet
          </p>
          <p className="mt-2 text-slate-500">
            Click wishlist on a book to save it here.
          </p>
        </div>
      )}
    </main>
  );
};

export default ListedBooksPage;
