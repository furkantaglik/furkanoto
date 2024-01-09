import DetailContainer from "@/container/DetailContainer";
import { getAllCars } from "@/lib/actions";

export async function generateMetadata({ params }) {
  const carsData = await getAllCars();
  const carId = carsData.find((car) => car.id == params.id);

  return {
    title: `${carId.brand} ${carId.model}`,
  };
}

const page = async ({ params }) => {
  const carsData = await getAllCars();
  const carId = carsData.find((car) => car.id == params.id);

  return <DetailContainer detailinfo={carId} />;
};

export default page;
