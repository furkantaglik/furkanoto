"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { setSavedCars, savedStatus } from "@/utils/helpers/Datafetcher";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { auth } from "@/utils/Firebase";

const Card = ({ id, marka, model, yakit, fiyat, resim1, resim2, resim3 }) => {
  const [image, setImage] = useState(resim1);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const status = await savedStatus(user.uid, id);
          setIsSaved(status);
        }
      } catch (error) {
        
      }
    };

    fetchSavedStatus();
  }, [id]);

  const saveControl = async () => {
    try {
      const user = auth.currentUser;
      
      if (user) {
        await setSavedCars(user.uid, id);
        setIsSaved(!isSaved);
      }
    } catch (error) {
     
    }
  };

  return (
    <section className='hover:bg-gray-100 p-5 h-[300px] w-full group transition duration-100 cursor-pointer'>
      <button onClick={saveControl} className="float-right">
        {isSaved ? (
          <MdFavorite className="w-5 h-5 rounded-full hover:bg-red-500" />
        ) : (
          <MdFavoriteBorder className="w-5 h-5 rounded-full hover:bg-red-500" />
        )}
      </button>
      <div className='text-center'>
        <h2 className='text-md md:text-lg font-medium mb-2 font-serif'> <span className="font-bold">{marka} </span> {model}</h2>
        <span className='bg-gray-200 rounded-full px-2 text-sm text-gray-700'>{yakit}</span>
      </div>
      <Link href={`Detail/${id}`}>
        <img src={image} alt="" className="w-[400px] md:h-[200px] h-[120px]" />
      </Link>
      <div className="border-b-4 border-black text-center pt-2 md:opacity-0 group-hover:opacity-100 transition duration-100">
        <div className="flex justify-center items-center gap-x-5 mb-2">
          <button onClick={() => setImage(resim1)}
            className={`px-2 py-1 rounded-full ${image === resim1 ? "bg-blue-700" : "bg-gray-700"}`}
          ></button>
          <button onClick={() => setImage(resim2)}
            className={`px-2 py-1 rounded-full ${image === resim2 ? "bg-blue-700" : "bg-gray-700"}`}
          ></button>
          <button onClick={() => setImage(resim3)}
            className={`px-2 py-1 rounded-full ${image === resim3 ? "bg-blue-700" : "bg-gray-700"}`}
          ></button>
        </div>
        <h2 className="font-medium ">{fiyat} TL</h2>
      </div>
    </section>
  )
}

export default Card