"use client";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { getAllHighlights } from "@/lib/functions";
import Link from "next/link";

const Slider = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllHighlights();
      setHighlights(data);
    };

    fetchData();
  }, []);

  const nextImage = () => {
    if (currentImageIndex < highlights.length - 2) {
      setCurrentImageIndex(currentImageIndex + 2);
      contentRef.current.scrollBy({ left: +660, behavior: "smooth" });
    }
  };

  const prevImage = () => {
    if (currentImageIndex >= 0) {
      setCurrentImageIndex(currentImageIndex - 2);
      contentRef.current.scrollBy({ left: -660, behavior: "smooth" });
    }
  };

  const previewImage = (index) => {
    setCurrentImageIndex(index);
    contentRef.current.scrollBy({
      left: (index - currentImageIndex) * 330,
      behavior: "smooth",
    });
  };
  return (
    <section className="max-w-screen-2xl mx-auto w-full mb-16">
      <div className="relative md:mx-20 mx-2">
        <h1 className="md:text-3xl text-xl font-bold md:my-12 my-8 border-b-4 border-blue-800">
          Öne Çıkanlar
        </h1>
        <div
          className="flex md:overflow-hidden overflow-y-auto md:gap-x-5 gap-x-2 pb-3"
          ref={contentRef}
        >
          {highlights?.map((high, index) => (
            <div
              key={index + 1}
              className=" flex-shrink-0 w-full xs:w-1/2 xl:w-1/3 "
            >
              <div className="border-2 border-slate-300 w-fit p-1 flex flex-col h-full xl:h-full">
                <img src={high.image} alt={high.title} />
                <h1 className="md:text-xl text-lg font-bold mb-2 text-center ">
                  {high.title}
                </h1>
                <p className={`md:text-lg text-sm text-center`}>
                  {high.description}
                </p>
                <Link
                  href={`Detail/${high.url}`}
                  className="py-1 mx-3 md:mx-10 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-auto"
                >
                  Keşfedin
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="justify-center mt-4 hidden md:block">
          <button
            onClick={prevImage}
            className="absolute top-2/4 text-lg left-5  md:text-2xl animate-pulse bg-neutral-500 rounded-full p-1 md:p-2"
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-2/4 text-lg right-5 md:text-2xl animate-pulse bg-neutral-500 rounded-full p-1 md:p-2"
          >
            <AiOutlineArrowRight />
          </button>
        </div>

        <div className="hidden md:block justify-center mt-4">
          {highlights?.map((high, index) => (
            <button
              key={index + 1}
              onClick={() => previewImage(index)}
              className={`w-10 rounded-full mx-2  ${
                index === currentImageIndex ? "scale-125" : "bg-gray-300"
              }`}
            >
              <img src={high.image} className="rounded-full " />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
