import { useAppContext } from '@/context/context'
import { FC, useState } from 'react'

interface Pagination {
    fetchNewCharacter: () => void
}

const Pagination: FC<Pagination> = ({ fetchNewCharacter }) => {

    const API_ITEMS_PER_PAGE = 20

    const { increasePage, decreasePage, currentPage, pageLimit, ITEMS_PER_PAGE } = useAppContext()   
    const [charactersForRender, setCharactersForRender] = useState(API_ITEMS_PER_PAGE - ITEMS_PER_PAGE)

    const handleNext = () => {
        increasePage()
        setCharactersForRender(charactersForRender - ITEMS_PER_PAGE)
        if(charactersForRender < ITEMS_PER_PAGE){
            setCharactersForRender((charactersForRender + API_ITEMS_PER_PAGE) - ITEMS_PER_PAGE)
            fetchNewCharacter()
        }
    }
    
    const handlePrev = () => {
        decreasePage()
    }

    return (
        <div>
            <button disabled={currentPage <= 1} onClick={() => handlePrev()}>anterior</button>
            <button disabled={pageLimit === currentPage} onClick={() => handleNext()}>siguiente</button>
        </div>
    )
}

export default Pagination
