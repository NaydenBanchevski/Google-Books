import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { fetchBooks } from "./api/googleBooks";
import { Title } from "./components/Title";

function App() {
  const [searchResult, setSearchResult] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      if (!searchResult) return;
      setLoading(true);
      try {
        const result = await fetchBooks(searchResult);
        if (result.length > 0) {
          setBooks(result);
          setError("");
        } else {
          setError("No books found");
        }
      } catch (err) {
        setError("Error fetching books.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [searchResult]);

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim() === "") {
      setError("Invalid input");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setSearchResult(searchValue);
  };

  return (
    <main className="flex flex-col items-center w-[100vw] min-h-[100vh] py-[100px] bg-[#111]">
      <Title />
      <Search
        handleSearch={handleSearch}
        error={loading ? "" : error}
        books={books}
        loading={loading}
      />
    </main>
  );
}

export default App;
