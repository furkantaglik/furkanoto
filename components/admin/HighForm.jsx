"use client";
import { useState } from "react";
import { addHighlight, deleteHighlight, updateHighlight } from "@/lib/actions";
import Link from "next/link";
import toast from "react-hot-toast";

const HighForm = ({ highData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className=" max-w-screen-xl mx-auto md:mt-16 mb-20">
      <Link
        href="/Admin/Cars"
        className="p-2 flex w-fit font-semibold md:float-right border-b-2 hover:border-black "
      >
        Araçlara Git
      </Link>

      {/* Kontroller  */}

      <div className="grid grid-cols-3 mx-auto md:w-2/3 gap-x-5 gap-y-5 lg:gap-y-0 p-3 my-10 bg-gray-300 rounded-lg font-bold">
        <button
          onClick={async () => {
            const result = await addHighlight(formData);
            console.log(result);
            result
              ? toast.success("Öne çıkan eklendi")
              : toast.error("Öne çıkan eklenirken hata oluştu");
          }}
          className=" py-3   bg-black text-gray-300 hover:text-white"
        >
          EKLE
        </button>
        <button
          onClick={async () => {
            const result = await deleteHighlight(formData);
            console.log(result);
            result
              ? toast.success("Öne çıkan silindi")
              : toast.error("Öne çıkan silinirken hata oluştu");
          }}
          className=" py-3   bg-black text-gray-300 hover:text-white"
        >
          SİL
        </button>
        <button
          onClick={async () => {
            const result = await updateHighlight(formData);
            console.log(result);
            result
              ? toast.success("Öne çıkan güncellendi")
              : toast.error("Öne çıkan güncellenirken hata oluştu");
          }}
          className=" py-3   bg-black text-gray-300 hover:text-white"
        >
          GÜNCELLE
        </button>
      </div>

      <form className="grid grid-cols-2 h-fit  md:grid-cols-4 mx-auto gap-y-8 gap-x-5 p-5  bg-neutral-300 rounded-lg font-bold mb-10">
        <div className="">
          <label className="block mb-2 font-semibold" htmlFor="title">
            Başlık{" "}
          </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
            className="w-full border rounded px-2 py-1 text-black"
            placeholder="Buraya yaz."
          />
        </div>
        <div className="">
          <label className="block mb-2 font-semibold" htmlFor="description">
            Açıklama{" "}
          </label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="w-full border rounded px-2 py-1 text-black"
            placeholder="Buraya yaz."
          />
        </div>
        <div className="">
          <label className="block mb-2 font-semibold" htmlFor="url">
            Hedef Url{" "}
          </label>
          <input
            type="text"
            name="url"
            onChange={handleChange}
            value={formData.url}
            className="w-full border rounded px-2 py-1 text-black"
            placeholder="Buraya yaz."
          />
        </div>

        <div className="">
          <label className="block mb-2 font-semibold" htmlFor="image">
            Görsel url
          </label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={formData.image}
            className="w-full border rounded px-2 py-1 text-black"
            placeholder="Buraya yaz."
          />
        </div>
      </form>

      <aside className="bg-slate-200 p-3 rounded-md">
        <h2 className="text-xl font-bold text-center mb-5">Öne Çıkanlar</h2>
        <div className="flex space-x-16 overflow-x-scroll">
          {highData?.map((high, index) => (
            <div key={high.id} className="flex-none w-64 ">
              <button
                onClick={() => {
                  setFormData(high);
                }}
                className="py-1 px-10 w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-semibold"
              >
                Düzenle
              </button>
              <img src={high.image} alt={high.title} />
              <div className="border-4 p-3">
                <h1 className="text-xl font-bold mb-2">{high.title}</h1>
                <p className="font-lg">{high.description}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default HighForm;
