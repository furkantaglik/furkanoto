"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Accordion from "./Accordion";

const Sidebar = ({ filters, setFilters }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[category].indexOf(value);

      if (index === -1) {
        updatedFilters[category] = [...updatedFilters[category], value];
      } else {
        updatedFilters[category] = [
          ...updatedFilters[category].slice(0, index),
          ...updatedFilters[category].slice(index + 1),
        ];
      }
      return updatedFilters;
    });
  };

  return (
    <>
      <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        type="button"
        className="inline-flex items-center z-30 fixed  p-2 mt-2 ml-3 text-sm rounded-lg md:hidden top-2 text-white hover:bg-neutral-800"
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>

      {/* overlay  */}
      {openSideMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setOpenSideMenu(false)}
        />
      )}

      <aside
        className={`fixed md:h-fit h-screen md:sticky top-16 md:top-20 left-0 z-10 w-[300px]  transition-transform  max-w-screen-2xl  ${
          openSideMenu ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-full p-5 overflow-y-auto bg-neutral-200 text-black">
          <button
            onClick={() => setOpenSideMenu(false)}
            className="flex justify-between md:justify-center font-semibold w-full text-2xl mb-3 border-b-2 border-gray-700"
          >
            <h1 className="flex  items-center">
              {" "}
              <BiSolidCategory /> FİLTRELER
            </h1>
            <AiOutlineCloseCircle className="md:hidden" />
          </button>
          <ul className="space-y-7 font-medium">
            <li className="md:hidden block">
              <SearchBar />
            </li>
            <li>
              <Accordion title="Marka Tercihi">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center ">
                  <input
                    onChange={() => handleCheckboxChange("brand", "Mercedes")}
                    checked={filters.brand.includes("Mercedes")}
                    id="mercedes"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="mercedes" className="ml-3 w-full py-3">
                    Mercedes
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("brand", "Bmw")}
                    checked={filters.brand.includes("Bmw")}
                    id="bmw"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="bmw" className="ml-3 w-full py-3">
                    Bmw
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("brand", "Audi")}
                    checked={filters.brand.includes("Audi")}
                    id="audi"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="audi" className="ml-3 w-full py-3">
                    Audi
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("brand", "Renault")}
                    checked={filters.brand.includes("Renault")}
                    id="renault"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="renault" className="ml-3 w-full py-3">
                    Renault
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("brand", "Ford")}
                    checked={filters.brand.includes("Ford")}
                    id="ford"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="ford" className="ml-3 w-full py-3">
                    Ford
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("brand", "Fiat")}
                    checked={filters.brand.includes("Fiat")}
                    id="fiat"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="fiat" className="ml-3 w-full py-3">
                    Fiat
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("brand", "Toyota")}
                    checked={filters.brand.includes("Toyota")}
                    id="toyota"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="toyota" className="ml-3 w-full py-3">
                    Toyota
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Yakıt Türü">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center ">
                  <input
                    onChange={() => handleCheckboxChange("fuel", "Benzin")}
                    checked={filters.fuel.includes("Benzin")}
                    id="benzin"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="benzin" className="ml-3 w-full py-3">
                    Benzin
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("fuel", "Dizel")}
                    checked={filters.fuel.includes("Dizel")}
                    id="dizel"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="dizel" className="ml-3 w-full py-3">
                    Dizel
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("fuel", "Elektrik")}
                    checked={filters.fuel.includes("Elektrik")}
                    id="elektrik"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="elektrik" className="ml-3 w-full py-3">
                    Elektrik
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("fuel", "Hibrit")}
                    checked={filters.fuel.includes("Hibrit")}
                    id="hibrit"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="hibrit" className="ml-3 w-full py-3">
                    Hibrit
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Gövde Türü">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center ">
                  <input
                    onChange={() => handleCheckboxChange("body", "Hatchback")}
                    checked={filters.body.includes("Hatchback")}
                    id="hatchback"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="hatchback" className="ml-3 w-full py-3">
                    Hatchback
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("body", "Sedan")}
                    checked={filters.body.includes("Sedan")}
                    id="sedan"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="sedan" className="ml-3 w-full py-3">
                    Sedan
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("body", "Suv")}
                    checked={filters.body.includes("Suv")}
                    id="suv"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="suv" className="ml-3 w-full py-3">
                    Suv
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("body", "Coupe")}
                    checked={filters.body.includes("Coupe")}
                    id="coupe"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="coupe" className="ml-3 w-full py-3">
                    Coupe
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("body", "Pickup")}
                    checked={filters.body.includes("Pickup")}
                    id="pickup"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="pickup" className="ml-3 w-full py-3">
                    Pickup
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Vites Türü">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center ">
                  <input
                    onChange={() => handleCheckboxChange("gear", "Otomatik")}
                    checked={filters.gear.includes("Otomatik")}
                    id="manuel"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="manuel" className="ml-3 w-full py-3">
                    Otomatik
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("gear", "Manuel")}
                    checked={filters.gear.includes("Manuel")}
                    id="otomatik"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="otomatik" className="ml-3 w-full py-3">
                    Manuel
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Renk Seçimi">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center whitespace-nowrap ">
                  <input
                    onChange={() => handleCheckboxChange("color", "Siyah")}
                    checked={filters.color.includes("Siyah")}
                    id="siyah"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="siyah" className="ml-3 w-full py-3">
                    Siyah
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("color", "Beyaz")}
                    checked={filters.color.includes("Beyaz")}
                    id="beyaz"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="beyaz" className="ml-3 w-full py-3">
                    Beyaz
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("color", "Gri")}
                    checked={filters.color.includes("Gri")}
                    id="gri"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="gri" className="ml-3 w-full py-3">
                    Gri
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("color", "Mavi")}
                    checked={filters.color.includes("Mavi")}
                    id="mavi"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="mavi" className="ml-3 w-full py-3">
                    Mavi
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("color", "Kırmızı")}
                    checked={filters.color.includes("Kırmızı")}
                    id="kirmizi"
                    type="checkbox"
                    className="w-6 h-6"
                  />
                  <label htmlFor="kirmizi" className="ml-3 w-full py-3">
                    Kırmızı
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Motor Hacmi">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center whitespace-nowrap ">
                  <input
                    onChange={() =>
                      handleCheckboxChange("maxengine", "3anddown")
                    }
                    checked={filters.maxengine.includes("3anddown")}
                    id="3vealti"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="3vealti" className="ml-3 w-full py-3">
                    Min 3.0
                  </label>

                  <input
                    onChange={() => handleCheckboxChange("minengine", "3andup")}
                    checked={filters.minengine.includes("3andup")}
                    id="3veustu"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="3veustu" className="ml-3 w-full py-3">
                    Max 3.0
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Hız">
                <div className="grid grid-cols-2 justify-between w-1/3 items-center whitespace-nowrap ">
                  <input
                    onChange={() =>
                      handleCheckboxChange("maxspeed", "200anddown")
                    }
                    checked={filters.maxspeed.includes("200anddown")}
                    id="200vealti"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="200vealti" className="ml-3 w-full py-3">
                    Min 200
                  </label>

                  <input
                    onChange={() =>
                      handleCheckboxChange("minspeed", "200andup")
                    }
                    checked={filters.minspeed.includes("200andup")}
                    id="200veustu"
                    type="checkbox"
                    className="w-6 h-6 "
                  />
                  <label htmlFor="200veustu" className="ml-3 w-full py-3">
                    Max 200
                  </label>
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Yıl Aralığı">
                <div className="grid grid-cols-3 gap-x-2 text-center p-1 w-full  items-center ">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(
                        "minyear",
                        parseFloat(e.target.value)
                      )
                    }
                    type="number"
                    className="  p-1"
                    placeholder="2010"
                  />
                  <span>-</span>
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(
                        "maxyear",
                        parseFloat(e.target.value)
                      )
                    }
                    type="number"
                    className=" p-1"
                    placeholder="2020"
                  />
                </div>
              </Accordion>
            </li>
            <li>
              <Accordion title="Fiyat Aralığı">
                <div className="grid grid-cols-3 gap-x-2 text-center w-full p-1 items-center ">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(
                        "minprice",
                        parseFloat(e.target.value)
                      )
                    }
                    type="number"
                    className="w-full  p-1"
                    placeholder="0 TL"
                  />
                  <span>-</span>
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(
                        "maxprice",
                        parseFloat(e.target.value)
                      )
                    }
                    type="number"
                    className="w-full  p-1"
                    placeholder="100 TL"
                  />
                </div>
              </Accordion>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
