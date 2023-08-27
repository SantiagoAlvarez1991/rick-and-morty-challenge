import { useAppContext } from '@/context/context'
import { FC, useState } from 'react'
import LeftArrow from '../icons/LeftArrow'
import RightArrow from '../icons/RightArrow'

interface Pagination {
    fetchNewCharacter: () => void
}

const Pagination: FC<Pagination> = ({ fetchNewCharacter }) => {

    const API_ITEMS_PER_PAGE = 20

    const { increasePage, decreasePage, currentPage, pageLimit, ITEMS_PER_PAGE, characterCount , limit} = useAppContext()
    const [charactersForRender, setCharactersForRender] = useState(API_ITEMS_PER_PAGE - ITEMS_PER_PAGE)
    const [alreadyVisitedPages, setAlreadyVisitedPages] = useState([1])

    const handleNext = () => {
        increasePage()
        setCharactersForRender(charactersForRender - ITEMS_PER_PAGE)

        let nextPage = currentPage + 1
        if (!alreadyVisitedPage(nextPage)) {
            setAlreadyVisitedPages(current => [...current, nextPage])
        }

        if (charactersForRender < ITEMS_PER_PAGE && lastPageNeedsAnotherCall(limit, charactersForRender, characterCount) && !alreadyVisitedPage(nextPage)) {            
            setCharactersForRender((charactersForRender + API_ITEMS_PER_PAGE) - ITEMS_PER_PAGE)
            fetchNewCharacter()
            console.log('API call necesario');            
        }
    }

    const lastPageNeedsAnotherCall = (limit: number, charactersForRender: number, characterCount:number) : boolean => {
        return (limit + charactersForRender) < characterCount
    }

    const alreadyVisitedPage = (nextPage: number) : boolean => {
        return alreadyVisitedPages.some(page => page === nextPage)
    }
    
    const handlePrev = () => {
        decreasePage()
        setCharactersForRender(charactersForRender + ITEMS_PER_PAGE)
    }

    return (
        <div className='flex justify-center items-center gap-3 mt-4 sm:self-end'>
            {currentPage > 1
                && <LeftArrow
                    onClick={() => handlePrev()}
                    className='rounded-full bg-cyan-600 py-2 text-slate-200 disabled:bg-slate-600 w-14 px-4 hover:-translate-x-0.5 cursor-pointer transition-all'
                />}

            <p className='text-sm'>Página {currentPage} de {pageLimit}</p>
            {pageLimit && ( currentPage < pageLimit)
                && <RightArrow
                    onClick={() => handleNext()}
                    className='rounded-full bg-cyan-600 py-2 text-slate-200 disabled:bg-slate-600 w-14 px-4 hover:translate-x-0.5 cursor-pointer transition-all'                
                />
            }           
        </div>
    )
}

export default Pagination
