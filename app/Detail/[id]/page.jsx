import DetailContainer from "@/container/DetailContainer"
import { getAllCars } from "@/utils/functions/Datafetcher"
// import carsData from "@/mocks/cars.json"

const page = async ({ params }) => {
  const carsData =await getAllCars();
  const carId = carsData.find(car => car.id == params.id)

  return (
    <DetailContainer detailinfo={carId} />
  )
}

export default page