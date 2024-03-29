"use client";
import { MdError } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Confirmation() {
  const [count, setCount] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (count === 0) {
      router.push("/");
    }
  }, [count, router]);

  return (
    <section className="flex flex-col justify-center items-center h-screen w-full text-white">
      <MdError className="text-red-700 text-8xl" />
      <div className=" bg-red-700 p-10 rounded-lg text-center">
        <h1 className="text-3xl font-bold">Üzgünüz :(</h1>
        <p>"Satın alımınız başarısız oldu"</p>
        <p className="mt-10">
          {count} saniye içinde anasayfaya yönlendirileceksiniz
        </p>
      </div>
    </section>
  );
}
