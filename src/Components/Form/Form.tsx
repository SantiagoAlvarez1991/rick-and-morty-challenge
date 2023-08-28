import { useAppContext } from '@/context/context'
import React, { FC, FormEvent, useEffect, useRef, useState } from 'react'
import Search from '../icons/Search';

interface Form {
    fetchNewCharacter: () => void;
    loading: boolean;
    currentCharacter: string
}

const Form: FC<Form> = ({ fetchNewCharacter, loading, currentCharacter }) => {

    const { typeNewCharacter, characterForSearch, resetPagination } = useAppContext()
    const [inputError, setInputError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const MINIMUM_OF_SEARCH = 2

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        resetPagination()
        if ((characterForSearch.length >= MINIMUM_OF_SEARCH) && (characterForSearch !== currentCharacter)) {
            fetchNewCharacter()
        }
        if (characterForSearch.length < MINIMUM_OF_SEARCH) {
            setInputError('Debes escribir 2 caracteres como mínimo'), inputRef.current?.focus()
        }
    }

    const validateInputError = () => {
        return !!inputError.length && (characterForSearch.length < MINIMUM_OF_SEARCH)
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <form
            className='w-full flex gap-2 justify-center px-7 pb-6 sm:w-3/5 lg:w-2/4 xl:w-full xl:p-0'
            onSubmit={(e) =>
                handleSubmit(e)}>            
                <div className='sm:basis-3/4'>
                    <input
                        className={`h-12 w-full  border-slate-600 border-2 px-5 py-2 rounded-full bg-slate-600 text-slate-200 focus:outline-none ${validateInputError() ? 'focus:border-orange-500' : 'focus:border-cyan-600'} focus:text-slate-200`}
                        type='text'
                        placeholder='Escribe su nombre'
                        onChange={(e) => typeNewCharacter(e.target.value)}
                        value={characterForSearch}
                        ref={inputRef}
                    />
                    {validateInputError()
                        ? <p className=' w-full text-xs pl-6 pt-2 text-orange-500'>{inputError}</p>
                        : <p className='w-full text-xs pl-6 pt-2 text-slate-400'>*2 caracteres como mínimo</p>
                    }
                </div>
                <button
                    className='flex justify-center items-center w-12 h-12 sm:basis-2/6 rounded-full grow-0 bg-cyan-600 py-2 px-2 text-slate-200 disabled:bg-slate-600 hover:bg-cyan-500 transition-all'
                    type='submit'>
                    <p className='hidden sm:block'>{loading ? 'Buscando...' : 'Buscar'}</p>
                    {loading ? <p className='w-6 sm:hidden'>...</p> : <Search className='w-6 sm:hidden' />}
                </button>
        </form>
    )
}

export default Form
