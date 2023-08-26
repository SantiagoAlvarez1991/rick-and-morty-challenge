import CharacterList from '@/Components/Character/CharacterList';
import Form from '@/Components/Form/Form';
import Pagination from '@/Components/Pagination/Pagination';
import { useAppContext } from '@/context/context';
import useCharacter from '@/hooks/useCharacter';
import Link from 'next/link';

export default function Home() {

  const { fetchCharacter, dataForRender, generalInformation, error, loading } = useCharacter()
  const { characterForSearch, currentPage, fisrtPage } = useAppContext()

  return (
    <main>
      <h1>Página {currentPage}</h1>
      <Form
        fetchNewCharacter={() => fetchCharacter(characterForSearch, fisrtPage)}
      />
      <Link href='/hola/santiago'>Click</Link>
      <div>
        {loading
          ? <p>Loading...</p>
          : <CharacterList data={dataForRender}/>
        }
        {error && <p>Error : {error.message}</p>}
      </div>
      <Pagination
        fetchNewCharacter={() => generalInformation?.next !== null && fetchCharacter(characterForSearch, generalInformation?.next)}
      />

    </main>
  )
}
