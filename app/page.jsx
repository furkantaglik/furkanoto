import HomeContainer from "@/container/HomeContainer";
import { getAllCars } from "@/utils/functions/Datafetcher";

export default async function Home() {
  const carsData = await getAllCars();

  return (
    <>
      <HomeContainer homeinfo={carsData} />
    </>
  )
}
