"use client";

import booksData from "@/../public/booksData.json";
import { BooksType } from "@/app/type/book.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookDetails = () => {
  const params = useParams<{ bookId: string }>();
  const bookId = Number(params?.bookId);
  const books = booksData as BooksType[];
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = books.find(
    (item: BooksType) => Number(item.bookId) === Number(bookId),
  );

  useEffect(() => {
    if (!bookId) return;

    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlistBooks") || "[]",
    ) as number[];

    setIsWishlisted(savedWishlist.includes(bookId));
  }, [bookId]);

  const toggleWishlist = () => {
    if (!bookId) return;

    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlistBooks") || "[]",
    ) as number[];

    const nextWishlist = savedWishlist.includes(bookId)
      ? savedWishlist.filter((id) => id !== bookId)
      : [...savedWishlist, bookId];

    localStorage.setItem("wishlistBooks", JSON.stringify(nextWishlist));
    setIsWishlisted(nextWishlist.includes(bookId));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
          <p className="text-2xl font-semibold">Book not found</p>
          <p className="mt-2 text-sm text-slate-300">
            The title you’re looking for is unavailable right now.
          </p>
        </div>
      </div>
    );
  }

  const meta = [
    { label: "Publisher", value: book.publisher },
    { label: "Published", value: book.yearOfPublishing },
    { label: "Pages", value: `${book.totalPages} pages` },
    { label: "Category", value: book.category },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="w-full max-w-[360px] self-center rounded-[26px] border border-slate-200 bg-slate-50 p-4 shadow-inner lg:self-stretch">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-slate-200">
              <Image
                src={book.image}
                alt={book.bookName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 rounded-[26px] bg-slate-50 p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {book.category}
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                ★ {book.rating.toFixed(1)}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {book.bookName}
            </h1>

            <p className="mt-2 text-lg text-slate-600">by {book.author}</p>

            <div
              className="mt-6 flex items-center gap-3"
              aria-label={`${book.rating} out of 5`}
            >
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 w-2.5 rounded-full ${
                      index < Math.round(book.rating)
                        ? "bg-amber-400"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {book.rating.toFixed(1)} / 5 · Reader favorite
              </span>
            </div>

            <p className="mt-6 max-w-[62ch] text-base leading-7 text-slate-600 sm:text-lg">
              {book.review}
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {meta.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {label}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-slate-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {book.tags?.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Start reading
              </button>
              <button
                onClick={toggleWishlist}
                className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition ${
                  isWishlisted
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-100"
                }`}
              >
                {isWishlisted ? "Added to wishlist" : "Add to wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetails;
