"use client"
import { useState, useEffect } from 'react';
import { addHighlightsData, deleteHighlightsData, updateHighlightsData, getHighlightsData } from '@/utils/helpers/Datafetcher';

const initialFormState = {
    title: '',
    description: '',
    url: '',
    image: ''
};

const Highlights = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [highlightsData, setHighlightsData] = useState([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            const data = await getHighlightsData();
            setHighlightsData(data);
        }
        fetchData();
    }, [highlightsData]);

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
        <section className=' max-w-screen-2xl mx-auto'>
            {/* Durum mesajı */}

            {message && (
                <div className="text-center mt-5 me-5">
                    <div className="font-mono rounded-lg bg-gray-800 inline-block text-white p-2">
                        {message}
                    </div>
                </div>
            )}

            {/* Kontroller  */}

            <div className='grid grid-cols-3 mx-auto md:w-2/3 gap-x-5 gap-y-5 lg:gap-y-0 p-3 my-10 bg-gray-300 rounded-lg font-bold'>
                <button
                    onClick={() => addHighlightsData(formData, setMessage)}
                    className=' py-3 bg-black text-white'>
                    EKLE
                </button>
                <button
                    onClick={() => deleteHighlightsData(formData, setMessage)}
                    className=' py-3   bg-black text-white'>
                    SİL
                </button>
                <button
                    onClick={() => updateHighlightsData(formData, setMessage)}
                    className=' py-3   bg-black text-white'>
                    GÜNCELLE
                </button>
            </div>

            <form className="grid grid-cols-2 h-fit  md:grid-cols-4 mx-auto gap-y-8 gap-x-5 p-5  bg-neutral-300 rounded-lg font-bold mb-10">
                <div className="">
                    <label className="block mb-2 font-semibold" htmlFor='title'>Başlık </label>
                    <input type="text" id='title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                </div>
                <div className="">
                    <label className="block mb-2 font-semibold" htmlFor='url'>Hedef Url </label>
                    <input type="text" id='url' onChange={(e) => setFormData({ ...formData, url: e.target.value })} value={formData.url} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                </div>

                <div className="">
                    <label className="block mb-2 font-semibold" htmlFor='resim'>Görsel url</label>
                    <input type="text" id='resim' onChange={(e) => setFormData({ ...formData, image: e.target.value })} value={formData.image} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                </div>
                <div className="">
                    <label className="block mb-2 font-semibold" htmlFor='description'>Açıklama </label>
                    <input type="text" id='description' onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} className="w-full border rounded px-2 py-1 text-black" placeholder="Buraya yaz." />
                </div>
            </form>


            <aside className="bg-slate-200 p-3 rounded-md">
                <h2 className='text-xl font-bold text-center mb-5'>Öne Çıkanlar</h2>
                <div className='flex space-x-16 overflow-x-auto'>
                    {highlightsData.map((high, index) => (
                        <>

                            <div className='flex-none w-64 ' key={high.id}>
                                <button
                                    onClick={() => { setFormData(high) }}
                                    className='py-1 px-10 w-full text-center bg-gray-600 hover:bg-gray-500 text-white font-semibold'>
                                    Düzenle
                                </button>
                                <img src={high.image} alt={high.title} />
                                <div className='border-4 p-3'>
                                    <h1 className='text-xl font-bold mb-2'>{high.title}</h1>
                                    <p className='font-lg'>{high.description}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </aside>

        </section>
    )
}

export default Highlights