import { model, Schema, models } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileBlobKey: { type: String, required: true },
    coverURL: { type: String },
    fileSize: { type: Number, required: true },
    totalSegments: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Book = models.Book || model("Book", BookSchema);

export default Book;
