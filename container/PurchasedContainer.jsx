import Maincars from "@/components/Maincars";

export default function PurchasedContainer({ pursData }) {
  return (
    <section className=" max-w-screen-2xl mx-auto mt-20 mb-96">
      <div className="md:mx-20 mx-2">
        <h1 className="md:text-3xl text-xl font-bold">Satın Alınanlar</h1>
        <p className=" border-b-4 border-blue-800 text-lg">
          {pursData?.length} sonuç Bulundu
        </p>
      </div>
      <Maincars carsinfo={pursData} />
    </section>
  );
}
