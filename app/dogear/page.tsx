import BookCards from "@/components/BookCards";
import Chat from "@/components/Chat";
import UploadForm from "@/components/UploadForm";

const DogearHome = () => {
  return (
    <main className="px-10 py-12">
      <h1 className="text-5xl">Welcome to Dogear</h1>
      <div className="flex gap-20">
        <UploadForm />
        <BookCards />
      </div>
      <Chat />
    </main>
  );
};

export default DogearHome;
