"use client";
import { addRating, getRatingByCarId, getUser } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactStars from "@/components/ratingstars";
import toast from "react-hot-toast";

export default function Rating({ carId }) {
  const [scoreData, setScoreData] = useState({ score: 0, totalUser: 0 });
  const [userScore, setUserScore] = useState(0);
  const [trigger, Settrigger] = useState(false);
  const router = useRouter();

  async function sendRating(score) {
    const user = await getUser();
    if (!user) {
      return router.push("/sign-in");
    }
    const { id } = user;
    const result = await addRating(id, carId, score);
    result ? toast.success(result) : toast.error("Bir hata oluştu");
    Settrigger(!trigger);
  }

  useEffect(() => {
    async function ratingControl() {
      const user = await getUser();
      const ratingData = await getRatingByCarId(carId);
      let total = 0;

      for (const data of ratingData[0].score) {
        if (data.userId === user?.id) {
          setUserScore(data.score);
        }
        total += data.score;
      }
      const averageScore =
        ratingData[0].score.length === 0
          ? total / total
          : total / ratingData[0].score.length;

      setScoreData({
        score: averageScore,
        totalUser: ratingData[0].score.length,
      });
    }
    ratingControl();
  }, [trigger, carId]);

  return (
    <section className="mt-20 border md:mx-0 mx-2 md:w-4/12 h-fit pb-5 min-h-[280px]">
      <h1 className="text-2xl font-semibold  text-center mb-5">Değerlendir</h1>
      <p className="text-center text-sm font-bold">Sizin Puanınız</p>
      <div className="flex justify-center text-center h-[55px]">
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
        <h2 className="font-bold">Genel Puan: {scoreData.score.toFixed(1)}</h2>
        <p className="text-xs">
          {scoreData.totalUser
            ? `${scoreData.totalUser} kullanıcı değerlendirdi`
            : "Henüz kimse değerlendirmedi"}
        </p>
        <ReactStars
          isHalf={true}
          classNames="flex justify-center mx-auto"
          count={5}
          value={scoreData.score}
          size={20}
          activeColor="#0000FF"
        />
      </div>
    </section>
  );
}
