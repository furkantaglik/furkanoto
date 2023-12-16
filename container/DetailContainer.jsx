"use client"
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs"
import { FaShareAlt } from "react-icons/fa";

const DetailContainer = ({ detailinfo }) => {

    const handleShare = () => {
        const shareUrl = window.location.href;
        copyToClipboard(shareUrl);
        alert("Bağlantı Kopyalandı")
    }

    const copyToClipboard = (text) => {
        const textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };


    return (
        <div className='max-w-screen-xl mx-auto mt-20 mb-52'>
            <div className='grid grid-cols-1  md:grid-cols-3 justify-center mx-auto w-fit border-b-2 border-gray-700'>
                <img src={detailinfo.image1} alt="" style={{ width: "400px", height: "200px" }} />
                <img src={detailinfo.image2} alt="" style={{ width: "400px", height: "200px" }} />
                <img src={detailinfo.image3} alt="" style={{ width: "400px", height: "200px" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 mt-5 mx-auto w-full p-5 justify-center gap-y-5 border-b-2 border-gray-700">
                <div className='text-md grid gap-y-5 font-bold uppercase mx-3 md:mx-1'>
                    <h2>Marka</h2>
                    <h2>Model</h2>
                    <h2>Yakıt</h2>
                    <h2>Gövde</h2>
                    <h2>Vites</h2>
                </div>
                <div className='text-md grid gap-y-5'>
                    <span>{detailinfo.brand}</span>
                    <span>{detailinfo.model}</span>
                    <span>{detailinfo.fuel}</span>
                    <span>{detailinfo.body}</span>
                    <span>{detailinfo.gear}</span>
                </div>
                <div className='text-md grid gap-y-5 font-bold uppercase mx-3 md:mx-1'>
                    <h2>Renk</h2>
                    <h2>Motor</h2>
                    <h2>Yıl</h2>
                    <h2>Fiyat</h2>
                </div>
                <div className='text-md grid  gap-y-5'>
                    <span>{detailinfo.color}</span>
                    <span>{detailinfo.engine}</span>
                    <span>{detailinfo.year}</span>
                    <span>{detailinfo.price} ₺</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={handleShare}
                    className="font-bold flex text-white rounded-lg items-center gap-x-2 p-2 mt-4 bg-blue-800 hover:bg-blue-900" >
                    <FaShareAlt /> Paylaş
                </button>

                <Link href="https://wa.me/15551234567" className="font-bold flex text-white rounded-lg items-center gap-x-2 p-2 mt-4 bg-green-800 hover:bg-green-900" >
                    <BsWhatsapp /> İletişim
                </Link>
            </div>
        </div>
    )
}

export default DetailContainer