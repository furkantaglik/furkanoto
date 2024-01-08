"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import { getSearchResults } from "@/lib/functions";
import Link from "next/link";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  async function handleResults() {
    setResults(await getSearchResults(searchValue));
  }

  return (
    <section className="relative">
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value), handleResults();
        }}
        type="text"
        placeholder="Otomotiv Ara."
        className="bg-slate-900 rounded-md px-2 py-1 text-white outline-none border-transparent border-b-4 focus:border-blue-900"
      />
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 border-l pl-1 border-neutral-400">
        <BiSearchAlt2 className="text-xl text-white" />
      </div>

      <div className="relative flex">
        <ul className="absolute z-10">
          {results.map((result, index) => (
            <Link
              key={index}
              href={`/Detail/${result.id}`}
              onClick={() => {
                setResults([]);
              }}
            >
              <li className="p-1 flex text-white rounded-lg bg-gradient-to-r from-black to-slate-950 hover:bg-gradient-to-r hover:from-black hover:to-blue-950 w-[400px] items-center">
                <div className="w-[100px] relative">
                  <img
                    className="rounded-md"
                    src={result.image1}
                    alt={result.model}
                    quality={30}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="
                                        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPU+Q8AAV0BLQfuLZ4AAAAASUVORK5CYII=
                                        "
                  />
                </div>
                <div className="grid ms-5 gap-y-2">
                  <h2 className="font-bold">
                    {result.brand} {result.model}
                  </h2>
                  <div className="flex gap-x-3 text-gray-300 text-sm">
                    <p>{result.fuel}</p>
                    <p>{result.gear}</p>
                    <p>{result.year}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SearchBar;
