import HomeContainer from "@/container/HomeContainer";
import { getAllCars } from "@/lib/functions";

export default async function Home() {
  const carsData = await getAllCars();

  return (
    <>
      <HomeContainer homeinfo={carsData} />
    </>
  );
}
