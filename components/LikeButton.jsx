"use client";
import { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getUserId, setSavedCar, savedStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LikeButton({ carId }) {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          const status = await savedStatus(userId, carId);
          setIsSaved(status);
          return false;
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
      if (!userId) {
        return router.push("/sign-in");
      }
      const result = await setSavedCar(userId, carId);
      result ? toast.success(result) : toast.error("Beklenmedik bir hata");
      setIsSaved((prev) => !prev);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };

  return (
    <>
      <button onClick={saveControl} className="float-right" id="like">
        {isSaved ? (
          <MdFavorite className="w-5 h-5 rounded-full text-black hover:bg-black hover:text-white" />
        ) : (
          <MdFavoriteBorder className="w-5 h-5 rounded-full  hover:bg-red-600" />
        )}
      </button>
    </>
  );
}
