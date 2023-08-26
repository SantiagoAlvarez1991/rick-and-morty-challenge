import { Character } from '@/types/types'
import React, { FC } from 'react'
import CharacterCard from './CharacterCard'

interface CharacterList {
    data: Character[]
}

const CharacterList: FC<CharacterList> = ({data}) => {
  return (
    <div style={
        {
          display: 'flex',
          flexWrap: 'wrap'
        }
      }>
        {data?.map(character => (
            <CharacterCard
                key={character.id}
                id={character.id}
                image={character.image}
                name={character.name}
                status={character.status}
                origin={character.origin.name}
             />
          ))}      
    </div>
  )
}

export default CharacterList
