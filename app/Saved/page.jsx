"use client"
import SavedContainer from '@/container/SavedContainer';
import { getSavedCars, } from '@/utils/helpers/Datafetcher';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/Firebase';
import { useEffect, useState } from 'react';

const Page = () => {
    const [savedCars, setSavedCars] = useState([]);

    useEffect(() => {
        const fetchSavedCars = async (user) => {
            try {
                const cars = await getSavedCars(user.uid);
                setSavedCars(cars);
            } catch (error) {
               
            }
        };

        const user = auth.currentUser;
        if (user) {
            fetchSavedCars(user);
        }

    }, [savedCars]);

    return (
        <SavedContainer savedİnfo={savedCars} />
    )
};

export default Page;
