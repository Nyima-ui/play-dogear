import React from "react";

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
  return (
    <div className="mt-5">
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <button className="cursor-pointer">{book.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookCards;
