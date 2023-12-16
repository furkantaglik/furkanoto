import Maincars from "@/components/Maincars"
import Link from "next/link"

const SavedContainer = ({ savedİnfo }) => {
  return (
    <section className=" max-w-screen-2xl mx-auto mt-20 mb-96">
      {
        savedİnfo.length > 0 ?
          (
            <>
              <div className="md:mx-20 mx-2" >
                <h1 className='md:text-3xl text-xl font-bold'>Favoriler</h1>
                <p className=" border-b-4 border-blue-800 text-lg">{savedİnfo.length} sonuç Bulundu</p>
              </div>
              <Maincars carsinfo={savedİnfo} />
            </>


          ) :
          (
            <div className=" flex flex-col  justify-center items-center md:mx-auto border border-slate-500 w-fit px-10 py-20 mx-5" >
              <h1 className="text-2xl font-medium text-center mb-20">"Henüz Favori Araçlarınız Bulunmuyor hemen favorilemeyi deneyin"</h1>
              <Link href="/" className="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-sm font-bold">AnaSayfa'ya Dön</Link>
            </div>
          )
      }

    </section>
  )
}

export default SavedContainer