import Image from "next/image";
import { BooksType } from "../type/book.type";
import Link from "next/link";

const BooksCard = ({ book }: { book: BooksType }) => {
  return (
    <div className="group w-full rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="overflow-hidden rounded-[22px] bg-slate-100">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={book.image}
            alt={book.bookName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="px-1 pb-1 pt-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {book.bookName}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{book.author}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {book.review.slice(0, 88)}...
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {book.category}
          </span>

          <Link href={`/Books/${book.bookId}`}>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
