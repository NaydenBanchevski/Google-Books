import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { fetchBooks } from "./api/googleBooks";
import { Title } from "./components/Title";
import Footer from "./components/Footer";

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
    <main className="flex flex-col relative items-center min-h-[100vh] w-[100vw]  py-[100px] bg-[#111]">
      <Title />
      <Search
        handleSearch={handleSearch}
        error={loading ? "" : error}
        books={books}
        loading={loading}
      />
      <Footer />
    </main>
  );
}

export default App;
