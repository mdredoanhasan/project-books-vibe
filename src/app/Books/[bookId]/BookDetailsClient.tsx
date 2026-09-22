"use client";

import type { BooksType } from "@/app/type/book.type";
import Image from "next/image";
import { useState } from "react";

const BookDetailsClient = ({ book }: { book?: BooksType }) => {
  const bookId = book?.bookId || 0;
  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (typeof window === "undefined") return false;
    const wishlist = JSON.parse(
      localStorage.getItem("wishlistBooks") || "[]",
    ) as number[];
    return wishlist.includes(bookId);
  });

  const toggleWishlist = () => {
    const wishlist = JSON.parse(
      localStorage.getItem("wishlistBooks") || "[]",
    ) as number[];
    const nextWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    localStorage.setItem("wishlistBooks", JSON.stringify(nextWishlist));
    setIsWishlisted(nextWishlist.includes(bookId));
  };

  if (!book) {
    return <main className="p-10 text-center">Book not found</main>;
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[320px_1fr]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100">
        <Image
          src={book.image}
          alt={book.bookName}
          fill
          className="object-cover"
          priority
        />
      </div>
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          {book.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          {book.bookName}
        </h1>
        <p className="mt-2 text-lg text-slate-600">by {book.author}</p>
        <p className="mt-6 leading-7 text-slate-600">{book.review}</p>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs text-slate-500">Publisher</dt>
            <dd className="font-semibold">{book.publisher}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs text-slate-500">Published</dt>
            <dd className="font-semibold">{book.yearOfPublishing}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs text-slate-500">Pages</dt>
            <dd className="font-semibold">{book.totalPages}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs text-slate-500">Rating</dt>
            <dd className="font-semibold">{book.rating.toFixed(1)} / 5</dd>
          </div>
        </dl>
        <button
          onClick={toggleWishlist}
          className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </section>
    </main>
  );
};

export default BookDetailsClient;
