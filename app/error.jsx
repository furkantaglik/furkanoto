"use client";
import Link from "next/link";

export default function error({ error, reset }) {
  return (
    <section className="max-w-screen-2xl mx-auto relative h-full">
      <img
        src="https://www.mercedes-benz.com.tr/content/turkey/tr/passengercars/content-pool/tool-pages/error-pages/page-not-found/_jcr_content/root/responsivegrid/simple_stage.component.damq5.3357886708016.jpg/errorv3jpg.jpg"
        alt=""
      />
      <div className="absolute md:top-40 top-5 md:left-10 left-5 text-white font-bold z-10">
        <h1 className="md:text-5xl text-md font-serif md:mb-10">
          Bir Hata Oluştu!
        </h1>
        <p className="md:text-lg text-xs  text-neutral-300 md:mb-16 mb-8 w-6/12">
          Malesef Sistemimizde Yaşanan Bir hatadan dolayı şuan erişilemiyor.
          {/* {error.message} */}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 md:px-10 px-3 py-1"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 md:px-10 px-3 py-1 ms-3"
        >
          Anasayfa
        </Link>
      </div>
      <div className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute left-0 top-0 w-2/4 h-full bg-gradient-to-r from-black to-transparent"></div>
    </section>
  );
}
