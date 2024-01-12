"use client";
import Link from "next/link";
import { useState } from "react";
import LikeButton from "./LikeButton";

const Card = ({ id, marka, model, yakit, fiyat, resim1, resim2, resim3 }) => {
  const [image, setImage] = useState(resim1);
  return (
    <section className="hover:bg-gray-100 p-5 h-fit w-fit group transition duration-100 cursor-pointer">
      <LikeButton carId={id} />
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
        <img
          src={image}
          alt={`${marka} ${model}`}
          className="w-[300px] h-[150px]"
        />
      </Link>
      <h2 className="font-medium px-6 bg-slate-900 text-white w-fit mx-auto rounded-b-full">
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
