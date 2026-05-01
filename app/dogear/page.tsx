import BookCards from "@/components/BookCards";
import Chat from "@/components/Chat";
import UploadForm from "@/components/UploadForm";
import { getAllBooks } from "@/lib/action/book.action";

const DogearHome = async () => {
  const results = await getAllBooks();
  const books = results.success ? (results.data ?? []) : [];

  return (
    <main className="px-10 py-12">
      <h1 className="text-5xl">Welcome to Dogear</h1>
      <div className="flex gap-20">
        <UploadForm />
        <BookCards books={books}/>
      </div>
    </main>
  );
};

export default DogearHome;
