export default function TotalScoreBtn({ totalScore }) {
  return (
    <div className="float-left flex justify-center items-center  bg-black text-white rounded-lg h-[20px] w-[25px]">
      <span className="text-xs font-semibold">
        {totalScore ? totalScore.toFixed(1) : "?"}
      </span>
    </div>
  );
}
