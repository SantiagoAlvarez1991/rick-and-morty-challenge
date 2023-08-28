import CharacterList from '@/Components/Character/CharacterList';
import Form from '@/Components/Form/Form';
import Pagination from '@/Components/Pagination/Pagination';
import { useAppContext } from '@/context/context';
import useCharacter from '@/hooks/useCharacter';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';

const Wellcome = () => {
    const { fetchCharacter, dataForRender, generalInformation, error, loading, variables } = useCharacter()
    const { characterForSearch, firstPage } = useAppContext()

    return (
        <>            
            <header className={`${generalInformation === undefined ? 'h-screen' : 'h-64 xl:h-44 xl:flex-row'} transition-all flex flex-col justify-center items-center w-full gap-3 bg-slate-800 `}>                
                <div className={`w-full h-28 relative mt-10 xl:my-6 xl:w-2/5`}>
                    <Image className=' object-contain px-6 xl:px-0' src='/Rick-And-Morty-Logo.png' alt='Rick-And-Morty-Logo' fill sizes='700vw, (min-width: 768px) 40vw' priority />
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-3 xl:w-2/5'>
                    <h1 className='text-xl font-light text-cyan-500 xl:self-start xl:pl-5'>Busca tu personaje favorito</h1>
                    <Form
                        fetchNewCharacter={() => fetchCharacter(characterForSearch, firstPage)}
                        loading={loading}
                        currentCharacter={variables?.nameToSearch}
                    />
                </div>
            </header>
            <main className={`${generalInformation === undefined ? 'hidden' : 'block'} flex flex-col justify-center items-center w-full p-7`}>
                <div className='w-full flex items-center justify-center' id={variables?.nameToSearch} >
                    {loading && <div className=' xl:pt-20'><Spinner /></div>}
                    {(!loading && !!dataForRender.length) && <CharacterList data={dataForRender} />}
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
