"use client";
import { getUserId, setSavedCar, savedStatus } from "@/lib/actions";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useEffect, useState } from "react";

export default function LikeButton({ carId }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          const status = await savedStatus(userId, carId);
          setIsSaved(status);
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    fetchData();
  }, [carId]);

  const saveControl = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        await setSavedCar(userId, carId);
        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };

  return (
    <>
      <button onClick={saveControl} className="float-right">
        {isSaved ? (
          <MdFavorite className="w-5 h-5 rounded-full text-black hover:bg-black hover:text-white" />
        ) : (
          <MdFavoriteBorder className="w-5 h-5 rounded-full  hover:bg-red-600" />
        )}
      </button>
    </>
  );
}
