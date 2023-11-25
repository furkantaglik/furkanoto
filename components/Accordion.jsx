import { useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
const Accordion = ({ title, children }) => {
    const [openAcMenu, setOpenAcMenu] = useState(false);
    return (
        <section>
            <button
                onClick={() => setOpenAcMenu(!openAcMenu)}
                className='text-xl font-bold flex items-center p-1 w-full justify-between hover:bg-stone-200 '
            >
                {title}
                <span> {openAcMenu ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</span>
            </button>
            {openAcMenu &&
                <div className='border border-gray-300 pl-3'>
                    {children}
                </div>
            }
        </section>
    )
}

export default Accordion