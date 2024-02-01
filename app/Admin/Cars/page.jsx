import CarsForm from "@/components/admin/CarsForm";
import { getAllCars } from "@/lib/actions";

export const metadata = {
  title: "Admin Sayfası",
};

const AdminPage = async () => {
  const carsData = await getAllCars();
  return (
    <>
      <CarsForm carsData={carsData} />
    </>
  );
};

export default AdminPage;
