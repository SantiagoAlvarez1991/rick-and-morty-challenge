import { useAppContext } from '@/context/context'
import React, { FC, FormEvent } from 'react'

interface Form {    
    fetchNewCharacter: () => void;
}

const Form : FC<Form> = ({fetchNewCharacter}) => {

    const {typeNewCharacter, characterForSearch, resetPagination} = useAppContext()
    const MINIMUN_OF_SEARCH = 2

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        resetPagination()
        characterForSearch.length >= MINIMUN_OF_SEARCH            
            ? fetchNewCharacter()
            : alert("Deben ser más de 2 letras")
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type='text'
                placeholder='Escribe el nombre del personaje'
                onChange={(e) => typeNewCharacter(e.target.value)}
                value={characterForSearch}
            />
            <button type='submit'>Buscar</button>
        </form>
    )
}

export default Form
