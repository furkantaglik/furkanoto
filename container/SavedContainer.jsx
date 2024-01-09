import { getSavedCars } from "@/lib/actions";
import { auth } from "@clerk/nextjs";
import Maincars from "@/components/Maincars";

const SavedContainer = async () => {
  const { userId } = auth();
  const savedCars = await getSavedCars(userId);
  return (
    <section className=" max-w-screen-2xl mx-auto mt-20 mb-96">
      <div className="md:mx-20 mx-2">
        <h1 className="md:text-3xl text-xl font-bold">Favoriler</h1>
        <p className=" border-b-4 border-blue-800 text-lg">
          {savedCars.length} sonuç Bulundu
        </p>
      </div>
      <Maincars carsinfo={savedCars} />
    </section>
  );
};

export default SavedContainer;
