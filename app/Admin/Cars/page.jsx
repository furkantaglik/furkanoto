import CarsForm from "@/components/admin/CarsForm";
import { getAllCars } from "@/lib/functions";

const AdminPage = async () => {
  const carsData = await getAllCars();
  return (
    <>
      <CarsForm carsData={carsData} />
      {/* <div className="h-screen flex justify-center items-center">
        <h1>Doğrulanıyor Lütfen Bekleyin...</h1>
      </div> */}
    </>
  );
};

export default AdminPage;
