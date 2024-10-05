import { useState } from "react";
import { SparklesPreview } from "./components/Sparkles";
import { fetchBooks } from "./api/googleBooks";

function App() {
  const [searchResult, setSearchResult] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (searchResult.trim() === "") {
      e.preventDefault();
      setError("Please enter a book title");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const result = await fetchBooks(searchResult);
    setBooks(result);
    console.log(result);
  };

  return (
    <>
      <main className="flex flex-col items-center w-[100vw] h-[100vh] bg-[#111]">
        <SparklesPreview />
        <div className="w-[300px] md:w-[600px] lg:w-[800px]">
          <form onSubmit={handleSearch} className="flex w-full space-x-3 bg-4">
            <input
              type="text"
              className="border rounded p-2 w-full "
              placeholder="Search for books..."
              value={searchResult}
              onChange={(e) => setSearchResult(e.target.value)}
            />

            <button className="border rounded p-2 w-[100px] text-white bg-blue-500">
              Search
            </button>
          </form>
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    </>
  );
}

export default App;
