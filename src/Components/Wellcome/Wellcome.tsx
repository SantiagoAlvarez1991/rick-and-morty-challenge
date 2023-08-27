import CharacterList from '@/Components/Character/CharacterList';
import Form from '@/Components/Form/Form';
import Pagination from '@/Components/Pagination/Pagination';
import { useAppContext } from '@/context/context';
import useCharacter from '@/hooks/useCharacter';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';

const Wellcome = () => {
    const { fetchCharacter, dataForRender, generalInformation, error, loading, variables} = useCharacter()
    const { characterForSearch, firstPage } = useAppContext()

    return (
        <>
            <header className='flex flex-col justify-center items-center w-full gap-3 bg-slate-800 '>
                <div className='w-3/4 h-32 relative mt-10'>
                    <Image className=' object-contain' src='/Rick-And-Morty-Logo.png' alt='Rick-And-Morty-Logo' fill sizes='700vw, (min-width: 768px) 40vw' priority />
                </div>
                <h1 className=' text-xl font-light text-cyan-500 '>Busca tu personaje favorito</h1>
                <Form
                    fetchNewCharacter={() => fetchCharacter(characterForSearch, firstPage)}   
                    loading={loading}  
                    currentCharacter={variables?.nameToSearch}               
                />
            </header>
            <main className='flex flex-col justify-center items-center w-full p-7'>
                <div className='w-full flex items-center justify-center' id={variables?.nameToSearch} >
                    {loading  && <div className=' xl:pt-20'><Spinner /></div> }
                    {(!loading && !!dataForRender.length) && <CharacterList data={dataForRender}/>}
                    {error && <p>Error : {error.message}</p>}
                    {(!loading && generalInformation?.count === null) && <p className='self-center'>No encontramos el personaje buscabas</p>}
                </div>
                {!!dataForRender.length &&
                    <Pagination fetchNewCharacter={() => generalInformation?.next !== null && fetchCharacter(characterForSearch, generalInformation?.next)} />
                }
            </main>
        </>
    )
}

export default Wellcome
