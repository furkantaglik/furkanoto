"use client"
import { CgProfile } from "react-icons/cg"
import SearchBar from "./SearchBar"
import Link from "next/link"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/Firebase";
import LoginForm from "./Loginform"
import { MdFavorite } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setIsLogin(true) : setIsLogin(false)
        });
    })

    const handleSignOut = () => {
        signOut(auth)
    }
    return (
        <>
            <header className="sticky top-0 z-20 flex items-center max-w-screen-2xl px-2 md:px-10 py-3 mx-auto bg-black text-white border-b-2 border-gray-500 w-full">
                <div className="w-1/3 flex justify-start">
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                </div>
                <Link href="/" className="flex flex-col items-center justify-center w-1/3">
                    <img
                        className="w-[40px]"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png" alt="" />
                    <h1 className="font-medium text-lg hidden md:block">Furkan Otomotiv</h1>
                </Link>
                <div className="w-1/3 items-center flex justify-end">
                    <button onClick={(() => setOpenModal(!openModal))} className="hover:bg-neutral-800 p-2">
                        <CgProfile className="text-2xl" />
                    </button>
                    {isLogin === true && openModal === true && (
                        <>
                            <div className="hidden text-center cursor-pointer font-bold absolute gap-y-2 top-24 right-0 z-20 w-40 md:grid items-center justify-center p-1 max-w-screen-2xl mx-auto bg-neutral-800 text-white">
                                <Link className="border-b hover:text-blue-500 flex items-center" href="/Saved"><MdFavorite /> Favoriler</Link>
                                <button className="border-b hover:text-blue-500 flex items-center" onClick={handleSignOut}><RiLogoutBoxFill /> Çıkış Yap</button>
                            </div>
                        </>

                    )}
                </div>
            </header>
            {isLogin === true && openModal === true && (
                <div className="md:hidden sticky font-bold  top-16 z-20 flex items-center justify-between p-3 max-w-screen-2xl mx-auto bg-neutral-800 text-white">
                    <button className="border-b hover:text-blue-500 flex items-center" onClick={handleSignOut}><RiLogoutBoxFill /> Çıkış Yap</button>
                    <Link className="border-b hover:text-blue-500 flex items-center" href="/Saved"><MdFavorite /> Favoriler</Link>
                    <h1>Dahası</h1>
                </div>
            )}
            {!isLogin && openModal && (
                <>

                    <LoginForm />
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 z-20"
                        onClick={() => setOpenModal(false)}
                    />
                </>
            )}
        </>
    )
}

export default Header