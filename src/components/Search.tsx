"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../aceternity/components/ui/placeholders-and-vanish-input";
import { placeholders } from "../data/data";
import { Cards } from "./Cards";
import { Favorites } from "./Favorites";

export function Search({
  handleSearch,
  error,
  books,
  loading,
}: {
  handleSearch: (searchValue: string) => void;
  error: string;
  books: any[];
  loading: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  const formattedCards = books.map((book) => ({
    title: book.volumeInfo.title,
    description: book.volumeInfo.authors?.join(", ") || "Unknown Author",
    src: book.volumeInfo.imageLinks?.thumbnail || "default_image_url",
    ctaText: "View More",
    ctaLink: book.volumeInfo.infoLink,
    id: book.id,
    content: () => {
      const fullDescription =
        book.volumeInfo.description || "No description available.";
      const trimmedDescription =
        fullDescription.length > 300
          ? `${fullDescription.slice(0, 300)}...`
          : fullDescription;

      return <p>{trimmedDescription}</p>;
    },
  }));

  return (
    <>
      <div className=" m-0 w-[90%] flex flex-col items-center px-4 relative">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <p className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Loading books...
          </p>
        ) : books.length > 0 ? (
          <Cards cards={formattedCards} />
        ) : (
          <p className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            {error}
          </p>
        )}
      </div>
      <div className="lg:absolute flex flex-col items-center xl:right-10 xl:top-[440px] bottom-5 xl:bottom-auto">
        <Favorites cards={formattedCards} />
      </div>
    </>
  );
}
