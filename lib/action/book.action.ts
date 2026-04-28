"use server";
import connectMongoDB from "@/database/mongodb";
import Book from "@/database/models/book.model";

interface CreateBook {
  title: string;
  author: string;
  fileUrl: string;
  fileBlobKey: string;
  coverURL: string;
  fileSize: number;
  totalSegments: number;
}

export const createBook = async (book: CreateBook) => {
  try {
    await connectMongoDB();

    await Book.create(book);
  } catch (e) {
    console.error(`Error creating book ${e}`);
  }
};
