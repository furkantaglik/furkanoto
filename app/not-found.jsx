"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Sayfa Bulunamadı",
};

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="max-w-screen-2xl mx-auto relative h-full">
      <img
        src="https://www.mercedes-benz.com.tr/content/turkey/tr/passengercars/content-pool/tool-pages/error-pages/page-not-found/_jcr_content/root/responsivegrid/simple_stage.component.damq5.3357886708016.jpg/errorv3jpg.jpg"
        alt=""
      />
      <div className="absolute md:top-40 top-5 md:left-10 left-5 text-white font-bold z-10">
        <h1 className="md:text-5xl text-md font-serif md:mb-10">
          Buradan Devam Edemezsiniz!
        </h1>
        <p className="md:text-lg text-xs  text-neutral-300 md:mb-16 mb-8 w-6/12">
          Aranan sayfa maalesef bulunamadı. Bunun nedeni, hatalı veya eski bir
          URL çağırmış olmanız olabilir.{" "}
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 md:px-10 px-5 py-1"
        >
          Anasayfa
        </button>
      </div>
      <div className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute left-0 top-0 w-2/4 h-full bg-gradient-to-r from-black to-transparent"></div>
    </section>
  );
};

export default NotFound;
