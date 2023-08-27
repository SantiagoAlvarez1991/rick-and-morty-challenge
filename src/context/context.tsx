import { FC, ReactNode, createContext, useContext, useState } from "react";

interface Provider {
    children: ReactNode
}

interface Context {
    resetPagination: () => void;
    increasePage: () => void;
    decreasePage: () => void;
    typeNewCharacter: (name: string) => void;
    getPageLimit: (characterCount: number) => void;
    pageLimit: number | null;
    currentPage: number;
    characterForSearch: string;
    offset: number;
    firstPage: number;
    ITEMS_PER_PAGE: number;
    characterCount: number;
    limit: number;
}

export const Context = createContext<Context | undefined>(undefined)

export const ContextProvider: FC<Provider> = ({ children }) => {

    const [characterForSearch, setCharacterForSearch] = useState<string>('')

    const ITEMS_PER_PAGE = 6
    const firstPage = 1
    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(ITEMS_PER_PAGE)
    const [pageLimit, setPageLimit] = useState<number | null>(null)
    const [characterCount, setCharacterCount] = useState<number>(0)

    const resetPagination = () => {
        setCurrentPage(1)
        setOffset(0)
        setLimit(ITEMS_PER_PAGE)
    }

    const getPageLimit = (characterCount: number) => {        
        characterCount && setPageLimit(Math.ceil(characterCount / ITEMS_PER_PAGE))
        setCharacterCount(characterCount)
    }

    const increasePage = () => {
        setLimit(prev => prev + ITEMS_PER_PAGE)
        setOffset(prev => prev + ITEMS_PER_PAGE)
        setCurrentPage(prev => prev + 1)
    }

    const decreasePage = () => {
        setLimit(prev => prev - ITEMS_PER_PAGE)
        setOffset(prev => prev - ITEMS_PER_PAGE)
        setCurrentPage(prev => prev - 1)
    }

    const typeNewCharacter = (name: string) => {
        setCharacterForSearch(name)
    }

    return (
        <Context.Provider value={{
            resetPagination,
            increasePage,
            decreasePage,
            typeNewCharacter,
            getPageLimit,
            pageLimit,
            currentPage,
            characterForSearch,
            offset,
            firstPage,
            ITEMS_PER_PAGE,
            characterCount,
            limit        
        }}>
            {children}
        </Context.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(Context)
    if (context === undefined) {
        throw new Error("El Contexto debe ser usado dentro de un Provider")
    }
    return context;
}