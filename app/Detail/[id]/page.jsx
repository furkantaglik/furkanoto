import DetailContainer from "@/container/DetailContainer";
import { getAllCars } from "@/lib/actions";

const carsData = await getAllCars();

export async function generateMetadata({ params }) {
  const detailCar = carsData.find((car) => car.id == params.id);

  return {
    title: `${detailCar.brand} ${detailCar.model}`,
  };
}

const page = async ({ params }) => {
  const detailCar = carsData.find((car) => car.id == params.id);

  return <DetailContainer detailinfo={detailCar} />;
};

export default page;
