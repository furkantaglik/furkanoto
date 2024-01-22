"use server";
import { db } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs";

// araç işlemleri
export async function getAllCars() {
  try {
    const carsData = await db.Cars.findMany();
    revalidateTag("cars");
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
      createdAt,
      updatedAt,
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
    return true;
  } catch (error) {
    return console.error("Araç eklenirken bir hata oluştu: " + error.message);
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
    return true;
  } catch (error) {
    console.log("Araç silinirken bir hata oluştu: " + error.message);
    return false;
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
    return true;
  } catch (error) {
    console.error("Araç güncellenirken bir hata oluştu: " + error.message);
    return false;
  }
}

//  Öne çıkanlar
export async function getAllHighlights() {
  try {
    const highData = await db.Highlights.findMany();
    revalidateTag("highlights");
    return highData;
  } catch (error) {
    throw new Error("Öne çıkanlar getirilirken bir hata oluştu");
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
    return true;
  } catch (error) {
    return console.error(
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
    return true;
  } catch (error) {
    return console.error(
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
    return true;
  } catch (error) {
    return console.error(
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
    revalidateTag("saved");
    return savedCars;
  } catch (error) {
    console.error("kaydedilen araçlar getirilirken hata", error.message);
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
      revalidateTag("saved");
      return "Favorilerden kaldırıldı";
    } else if (existingSavedCar.length === 0) {
      await db.Saved.create({
        data: {
          userId: userId,
          carId: carId,
        },
      });
      revalidateTag("saved");
      return "Favorilere eklendi";
    }
    revalidateTag("saved");
  } catch (error) {
    return console.error("Araç kaydedilirken hata oluştu", error.message);
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
    console.error("kaydedilen araçlar işaretlenirken hata", error.message);
  }
}

//satın alınan işlemleri
export async function addPurchasedCar(userId, carId) {
  try {
    const isPurchased = await db.Purchased.findMany({
      where: {
        userId: userId,
        carId: carId,
      },
    });
    if (isPurchased.length === 0) {
      await db.Purchased.create({
        data: {
          userId: userId,
          carId: carId,
        },
      });
    }
    revalidateTag("purchased");
    return true;
  } catch (error) {
    return console.error(
      "Araç satın alınanlara eklenirken hata oluştu",
      error.message
    );
  }
}
export async function getPurchasedCar(userId) {
  try {
    const purchasedIds = await db.Purchased.findMany({
      where: {
        userId: userId,
      },
      select: {
        carId: true,
      },
    });
    const purchasedCars = await Promise.all(
      purchasedIds.map(async (purchasedId) => {
        const purchased = await db.Cars.findUnique({
          where: {
            id: purchasedId.carId,
          },
        });
        return purchased;
      })
    );
    revalidateTag("purchased");
    return purchasedCars;
  } catch (error) {
    console.error(
      "satın alınan araçlar getirilirken hata oluştu",
      error.message
    );
  }
}

// Arama fonksiyonu
export async function getSearchResults(searchValue) {
  try {
    if (searchValue.length < 3) {
      return [];
    }
    const carsData = await getAllCars();
    const lowercasedSearchValue = searchValue.trim().toLocaleLowerCase("tr");

    const filteredData = carsData.filter((car) => {
      const brandIncludesSearchValue = car.brand
        .trim()
        .toLocaleLowerCase("tr")
        .includes(lowercasedSearchValue);
      const modelIncludesSearchValue = car.model
        .trim()
        .toLocaleLowerCase("tr")
        .includes(lowercasedSearchValue);

      return brandIncludesSearchValue || modelIncludesSearchValue;
    });
    return filteredData;
  } catch (error) {
    console.error("Arama sonuçları getirilirken Hata Oluştu", error.message);
  }
}
// kullanıcı id getir
export async function getUserId() {
  const { userId } = auth();
  return userId;
}
