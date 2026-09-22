import Image from "next/image";
import Link from "next/link";
import { BooksType } from "@/app/type/book.type";
import { getBooks } from "@/app/lib/getBooks";

const readingStats = [
  { label: "Pages this month", value: "1,540" },
  { label: "Books in queue", value: "12" },
  { label: "Goal completion", value: "78%" },
  { label: "Reading streak", value: "18 days" },
];

const upcomingReads = [
  {
    title: "The Secret History",
    progress: 32,
    pages: 320,
    status: "In progress",
  },
  { title: "The Bell Jar", progress: 56, pages: 224, status: "Almost there" },
  { title: "A Passage to India", progress: 18, pages: 288, status: "Queued" },
  {
    title: "The Left Hand of Darkness",
    progress: 72,
    pages: 304,
    status: "Strong momentum",
  },
];

const PagesToReadPage = async () => {
  const books = await getBooks();
  const bookList = (books as BooksType[]).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
              Reading tracker
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Pages to Read
            </h2>
          </div>

          <Link href="/Books">
            <button className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
              Explore more books
            </button>
          </Link>
        </div>
      </div>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {readingStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-bold text-slate-900">
                Current reading list
              </h3>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Active
              </span>
            </div>

            <div className="space-y-4">
              {bookList.map((book) => (
                <div
                  key={book.bookId}
                  className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-3 sm:flex-row"
                >
                  <div className="relative h-32 w-full overflow-hidden rounded-[18px] bg-slate-200 sm:w-24">
                    <Image
                      src={book.image}
                      alt={book.bookName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">
                          {book.bookName}
                        </h4>
                        <p className="text-sm text-slate-500">{book.author}</p>
                      </div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                        {book.category}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
                        <span>Progress</span>
                        <span>68%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-[68%] rounded-full bg-slate-900" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-2xl font-bold text-slate-900">
              Upcoming reads
            </h3>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
              Queue
            </span>
          </div>

          <div className="space-y-4">
            {upcomingReads.map((book) => (
              <div
                key={book.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-base font-semibold text-slate-900">
                    {book.title}
                  </h4>
                  <span className="text-xs font-medium text-slate-500">
                    {book.status}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>{book.pages} pages</span>
                    <span>{book.progress}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PagesToReadPage;
