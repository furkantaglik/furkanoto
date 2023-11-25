"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [change, setChange] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter()


    const isEmailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }

    const handleSignUp = () => {
        if (!isEmailValid(email)) {
            setErrorMessage("Geçerli bir e-posta adresi girin.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Şifre en az 6 karakter olmalıdır.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCblueential) => {
                router.refresh()
            })
            .catch((error) => {
                setErrorMessage("Geçersiz e-posta veya şifre.");
            });
    }

    const handleSignIn = () => {
        if (!isEmailValid(email)) {
            setErrorMessage("Geçerli bir e-posta adresi girin.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Şifre en az 6 karakter olmalıdır.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCblueential) => {
                router.refresh()

            })
            .catch((error) => {
                setErrorMessage("Geçersiz e-posta veya şifre.");
            })
    }

    return (
        <section className='fixed top-1/2 left-1/2 gap-x-2 transform -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 z-30  rounded-md py-5 px-2 w-80 mx-auto md:w-1/3 bg-black text-center font-bold text-white'>
            <div className="">
                <img src="https://static.vecteezy.com/system/resources/previews/023/977/557/large_2x/front-view-dark-silhouette-of-a-modern-sport-black-car-isolated-on-black-background-ai-generated-free-photo.jpg" alt="" srcset="" />
            </div>
            <div className="grid grid-cols-1 gap-y-5">
                <label htmlFor="email" className='text-start'>E-posta</label>
                <input type='email' name="email" className=' p-1  bg-transparent border-b'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} autoComplete="on"
                />

                <label htmlFor="password" className='text-start'>Şifre</label>
                <input type="password" name="password" className=' p-1 bg-transparent border-b'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} autoComplete="on"
                />

                {errorMessage && <p className="text-blue-500">{errorMessage}</p>}

                {change ?
                    <button type="button" className='text-white bg-blue-600 hover:bg-blue-700  p-1' onClick={handleSignUp}>Kayıt Ol</button>
                    :
                    <button type="button" className='text-white bg-blue-600 hover:bg-blue-700  p-1' onClick={handleSignIn}>Giriş Yap</button>
                }
                <span className=' text-gray-400'>Ya Da</span>
                <button
                    onClick={() => setChange(!change)}
                    className='text-white bg-stone-600 hover:bg-stone-500  cursor-pointer  p-1'>
                    {!change ? "Kayıt Ol" : "Giriş Yap"}
                </button>
            </div>
        </section>
    )
}
