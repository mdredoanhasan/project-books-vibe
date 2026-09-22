import BooksCard from "../components/BooksCard";
import { BooksType } from "../type/book.type";

const getBooks = async () => {
  const response = await fetch("http://localhost:3000/booksData.json");
  const data = await response.json();
  return data;
};

const AllBooksPage = async () => {
  const Books = await getBooks();
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-600">
          Browse collection
        </p>
        <h2 className="mt-3 text-4xl font-bold text-slate-900">All Books</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Books.map((book: BooksType, inx: number) => {
          return <BooksCard key={inx} book={book}></BooksCard>;
        })}
      </div>
    </main>
  );
};

export default AllBooksPage;
