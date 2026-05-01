"use server";
import connectMongoDB from "@/database/mongodb";
import Book from "@/database/models/book.model";
import { serializeData } from "../utils";
import BookSegment from "@/database/models/book-segment.model";

export const createBook = async (bookPayload: CreateBook) => {
  try {
    await connectMongoDB();
    const book = await Book.create(bookPayload);

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error(`Error creating book ${e}`);
    return {
      success: false,
      error: e,
    };
  }
};

export const saveBookSegments = async (
  bookId: string,
  segments: TextSegment[],
) => {
  try {
    await connectMongoDB();

    console.log("Saving book segments...");

    const segmentsToInsert = segments.map(
      ({ text, segmentIndex, pageNumber, wordCount }) => ({
        bookId,
        content: text,
        segmentIndex,
        pageNumber,
        wordCount,
      }),
    );

    await BookSegment.insertMany(segmentsToInsert);

    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

    console.log("Book segments saved successfully");

    return {
      success: true,
      data: { segmentsCreated: segments.length },
    };
  } catch (e) {
    console.error(`Error saving book segments, ${e}`);

    return {
      success: false,
      error: e,
    };
  }
};

export const  getAllBooks = async () => {
  try {
    await connectMongoDB();

    const books = await Book.find().lean();

    return {
      success: true,
      data: serializeData(books.map((book) => ({
        ...book,
        _id: book._id.toString(),
      }))),
    };
    
  } catch (e) {
    console.error(`Error fetching books`, e);

    return {
      success: false,
      error: e,
    };
  }
};
