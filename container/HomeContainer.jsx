"use client";
import Banner from "@/components/Banner";
import Sidebar from "@/components/Sidebar";
import Slider from "@/components/Slider";
import Maincars from "@/components/Maincars";
import { useState, useEffect } from "react";

const HomeContainer = ({ homeinfo }) => {
  const [filteredCars, setFilteredCars] = useState(homeinfo);
  const [filters, setFilters] = useState({
    brand: [],
    fuel: [],
    body: [],
    gear: [],
    color: [],
    minengine: [],
    maxengine: [],
    minspeed: [],
    maxspeed: [],
    minyear: [],
    maxyear: [],
    minprice: [],
    maxprice: [],
  });

  useEffect(() => {
    const filtered = homeinfo.filter((car) => {
      return (
        (filters.brand.length === 0 || filters.brand.includes(car.brand)) &&
        (filters.fuel.length === 0 || filters.fuel.includes(car.fuel)) &&
        (filters.body.length === 0 || filters.body.includes(car.body)) &&
        (filters.gear.length === 0 || filters.gear.includes(car.gear)) &&
        (filters.color.length === 0 || filters.color.includes(car.color)) &&
        (filters.minengine.length === 0 ||
          (filters.minengine.includes("3andup") &&
            3 <= parseFloat(car.engine))) &&
        (filters.maxengine.length === 0 ||
          (filters.maxengine.includes("3anddown") &&
            3 >= parseFloat(car.engine))) &&
        (filters.minspeed.length === 0 ||
          (filters.minspeed.includes("200andup") &&
            200 <= parseFloat(car.speed))) &&
        (filters.maxspeed.length === 0 ||
          (filters.maxspeed.includes("200anddown") &&
            200 >= parseFloat(car.speed))) &&
        (filters.minyear.length === 0 ||
          (filters.minyear[filters.minyear.length - 1] || 0) <= car.year) &&
        (filters.maxyear.length === 0 ||
          (filters.maxyear[filters.maxyear.length - 1] || Infinity) >=
            car.year) &&
        (filters.minprice.length === 0 ||
          (filters.minprice[filters.minprice.length - 1] || 0) <= car.price) &&
        (filters.maxprice.length === 0 ||
          (filters.maxprice[filters.maxprice.length - 1] || Infinity) >=
            car.price)
      );
    });

    setFilteredCars(filtered);
  }, [filters]);

  return (
    <section className="mb-52">
      <Banner />
      <Slider />
      <div className=" max-w-screen-xl mb-8 mx-2 md:mx-auto">
        <h1 className="md:text-3xl text-xl font-bold">Araçlar</h1>
        <p className=" border-b-4 border-blue-800 text-lg">
          {filteredCars.length} sonuç Bulundu
        </p>
      </div>
      <div className="flex max-w-screen-2xl mx-auto gap-x-3">
        <Sidebar filters={filters} setFilters={setFilters} />
        <Maincars carsinfo={filteredCars} />
      </div>
    </section>
  );
};

export default HomeContainer;
