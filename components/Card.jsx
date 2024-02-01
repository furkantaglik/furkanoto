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
    <section className="hover:bg-gray-100 p-5 h-fit w-fit mx-auto group transition duration-100 cursor-pointer">
      <LikeButton carId={id} />
      <TotalScoreBtn totalScore={totalScore} />
      <div className="text-center">
        <h2 className="text-md md:text-lg font-medium mb-2 font-serif">
          <span className="font-bold">{marka} </span>
          {model}
        </h2>
        <span className="bg-gray-200 rounded-full px-2 text-sm text-gray-700">
          {yakit}
        </span>
      </div>
      <Link href={`/Detail/${id}`} aria-label="detail">
        <Image
          width={600}
          height={300}
          quality={75}
          src={image}
          alt={`${marka} ${model}`}
          loading="lazy"
        />
      </Link>
      <h2 className="font-medium px-6 bg-slate-200 text-black w-fit mx-auto rounded-b-full">
        {fiyat} ₺
      </h2>
      <div className=" text-center pt-2 md:opacity-0 group-hover:opacity-100 transition duration-100">
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
    </section>
  );
};

export default Card;
