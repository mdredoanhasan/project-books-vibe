import { headers } from "next/headers";
import type { BooksType } from "@/app/type/book.type";

export const getBooks = async (): Promise<BooksType[]> => {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "http";

  if (!host) {
    throw new Error("Unable to determine the application URL");
  }

  const response = await fetch(`${protocol}://${host}/booksData.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load books: ${response.status}`);
  }

  return response.json() as Promise<BooksType[]>;
};
