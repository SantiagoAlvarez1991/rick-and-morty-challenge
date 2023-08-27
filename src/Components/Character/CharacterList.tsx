import { Character } from '@/types/types'
import React, { FC } from 'react'
import CharacterCard from './CharacterCard'

interface CharacterList {
    data: Character[]
}

const CharacterList: FC<CharacterList> = ({data}) => {
  return (    
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        {data?.map(character => (
            <CharacterCard
                key={character.id}
                id={character.id}
                image={character.image}
                name={character.name}
                status={character.status}
                origin={character.origin.name}
                species={character.species}
             />
          ))}      
    </div>
  )
}

export default CharacterList
