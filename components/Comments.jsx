"use client";
import {
  addCommentByCarId,
  getUser,
  GetCommentsByCarId,
  deleteComment,
} from "@/lib/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaDeleteLeft } from "react-icons/fa6";
import { formatDate } from "@/lib/helpers";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";

export default function Comments({ carId }) {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState();
  const router = useRouter();

  async function handleDeleteComment(commentId) {
    try {
      const user = await getUser();
      if (!user) {
        return router.push("/sign-in");
      }
      const { id } = user;
      const result = await deleteComment(id, carId, commentId);
      result
        ? toast.success("Yorum Silindi")
        : toast.error("Beklenmedik bir hata belkide bu yorum size ait değil");
      setComments(await GetCommentsByCarId(carId));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSendComment() {
    try {
      if (value.trim().length < 3 || value.trim() === "") {
        return toast.error("Yorumunuz Çok kısa");
      }
      const user = await getUser();
      if (!user) {
        return router.push("/sign-in");
      }
      const { id, username, imageUrl } = user;
      const result = await addCommentByCarId(
        carId,
        username,
        id,
        imageUrl,
        value
      );
      result
        ? toast.success("Yorum eklendi")
        : toast.error("Beklenmedik bir hata");
      setValue("");
      setComments(await GetCommentsByCarId(carId));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getComments(carId) {
      setComments(await GetCommentsByCarId(carId));
    }
    getComments(carId);
  }, [carId]);

  return (
    <section className="mt-20 max-w-screen-md  w-full   items-center border">
      <h1 className="text-2xl font-semibold  text-center">Yorumlar</h1>
      <p className="text-center mb-5 font-serif">
        {comments?.length < 1
          ? "İlk yorum yapan siz olun"
          : `${comments?.length} adet yorum`}
      </p>
      <div className="flex  mx-auto px-10">
        <input
          value={value}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendComment();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          className="w-full outline-none border p-1 rounded-md bg-gray-200"
          type="text"
          placeholder="Yorumunuz.."
        />
        <button
          onClick={handleSendComment}
          className="p-2 px-5 bg-blue-700 hover:bg-blue-800 rounded-e-full font-bold text-white"
        >
          <IoSend />
        </button>
      </div>
      <div className="mt-10 flex flex-col gap-y-10 px-5">
        {comments?.map((comment) => (
          <div className="flex flex-col rounded-e-md" key={comment.id}>
            <div className="flex flex-row justify-between items-center">
              <div className="bg-slate-800 text-white flex items-center font-semibold rounded-md w-fit">
                <img
                  className="w-[40px] h-[40px] rounded-l-md"
                  src={comment.userImg}
                  alt=""
                />
                <p className="px-1">{comment.username}</p>
              </div>
              <div className="flex flex-col  items-end">
                <p className="text-xs font-light">
                  {formatDate(comment.createdAt)}
                </p>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  <FaDeleteLeft className="text-xl" />
                </button>
              </div>
            </div>

            <p className="bg-neutral-200 w-full p-1 rounded-md font-light">
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
