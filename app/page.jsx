import HomeContainer from "@/container/HomeContainer";
import { getAllData } from "@/utils/helpers/Datafetcher";

export default async function Home() {
  const carsData = await getAllData();

  return (
    <>
      <HomeContainer homeinfo={carsData} />
    </>
  )
}
