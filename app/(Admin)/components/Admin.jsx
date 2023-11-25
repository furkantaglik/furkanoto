"use client"
import { useState, useEffect } from 'react';
import { addData, deleteData, updateData, getAllData, formatDate } from '@/utils/functions/Datafetcher'

const initialFormState = {
    brand: 'Mercedes',
    model: '',
    fuel: 'Benzin',
    body: 'Hatchback',
    gear: 'Manuel',
    color: 'Siyah',
    engine: '',
    year: '',
    price: '',
    image1: '',
    image2: '',
    image3: '',
    description: ''
};

const Admin = () => {
    const [openSideBar, setOpenSideBar] = useState(false)
    const [formData, setFormData] = useState(initialFormState);
    const [carsData, setCarsData] = useState([])
    const [message, setMessage] = useState('');

    // Veriler çekilir ve izlenir
    useEffect(() => {
        async function fetchData() {
            const data = await getAllData();
            setCarsData(data);
        }
        fetchData();
    }, [carsData]);

    //durum mesajının süresi
    useEffect(() => {
        let timer;

        if (message) {
            timer = setTimeout(() => {
                setMessage('');
            }, 5000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    return (
        <section className='max-w-screen-xl mx-auto'>
            {/* Durum mesajı */}

            {message && (
                <div className="text-center mt-5 me-5">
                    <div className="font-mono rounded-lg bg-gray-800 inline-block text-white p-2">
                        {message}
                    </div>
                </div>
            )}

            {/* Kontroller  */}

            <div className='grid grid-cols-2 md:grid-cols-3 mx-auto md:w-2/3 gap-x-5 gap-y-5 lg:gap-y-0 p-3 my-10 bg-gray-300 rounded-lg font-bold'>
                <button
                    onClick={() => addData(formData, setMessage)}
                    className=' py-3  text-green-600 hover:text-green-500 bg-black'>
                    EKLE
                </button>
                <button
                    onClick={() => deleteData(formData, setMessage)}
                    className=' py-3  text-red-600 hover:text-red-500 bg-black'>
                    SİL
                </button>
                <button
                    onClick={() => updateData(formData, setMessage)}
                    className=' py-3  text-cyan-600 hover:text-cyan-500 bg-black'>
                    GÜNCELLE
                </button>

                <button
                    onClick={() => setOpenSideBar(!openSideBar)}
                    type="button"
                    className=" py-3 text-white bg-black md:hidden"
                >
                    {openSideBar ? 'Close' : 'Open'}
                </button>
            </div>

            <div className='grid grid-cols-6 gap-x-2'>
                {/* Side bar */}

                <aside className={`h-full absolute md:relative  md:col-span-2 transition-transform  ${openSideBar ? '-translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="h-full px-3 py-4 overflow-y-auto text-white bg-gray-800 rounded-lg">
                        <ul className="space-y-2">
                            {carsData.map((car, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => { setFormData(car); setOpenSideBar(false) }}
                                        className="flex justify-between items-center p-1 border-b hover:text-black w-full rounded-lg hover:bg-gray-300 group"
                                    >
                                        <span className="font-bold">{index}</span>
                                        <span className="ml-3 ">{car.brand}: {car.model}</span>
                                        <img src={car.image1} className='w-[100px]' alt="" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Form */}

                <form className="grid grid-cols-2 h-fit col-span-6 md:col-span-4 md:grid-cols-3 mx-auto gap-y-8 gap-x-5 p-5  bg-neutral-300 rounded-lg font-bold">
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='marka'>Marka</label>
                        <select
                            id='marka'
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            value={formData.brand} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz.">
                            <option value="Mercedes">Mercedes</option>
                            <option value="Bmw">Bmw</option>
                            <option value="Audi">Audi</option>
                            <option value="Renault">Renault</option>
                            <option value="Ford">Ford</option>
                            <option value="Fiat">Fiat</option>
                            <option value="Toyota">Toyota</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='model'>Model</label>
                        <input type="text" id='model' onChange={(e) => setFormData({ ...formData, model: e.target.value })} value={formData.model} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='yakit'>Yakıt</label>
                        <select
                            id='yakit'
                            onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                            value={formData.fuel} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz.">
                            <option value="Benzin">Benzin</option>
                            <option value="Dizel">Dizel</option>
                            <option value="Elektrik">Elektrik</option>
                            <option value="Hibrit">Hibrit</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='govde'>Gövde</label>
                        <select
                            id='govde'
                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            value={formData.body} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz.">
                            <option value="Hatchback">HatchBack</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Suv">Suv</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Pickup">Pickup</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='vites'>Vites</label>
                        <select
                            id='vites'
                            onChange={(e) => setFormData({ ...formData, gear: e.target.value })}
                            value={formData.gear} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz.">
                            <option value="Manuel">Manuel</option>
                            <option value="Otomatik">Otomatik</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='renk'>Renk</label>
                        <select
                            id='renk'
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            value={formData.color} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz.">
                            <option value="Siyah">Siyah</option>
                            <option value="Beyaz">Beyaz</option>
                            <option value="Gri">Gri</option>
                            <option value="Mavi">Mavi</option>
                            <option value="Kırmızı">Kırmızı</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='motor'>Motor</label>
                        <input type="text" id='motor' onChange={(e) => setFormData({ ...formData, engine: e.target.value })} value={formData.engine} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='year'>Yıl</label>
                        <input type="text" id='year' onChange={(e) => setFormData({ ...formData, year: e.target.value })} value={formData.year} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='fiyat'>Fiyat</label>
                        <input type="text" id='fiyat' onChange={(e) => setFormData({ ...formData, price: e.target.value })} value={formData.price} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='resim1'>Resim 1</label>
                        <input type="text" id='resim1' onChange={(e) => setFormData({ ...formData, image1: e.target.value })} value={formData.image1} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='resim2'>Resim 2</label>
                        <input type="text" id='resim2' onChange={(e) => setFormData({ ...formData, image2: e.target.value })} value={formData.image2} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='resim3'>Resim 3</label>
                        <input type="text" id='resim3' onChange={(e) => setFormData({ ...formData, image3: e.target.value })} value={formData.image3} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="md:col-span-3 col-span-2">
                        <label className="block mb-2 font-semibold" htmlFor='açiklama'>Açıklama</label>
                        <textarea type="text" id='açiklama' onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='created_at'>Oluşturma Tarihi</label>
                        <input type="text" id='created_at' value={formatDate(formData.created_at?.seconds) ?? ''} readOnly className="w-full border bg-neutral-400 rounded px-2 py-1 text-black" />
                    </div>
                    <div className="">
                        <label className="block mb-2 font-semibold" htmlFor='updated_at'>Düzenlenme Tarihi</label>
                        <input type="text" id='updated_at' value={formatDate(formData.updated_at?.seconds) ?? ''} readOnly className="w-full border bg-neutral-400 rounded px-2 py-1 text-black" />
                    </div>
                </form>
            </div>

        </section>
    )
}

export default Admin