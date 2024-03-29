import Image from "next/image";
import Link from "next/link";
const Banner = () => {
  return (
    <section className="max-w-screen-2xl mx-auto relative">
      <video muted autoPlay loop className="md:block hidden">
        <source src="/videos/banner.mp4" type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      <Image
        className="md:hidden"
        quality={100}
        width={767}
        height={500}
        src="/images/banner.png"
      />

      <div className="absolute md:top-40 top-5 md:left-10 left-5 text-white font-bold z-10">
        <h1 className="md:text-5xl text-2xl font-serif md:mb-10 text-blue-500">
          Yeni E Serisi
        </h1>
        <p className="md:text-xl text-md  md:mb-16 mb-8">Senin Yansıman !</p>
        <Link
          href="/test"
          className="bg-slate-900 hover:bg-slate-950 md:px-10 rounded-full px-5 py-3"
        >
          Keşfedin
        </Link>
      </div>
      <div className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute left-0 top-0 w-2/4 h-full bg-gradient-to-r from-black to-transparent"></div>
    </section>
  );
};

export default Banner;
