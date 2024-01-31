import DetailContainer from "@/container/DetailContainer";
import { getAllCars } from "@/lib/actions";

const carsData = await getAllCars();

export async function generateMetadata({ params }) {
  const carId = carsData.find((car) => car.id == params.id);

  return {
    title: `${carId.brand} ${carId.model}`,
  };
}

const page = async ({ params }) => {
  const detailCar = carsData.find((car) => car.id == params.id);

  return <DetailContainer detailinfo={detailCar} />;
};

export default page;
