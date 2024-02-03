"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import { getSearchResults } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";

const SearchBar = () => {
  const [results, setResults] = useState([]);

  const handlechange = async (value) => {
    setResults(await getSearchResults(value));
  };

  return (
    <section className="relative">
      <div className="group">
        <input
          onChange={(e) => handlechange(e.target.value)}
          type="text"
          placeholder="Otomotiv Ara."
          className="bg-slate-900 rounded-md p-2 text-white outline-none focus:shadow-lg  focus:shadow-blue-900 w-full"
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2  border-l-2 pl-1 border-neutral-400 group-focus-within:border-blue-900">
          <BiSearchAlt2 className="text-xl text-white group-focus-within:text-blue-900" />
        </div>
      </div>

      <div className=" flex">
        <ul className="absolute z-10 ">
          {results?.map((result) => (
            <Link
              key={result.id}
              href={`/Detail/${result.id}`}
              onClick={() => {
                setResults([]);
              }}
            >
              <li className="p-1 flex text-white min-h-[50px] rounded-lg bg-gradient-to-r from-gray-900 to-slate-950 hover:bg-gradient-to-r hover:from-black hover:to-blue-950 w-[400px] items-center">
                <div className="relative">
                  <Image
                    width={100}
                    height={50}
                    className="rounded-md"
                    src={result.image1}
                    alt={result.model}
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
