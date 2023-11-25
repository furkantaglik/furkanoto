import DetailContainer from "@/container/DetailContainer"
import { getAllData } from "@/utils/functions/Datafetcher"
// import carsData from "@/mocks/cars.json"

const page = async ({ params }) => {
  const carsData =await getAllData();
  const carId = carsData.find(car => car.id == params.id)

  return (
    <DetailContainer detailinfo={carId} />
  )
}

export default page