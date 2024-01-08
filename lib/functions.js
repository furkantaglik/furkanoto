"use server";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs";

// araç işlemleri
export async function getAllCars() {
  try {
    const carsData = await db.Cars.findMany();
    return carsData;
  } catch (error) {
    throw new Error("Araçlar getirilirken bir hata oluştu");
  }
}
export async function addCar(formData) {
  try {
    const {
      speed,
      price,
      year,
      engine,
      id,
      created_at,
      updated_at,
      ...remainingData
    } = formData;

    const parsedData = {
      speed: parseInt(speed),
      price: parseInt(price),
      year: parseInt(year),
      engine: parseFloat(engine),
      ...remainingData,
    };

    await db.Cars.create({
      data: parsedData,
    });

    revalidateTag("cars");
  } catch (error) {
    console.log("Araç eklenirken bir hata oluştu: " + error.message);
  }
}
export async function deleteCar(formData) {
  try {
    await db.Cars.delete({
      where: {
        id: formData.id,
      },
    });
    revalidateTag("cars");
  } catch (error) {
    console.log("Araç silinirken bir hata oluştu: " + error.message);
  }
}
export async function updateCar(formData) {
  try {
    const { speed, price, year, engine, ...remainingData } = formData;

    const parsedData = {
      speed: parseInt(speed),
      price: parseInt(price),
      year: parseInt(year),
      engine: parseFloat(engine),
      ...remainingData,
    };

    await db.Cars.update({
      where: {
        id: formData.id,
      },
      data: parsedData,
    });

    revalidateTag("cars");
  } catch (error) {
    console.log("Araç güncellenirken bir hata oluştu: " + error.message);
  }
}

//  Öne çıkanlar
export async function getAllHighlights() {
  try {
    const highData = await db.Highlights.findMany();
    return highData;
  } catch (error) {
    console.log(error);
  }
}
export async function addHighlight(formData) {
  try {
    const { id, ...remainingData } = formData;
    await db.Highlights.create({
      data: {
        ...remainingData,
      },
    });
    revalidateTag("highlights");
  } catch (error) {
    console.log(
      "Öne çıkarılanlara eklenirken bir hata oluştu: " + error.message
    );
  }
}
export async function deleteHighlight(formData) {
  try {
    await db.Highlights.delete({
      where: {
        id: formData.id,
      },
    });
    revalidateTag("highlights");
  } catch (error) {
    console.log(
      "Öne çıkarılanlardan silinirken bir hata oluştu: " + error.message
    );
  }
}
export async function updateHighlight(formData) {
  try {
    await db.Highlights.update({
      where: {
        id: formData.id,
      },
      data: formData,
    });
    revalidateTag("highlights");
  } catch (error) {
    console.log(
      "Öne çıkarılan güncellenirken bir hata oluştu: " + error.message
    );
  }
}

// kaydetme işlemleri
export async function getSavedCars(userId) {
  try {
    const savedCarIds = await db.Saved.findMany({
      where: {
        userId: userId,
      },
      select: {
        carId: true,
      },
    });
    const savedCars = await Promise.all(
      savedCarIds.map(async (savedCar) => {
        const car = await db.Cars.findUnique({
          where: {
            id: savedCar.carId,
          },
        });
        return car;
      })
    );

    return savedCars;
  } catch (error) {
    console.error(error);
  }
}
export async function setSavedCar(userId, carId) {
  try {
    const existingSavedCar = await db.Saved.findMany({
      where: {
        userId: userId,
        carId: carId,
      },
    });
    if (existingSavedCar.length > 0) {
      await db.Saved.deleteMany({
        where: {
          carId: carId,
          userId: userId,
        },
      });
    } else {
      await db.Saved.create({
        data: {
          userId: userId,
          carId: carId,
        },
      });
    }
    revalidateTag("saved");
  } catch (error) {
    console.error("Araç kaydedilirken hata oluştu", error);
  }
}
export async function savedStatus(userId, carId) {
  try {
    const isSaved = await db.Saved.findMany({
      where: {
        carId: carId,
        userId: userId,
      },
    });
    return isSaved.length > 0;
  } catch (error) {
    console.error(error);
  }
}

// Arama fonksiyonu
export async function getSearchResults(searchValue) {
  try {
    const carsData = await getAllCars();
    const filteredData = carsData.filter((car) => {
      const brandIncludesSearchValue = car.brand
        .trim()
        .toLocaleLowerCase("tr")
        .includes(searchValue.trim().toLocaleLowerCase("tr"));
      const modelIncludesSearchValue = car.model
        .trim()
        .toLocaleLowerCase("tr")
        .includes(searchValue.trim().toLocaleLowerCase("tr"));

      return (
        searchValue.length >= 2 &&
        (brandIncludesSearchValue || modelIncludesSearchValue)
      );
    });

    return filteredData;
  } catch (error) {
    console.error("Arama sonuçları getirilirken Hata Oluştu");
  }
}
// Tarihi normal hale çevir
export async function formatDate(seconds) {
  const unixMilliSeconds = seconds * 1000;
  const date = new Date(unixMilliSeconds);
  const formattedDate = date.toLocaleDateString("tr-TR");
  return formattedDate;
}
export async function getUserId() {
  const { userId } = auth();
  return userId;
}
