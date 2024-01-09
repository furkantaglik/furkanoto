"use client";
import { useState } from "react";
import { addCar, deleteCar, updateCar } from "@/lib/actions";
import { formatDate } from "@/lib/helpers";
import Link from "next/link";

const CarsForm = ({ carsData }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [formData, setFormData] = useState({
    brand: "Mercedes",
    model: "",
    fuel: "Benzin",
    body: "Hatchback",
    gear: "Manuel",
    color: "Siyah",
    engine: "",
    year: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    speed: "",
    createdAt: "",
    updatedAt: "",
    description: "",
  });

  //!form değişikliklerini kontrol
  const handleChange = (e) => {
    if (e.target.value !== false) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto md:mt-16 mb-20">
      <Link
        href="/Admin/Highlights"
        className="p-2 flex w-fit font-semibold md:float-right border-b-2 hover:border-black "
      >
        Öne Çıkanlara Git
      </Link>

      {/* Kontroller  */}
      <div className="grid grid-cols-2 md:grid-cols-3 mx-auto md:w-2/3 gap-x-5 gap-y-5 lg:gap-y-0 p-3 my-10 bg-gray-300 rounded-lg font-bold">
        <button
          onClick={() => addCar(formData)}
          className=" py-3   bg-black text-gray-300 hover:text-white"
        >
          EKLE
        </button>
        <button
          onClick={() => deleteCar(formData)}
          className=" py-3   bg-black text-gray-300 hover:text-white"
        >
          SİL
        </button>
        <button
          onClick={() => updateCar(formData)}
          className=" py-3   bg-black text-gray-300 hover:text-white"
        >
          GÜNCELLE
        </button>

        <button
          onClick={() => setOpenSideBar(!openSideBar)}
          type="button"
          className=" py-3 text-white bg-black md:hidden"
        >
          {openSideBar ? "Close" : "Open"}
        </button>
      </div>

      <div className="grid grid-cols-6 gap-x-2">
        {/* Side bar */}

        <aside
          className={`md:h-[620px] h-[810px] absolute md:relative  md:col-span-2 transition-transform  ${
            openSideBar
              ? "-translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto text-white bg-gray-800 rounded-lg">
            <ul className="space-y-2">
              {carsData?.map((car, index) => (
                <li key={car.id}>
                  <button
                    onClick={() => {
                      setFormData(car);
                      setOpenSideBar(false);
                    }}
                    className="flex justify-between items-center p-1 border-b hover:text-black w-full rounded-lg hover:bg-gray-300 group"
                  >
                    <span className="font-bold">{index + 1}</span>
                    <span className="ml-3 ">
                      {car.brand}: {car.model}
                    </span>
                    <img src={car.image1} className="w-[100px]" alt="" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form */}

        <form className="grid grid-cols-2 h-fit col-span-6 md:col-span-4 md:grid-cols-3 mx-auto gap-y-8 gap-x-5 p-5  bg-neutral-300 rounded-lg font-bold">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="brand">
              Marka
            </label>
            <select
              name="brand"
              onChange={handleChange}
              value={formData.brand}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            >
              <option value="Mercedes">Mercedes</option>
              <option value="Bmw">Bmw</option>
              <option value="Audi">Audi</option>
              <option value="Renault">Renault</option>
              <option value="Ford">Ford</option>
              <option value="Fiat">Fiat</option>
              <option value="Toyota">Toyota</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="model">
              Model
            </label>
            <input
              type="text"
              name="model"
              onChange={handleChange}
              value={formData.model}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="fuel">
              Yakıt
            </label>
            <select
              name="fuel"
              onChange={handleChange}
              value={formData.fuel}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            >
              <option value="Benzin">Benzin</option>
              <option value="Dizel">Dizel</option>
              <option value="Elektrik">Elektrik</option>
              <option value="Hibrit">Hibrit</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="body">
              Gövde
            </label>
            <select
              name="body"
              onChange={handleChange}
              value={formData.body}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            >
              <option value="Hatchback">HatchBack</option>
              <option value="Sedan">Sedan</option>
              <option value="Suv">Suv</option>
              <option value="Coupe">Coupe</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="gear">
              Vites
            </label>
            <select
              name="gear"
              onChange={handleChange}
              value={formData.gear}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            >
              <option value="Manuel">Manuel</option>
              <option value="Otomatik">Otomatik</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="color">
              Renk
            </label>
            <select
              name="color"
              onChange={handleChange}
              value={formData.color}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            >
              <option value="Siyah">Siyah</option>
              <option value="Beyaz">Beyaz</option>
              <option value="Gri">Gri</option>
              <option value="Mavi">Mavi</option>
              <option value="Kırmızı">Kırmızı</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="engine">
              Motor
            </label>
            <input
              type="text"
              name="engine"
              onChange={handleChange}
              value={formData.engine}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="year">
              Yıl
            </label>
            <input
              type="text"
              name="year"
              onChange={handleChange}
              value={formData.year}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="price">
              Fiyat
            </label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={formData.price}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="image1">
              Resim 1
            </label>
            <input
              type="text"
              name="image1"
              onChange={handleChange}
              value={formData.image1}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="image2">
              Resim 2
            </label>
            <input
              type="text"
              name="image2"
              onChange={handleChange}
              value={formData.image2}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="image3">
              Resim 3
            </label>
            <input
              type="text"
              name="image3"
              onChange={handleChange}
              value={formData.image3}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="speed">
              Max Hız km/sa
            </label>
            <input
              type="number"
              name="speed"
              onChange={handleChange}
              value={formData.speed}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div className="md:col-span-2 ">
            <label className="block mb-2 font-semibold" htmlFor="description">
              Açıklama
            </label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="w-full border rounded px-2 py-1 text-black"
              placeholder="Buraya yaz."
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="createdAt">
              Oluşturma Tarihi
            </label>
            <input
              type="text"
              name="createdAt"
              value={formatDate(formData.createdAt)}
              readOnly
              className="w-full border bg-neutral-400 rounded px-2 py-1 text-black"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="updatedAt">
              Düzenlenme Tarihi
            </label>
            <input
              type="text"
              name="updatedAt"
              value={formatDate(formData.updatedAt)}
              readOnly
              className="w-full border bg-neutral-400 rounded px-2 py-1 text-black "
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CarsForm;
