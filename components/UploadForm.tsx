"use client";
import { createBook, saveBookSegments } from "@/lib/action/book.action";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(e.target);

      const fileTitle = (formData.get("book-title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase();
      const author = formData.get("book-author") as string;

      const pdfFile = formData.get("book-pdf") as File;

      const parsedPDF = await parsePDFFile(pdfFile);

      const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: "application/pdf",
      });

      const response = await fetch(parsedPDF.cover);
      const blob = await response.blob();

      const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: "image/png",
      });

      const coverUrl = uploadedCoverBlob.url;

      const bookPayload = {
        title: fileTitle,
        author,
        fileUrl: uploadedPdfBlob.url,
        coverURL: coverUrl,
        fileBlobKey: uploadedPdfBlob.pathname,
        fileSize: pdfFile.size,
        totalSegments: 0,
      };

      const book = await createBook(bookPayload);

      const segments = await saveBookSegments(book.data._id, parsedPDF.content);

      formRef.current?.reset();
    } catch (e) {
      console.error(`Error uploading book ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5" ref={formRef}>
      <div>
        <label htmlFor="book-title">Book title</label>
        <input
          type="text"
          id="book-title"
          name="book-title"
          required
          className="border block focus:outline-1 focus:outline-sky-300 focus:border-0 mt-1.5"
        />
      </div>
      <div>
        <label htmlFor="book-author">Author</label>
        <input
          type="text"
          id="book-author"
          name="book-author"
          required
          className="border block focus:outline-1 focus:outline-sky-300 focus:border-0 mt-1.5"
        />
      </div>
      <div className="mt-5">
        <label htmlFor="book-pdf">Book pdf</label>
        <input
          type="file"
          accept="application/pdf, .pdf"
          id="book-pdf"
          name="book-pdf"
          required
          className="border block focus:outline-1 focus:outline-sky-300 focus:border-0 mt-1.5"
        />
      </div>

      <button
        type="submit"
        className="border px-2 py-1 rounded-md grow-0 cursor-pointer hover:scale-102 transition-transform ease-in duration-100 bg-black mt-5 flex items-center gap-2"
      >
        {loading && (
          <span className="border-2 border-white block size-3.5 animate-spin rounded-full border-t-0"></span>
        )}
        Synthesis
      </button>
    </form>
  );
};

export default UploadForm;
