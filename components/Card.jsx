"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import TotalScoreBtn from "./TotalScoreBtn";
import Image from "next/image";

const Card = ({
  id,
  marka,
  model,
  yakit,
  fiyat,
  resim1,
  resim2,
  resim3,
  ratingData,
}) => {
  const [image, setImage] = useState(resim1);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    async function ratingControl() {
      let totalScore = 0;
      for (const data of ratingData) {
        totalScore += data.score;
      }
      const averageScore = totalScore / ratingData.length;
      setTotalScore(averageScore);
    }

    ratingControl();
  }, [ratingData]);

  return (
    <section
      onMouseLeave={() => setImage(resim1)}
      className="hover:bg-gray-100 p-5  mx-auto group transition duration-100 cursor-pointer relative h-[250px]"
    >
      <LikeButton carId={id} />
      <TotalScoreBtn totalScore={totalScore} />
      <div className="text-center">
        <h2 className="text-md md:text-lg font-medium  font-serif">
          <span className="font-bold">{marka} </span>
          {model}
        </h2>
        <span className="bg-gray-200 rounded-full px-2 text-xs text-black">
          {yakit}
        </span>
      </div>
      <Link href={`/Detail/${id}`}>
        <Image
          width={300}
          height={150}
          quality={75}
          src={image}
          alt={`${marka} ${model}`}
          loading="lazy"
        />
      </Link>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-full">
        <div className="text-center md:opacity-0 group-hover:opacity-100 transition duration-100">
          <div className="flex justify-center items-center gap-x-5 mb-2">
            <button
              id="firstImage"
              onClick={() => setImage(resim1)}
              className={`px-2 py-1 rounded-full ${
                image === resim1 ? "bg-blue-700" : "bg-gray-700"
              }`}
            ></button>
            <button
              id="secondImage"
              onClick={() => setImage(resim2)}
              className={`px-2 py-1 rounded-full ${
                image === resim2 ? "bg-blue-700" : "bg-gray-700"
              }`}
            ></button>
            <button
              id="threeImage"
              onClick={() => setImage(resim3)}
              className={`px-2 py-1 rounded-full ${
                image === resim3 ? "bg-blue-700" : "bg-gray-700"
              }`}
            ></button>
          </div>
        </div>
        <h2 className="font-medium px-6 bg-slate-200 text-black text-center   rounded-b-full mx-10">
          {fiyat} ₺
        </h2>
      </div>
    </section>
  );
};

export default Card;
