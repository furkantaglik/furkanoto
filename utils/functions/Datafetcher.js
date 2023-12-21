import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  Timestamp,
  query,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import carsData from "@/mocks/cars.json";
import highData from "@/mocks/highlights";

// araç işlemleri
export async function getAllCars() {
  try {
    // const collectionRef = collection(db, "cars");
    // const querySnapshot = await getDocs(collectionRef);
    // const carsData = querySnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    return carsData;
  } catch (error) {
    console.log(error);
  }
}
export async function addCar(formData, setMessage) {
  try {
    const { id, created_at, updated_at, ...remainingData } = formData;
    remainingData.created_at = Timestamp.now();

    const docRef = collection(db, "cars");
    await addDoc(docRef, remainingData);

    setMessage("Araç eklendi");
  } catch (error) {
    setMessage("Araç eklenirken bir hata oluştu: " + error.message);
  }
}
export async function deleteCar(formData, setMessage) {
  try {
    const docRef = doc(db, "cars", formData.id);
    await deleteDoc(docRef, formData);

    setMessage("Araç Silindi.");
  } catch (error) {
    setMessage("Araç silinirken bir hata oluştu: " + error.message);
  }
}
export async function updateCar(formData, setMessage) {
  try {
    formData.updated_at = Timestamp.now();
    const docRef = doc(db, "cars", formData.id);
    await updateDoc(docRef, formData);

    setMessage("Araç güncellendi.");
  } catch (error) {
    setMessage("Araç güncellenirken bir hata oluştu: " + error.message);
  }
}

//  Öne çıkanlar
export async function getAllHighlights() {
  try {
    // const collectionRef = collection(db, "highlights");
    // const querySnapshot = await getDocs(collectionRef);
    // const highData = querySnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    return highData;
  } catch (error) {
    console.log(error);
  }
}
export async function addHighlight(formData, setMessage) {
  try {
    const { id, ...remainingData } = formData;
    const docRef = collection(db, "highlights");
    await addDoc(docRef, remainingData);

    setMessage("Öne çıkarılanlara eklendi");
  } catch (error) {
    setMessage(
      "Öne çıkarılanlara eklenirken bir hata oluştu: " + error.message
    );
  }
}
export async function deleteHighlight(formData, setMessage) {
  try {
    const docRef = doc(db, "highlights", formData.id);
    await deleteDoc(docRef, formData);

    setMessage("Öne çıkarılanlardan Silindi.");
  } catch (error) {
    setMessage(
      "Öne çıkarılanlardan silinirken bir hata oluştu: " + error.message
    );
  }
}
export async function updateHighlight(formData, setMessage) {
  try {
    const docRef = doc(db, "highlights", formData.id);
    await updateDoc(docRef, formData);

    setMessage("Öne çıkarılan güncellendi.");
  } catch (error) {
    setMessage(
      "Öne çıkarılan güncellenirken bir hata oluştu: " + error.message
    );
  }
}

// kaydetme işlemleri
export async function getSavedCars(userId) {
  try {
    const savedCollectionRef = collection(db, "saved");
    const savedQuery = query(savedCollectionRef, where("userId", "==", userId));
    const savedSnapshot = await getDocs(savedQuery);
    const carIds = savedSnapshot.docs.map((doc) => doc.data().carId);

    const carsData = await getAllCars();
    const savedCars = carsData.filter((car) =>
      carIds.some((id) => id.includes(car.id))
    );
    return savedCars;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function setSavedCar(userId, carId) {
  const savedCollectionRef = collection(db, "saved");

  const savedDocRef = doc(savedCollectionRef, `${userId}_${carId}`);
  const docSnapshot = await getDoc(savedDocRef);

  if (!docSnapshot.exists()) {
    await setDoc(savedDocRef, {
      userId: userId,
      carId: carId,
    });
  } else {
    await deleteDoc(savedDocRef);
  }
}
export async function savedStatus(userId, carId) {
  try {
    const savedCollectionRef = collection(db, "saved");
    const savedQuery = query(
      savedCollectionRef,
      where("userId", "==", userId),
      where("carId", "==", carId)
    );
    const savedSnapshot = await getDocs(savedQuery);

    return savedSnapshot.size > 0;
  } catch (error) {
    console.error(error);
    throw error;
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
    setMessage("Bir Hata Oluştu");
  }
}

// Tarihi normal hale çevir
export function formatDate(seconds) {
  const unixMilliSeconds = seconds * 1000;
  const date = new Date(unixMilliSeconds);
  const formattedDate = date.toLocaleDateString("tr-TR");
  return formattedDate;
}
