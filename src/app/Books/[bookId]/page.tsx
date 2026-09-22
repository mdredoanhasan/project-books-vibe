import { getBooks } from "@/app/lib/getBooks";
import BookDetailsClient from "./BookDetailsClient";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const books = await getBooks();
  const { bookId } = await params;
  const book = books.find((item) => item.bookId === Number(bookId));

  return <BookDetailsClient book={book} />;
};

export default BookDetailsPage;
