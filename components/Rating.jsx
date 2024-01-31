import { addRating, getUser } from "@/lib/actions";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";

export default function Rating({ carId, ratingData }) {
  const [totalScore, setTotalScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  async function sendRating(score) {
    const user = await getUser();
    if (!user) {
      return router.push("/sign-in");
    }
    const { id } = user;
    const result = await addRating(id, carId, score);
    result ? toast.success(result) : toast.error("Bir hata oluştu");
  }

  useEffect(() => {
    async function ratingControl() {
      const user = await getUser();
      let totalScore = 0;
      for (const data of ratingData) {
        if (data.userId === user?.id) {
          setUserScore(data.score);
        }
        totalScore += data.score;
      }
      const averageScore = totalScore / ratingData.length;
      setTotalScore(averageScore);
    }

    ratingControl();
  }, [ratingData]);

  return (
    <section className="mt-20 border md:mx-0 mx-2 md:w-4/12 h-fit pb-5 min-h-[280px]">
      <h1 className="text-2xl font-semibold  text-center mb-5">Değerlendir</h1>
      <p className="text-center text-sm font-bold">Sizin Puanınız</p>
      <div className="flex justify-center text-center ">
        <ReactStars
          count={5}
          value={userScore}
          onChange={(e) => {
            sendRating(e);
          }}
          size={50}
          activeColor="#0000FF"
        />
      </div>
      <div className="mt-5 mx-3 text-center">
        <h2 className="font-bold">Genel Puan </h2>
        <ReactStars
          isHalf={true}
          classNames="flex justify-center mx-auto"
          count={5}
          value={totalScore}
          size={20}
          activeColor="#0000FF"
        />
        <p
          className={` ${
            totalScore ? "text-2xl" : "text-xs"
          }  font-semibold underline`}
        >
          {totalScore ? totalScore : "Henüz Kimse Oy vermedi"}
        </p>
      </div>
    </section>
  );
}
