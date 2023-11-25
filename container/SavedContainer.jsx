import Maincars from "@/components/Maincars"

const SavedContainer = ({ savedİnfo }) => {
  return (
    <section className="mt-16 max-w-screen-2xl mx-auto" style={{marginBottom:"162px"}}>
      <div className="md:mx-20 mx-2" >
        <h1 className='md:text-3xl text-xl font-bold'>Kaydedilenler</h1>
        <p className=" border-b-4 border-blue-500 text-lg">{savedİnfo.length} sonuç Bulundu</p>
      </div>
      <Maincars carsinfo={savedİnfo} />
    </section>
  )
}

export default SavedContainer