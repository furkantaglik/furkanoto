import Card from "./Card";

const Maincars = ({ carsinfo }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto justify-center h-fit w-full">
      {carsinfo?.map((car, index) => (
        <Card
          key={car.id}
          id={car.id}
          marka={car.brand}
          model={car.model}
          yakit={car.fuel}
          fiyat={car.price}
          ratingData={car.score}
          resim1={car.image1}
          resim2={car.image2}
          resim3={car.image3}
        />
      ))}
    </section>
  );
};

export default Maincars;
