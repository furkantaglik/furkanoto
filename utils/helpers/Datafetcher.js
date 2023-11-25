import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc, Timestamp, query, where, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
// import carsData from "@/mocks/cars.json"


//ana fonksiiyonlar
export async function getAllData() {    
    try {
        const collectionRef = collection(db, "cars");
        const querySnapshot = await getDocs(collectionRef);
        const carsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return carsData;

    } catch (error) {
        console.log(error);
    }

}
export async function getHighlightsData() {
    try {
        const collectionRef = collection(db, "highlights");
        const querySnapshot = await getDocs(collectionRef);
        const highData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return highData;

    } catch (error) {
        console.log(error);
    }

}
export async function getSearchResults(searchValue) {
    try {
        const carsData = await getAllData();
        const filteredData = carsData.filter((car) => {
            const brandIncludesSearchValue = car.brand.trim().toLocaleLowerCase('tr').includes(searchValue.trim().toLocaleLowerCase('tr'));
            const modelIncludesSearchValue = car.model.trim().toLocaleLowerCase('tr').includes(searchValue.trim().toLocaleLowerCase('tr'));

            return searchValue.length >= 2 && (brandIncludesSearchValue || modelIncludesSearchValue);
        });

        return filteredData;
    } catch (error) {
        setMessage("Bir Hata Oluştu");
    }
}
export async function getSavedCars(userId) {
    try {
        const savedCollectionRef = collection(db, 'saved');
        const savedQuery = query(savedCollectionRef, where('userId', '==', userId));
        const savedSnapshot = await getDocs(savedQuery);
        const carIds = savedSnapshot.docs.map((doc) => doc.data().carId);

        console.log(carIds);
        console.log(await getAllData())

        const carsData = await getAllData();

        const savedCars = carsData.filter((car) => carIds.some((id) => id.includes(car.id)));
        // const savedCars = (await getAllData()).filter((car) => carIds[car].includes(car.id));
        console.log(savedCars)

        return savedCars;
    } catch (error) {
        console.error('hata:', error);
        throw error;
    }
}
export async function setSavedCars(userId, carId) {
    const savedCollectionRef = collection(db, 'saved');

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
        const savedCollectionRef = collection(db, 'saved');
        const savedQuery = query(savedCollectionRef, where('userId', '==', userId), where('carId', '==', carId));
        const savedSnapshot = await getDocs(savedQuery);

        return savedSnapshot.size > 0;
    } catch (error) {
        console.error('Hata:', error);
        throw error;
    }
}


// admin işlemleri
export async function addData(formData, setMessage) {
    try {
        const { id, created_at, updated_at, ...remainingData } = formData;
        remainingData.created_at = Timestamp.now()

        const docRef = collection(db, "cars")
        await addDoc(docRef, remainingData)

        setMessage("Veri başarıyla eklendi");
    } catch (error) {
        setMessage("Veri eklenirken bir hata oluştu: " + error.message);
    }
}

export async function deleteData(formData, setMessage) {
    try {
        const docRef = doc(db, "cars", formData.id);
        await deleteDoc(docRef, formData);

        setMessage("Veri başarıyla Silindi.");
    } catch (error) {
        setMessage("Veri silinirken bir hata oluştu: " + error.message);
    }
}

export async function updateData(formData, setMessage) {
    try {
        formData.updated_at = Timestamp.now();
        const docRef = doc(db, "cars", formData.id);
        await updateDoc(docRef, formData);

        setMessage("Veri başarıyla güncellendi.");
    } catch (error) {
        setMessage("Veri güncellenirken bir hata oluştu: " + error.message);
    }
}

// admin Öne çıkanlar
export async function addHighlightsData(formData, setMessage) {
    try {
        const { id, ...remainingData } = formData;
        const docRef = collection(db, "highlights")
        await addDoc(docRef, remainingData)

        setMessage("Veri başarıyla eklendi");
    } catch (error) {
        setMessage("Veri eklenirken bir hata oluştu: " + error.message);
    }
}

export async function deleteHighlightsData(formData, setMessage) {
    try {
        const docRef = doc(db, "highlights", formData.id);
        await deleteDoc(docRef, formData);

        setMessage("Veri başarıyla Silindi.");
    } catch (error) {
        setMessage("Veri silinirken bir hata oluştu: " + error.message);
    }
}

export async function updateHighlightsData(formData, setMessage) {
    try {
        const docRef = doc(db, "highlights", formData.id);
        await updateDoc(docRef, formData);

        setMessage("Veri başarıyla güncellendi.");
    } catch (error) {
        setMessage("Veri güncellenirken bir hata oluştu: " + error.message);
    }
}

//tarihi normal hale çevir
export function formatDate(seconds) {
    const unixMilliSeconds = seconds * 1000;
    const date = new Date(unixMilliSeconds);
    const formattedDate = date.toLocaleDateString("tr-TR");
    return formattedDate;
}