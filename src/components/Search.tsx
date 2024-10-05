"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../aceternity/components/ui/placeholders-and-vanish-input";

export function Search({
  handleSearch,
  error,
  books,
  loading, // New loading prop
}: {
  handleSearch: (searchValue: string) => void;
  error: string;
  books: any[];
  loading: boolean; // New loading prop type
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const placeholders = [
    "So we beat on, boats against the current. - The Great Gatsby",
    "Call me Ishmael. - Moby Dick",
    "Not all those who wander are lost. - The Fellowship of the Ring",
    "Stay gold, Ponyboy. - The Outsiders",
    "Beware; for I am fearless. - Frankenstein",
    "All animals are equal. - Animal Farm",
    "I am no bird; and no net ensnares me. - Jane Eyre",
    "Big Brother is watching you. - 1984",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  return (
    <>
      <div className="h-[40rem]  w-[90%] flex flex-col items-center px-4">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        <div className="mt-4">
          {loading ? (
            <p className="text-white">Loading books...</p>
          ) : books.length > 0 ? (
            <ul>
              {books.map((book, index) => (
                <li key={index} className="text-white mb-2">
                  <h3>{book.volumeInfo.title}</h3>
                  <p>{book.volumeInfo.authors?.join(", ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}
