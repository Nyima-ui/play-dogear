"use client";
import { createBook } from "@/lib/action/book.action";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";

const UploadForm = () => {
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

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

    console.log(bookPayload);

    // await createBook(bookPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
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
        className="border px-2 py-1 rounded-md grow-0 cursor-pointer hover:scale-102 transition-transform ease-in duration-100 bg-black mt-5"
      >
        Synthesis
      </button>
    </form>
  );
};

export default UploadForm;
