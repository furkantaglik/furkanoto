"use client"
import Banner from "@/components/Banner"
import Sidebar from "@/components/Sidebar"
import Slider from "@/components/Slider"
import Maincars from "@/components/Maincars"
import { useState, useEffect } from "react"


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
    minyear: [],
    maxyear: [],
    minprice: [],
    maxprice: []
  });

  useEffect(() => {
    const filtered = homeinfo.filter(car => {
      return (
        (filters.brand.length === 0 || filters.brand.includes(car.brand)) &&
        (filters.fuel.length === 0 || filters.fuel.includes(car.fuel)) &&
        (filters.body.length === 0 || filters.body.includes(car.body)) &&
        (filters.gear.length === 0 || filters.gear.includes(car.gear)) &&
        (filters.color.length === 0 || filters.color.includes(car.color)) &&
        (filters.minengine.length === 0 || (filters.minengine.includes("3andup") && 3 <= parseFloat(car.engine))) &&
        (filters.maxengine.length === 0 || (filters.maxengine.includes("3anddown") && 3 >= parseFloat(car.engine))) &&
        (filters.minyear.length === 0 || filters.minyear[filters.minyear.length - 1] <= car.year) &&
        (filters.maxyear.length === 0 || filters.maxyear[filters.maxyear.length - 1] >= car.year) &&
        (filters.minprice.length === 0 || filters.minprice[filters.minprice.length - 1] <= car.price) &&
        (filters.maxprice.length === 0 || filters.maxprice[filters.maxprice.length - 1] >= car.price)

      );
    });

    setFilteredCars(filtered);
  }, [filters, homeinfo]);

  return (
    <section>
      <Banner />
      <Slider />
      <div className=" max-w-screen-xl mx-auto mb-8">
        <h1 className='md:text-3xl text-xl font-bold'>Araçlar</h1>
        <p className=" border-b-4 border-blue-500 text-lg">{filteredCars.length} sonuç Bulundu</p>
      </div>
      <div className="flex max-w-screen-2xl mx-auto w-full mb-8">
        <Sidebar filters={filters} setFilters={setFilters} />
        <Maincars carsinfo={filteredCars} />
      </div>
    </section>
  )
}

export default HomeContainer