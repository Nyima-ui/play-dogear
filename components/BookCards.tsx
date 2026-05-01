"use client";
import { useState } from "react";
import Link from "next/link";

interface Book {
  _id: string;
  author: string;
  coverURL: string;
  createdAt: string;
  fileBlobKey: string;
  fileSize: number;
  title: string;
  totalSegments: number;
}

const BookCards = ({ books }: { books: Book[] }) => {
  const [BookSelected, setBookSelected] = useState("");
  return (
    <div className="mt-5">
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link
              href={`/book/${book.title}`}
              className="cursor-pointer"
              onClick={() => setBookSelected(book.title)}
            >
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookCards;
