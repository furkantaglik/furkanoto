"use client";
import Link from "next/link";
import { AiOutlineArrowUp } from "react-icons/ai";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black p-10 mx-auto max-w-screen-2xl h-full text-gray-300">
      <div className="text-white text-center ease-in-out animate-bounce">
        <button onClick={scrollToTop}>
          <AiOutlineArrowUp className="flex mx-auto" />{" "}
          <span className="">Başa Dön</span>
        </button>
      </div>
      <hr className="my-10" />

      <section className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-y-5 gap-x-5">
        <div className="grid grid-cols-1 gap-y-3">
          <h2 className="text-white text-lg mb-3">Modeller</h2>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Modellere genel bakış{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Elektrikli Otomobiller{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Konfiguratör{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Test Sürüşü{" "}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-3">
          <h2 className="text-white text-lg mb-3">Satış</h2>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Satış Kampanyaları
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Online Store
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Kullanılmış Araçlar{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Showroom arama{" "}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-3">
          <h2 className="text-white text-lg mb-3">Teknoloji</h2>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Elektromobilite{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Sürdürülebilirlik{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Akıllı Sürüş{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Mbux{" "}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-3">
          <h2 className="text-white text-lg mb-3">Furkan Otomobil</h2>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Biz Kimiz
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Neden biz
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Hakkımızıda{" "}
          </Link>
          <Link
            href="#"
            className="hover:text-white border-b border-black hover:border-white hover:border-b w-fit"
          >
            {" "}
            Gelecek Planlarımız{" "}
          </Link>
        </div>
      </section>
      <Link
        href="https://github.com/furkantaglik"
        className=" font-thin text-center mt-10 flex hover:border-blue-600 border-t w-fit mx-auto hover:text-blue-500 cursor"
      >
        Created By Furkan Tağlık
      </Link>
    </footer>
  );
};

export default Footer;
