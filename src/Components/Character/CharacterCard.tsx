import { Character } from '@/types/types'
import React, { FC } from 'react'

interface CharacterCard {
    id: string;
    name: string;
    image: string;
    status: string;
    origin: string 
}

const CharacterCard : FC<CharacterCard>= ({id, name, image, status, origin}) => {
  return (
    <article>
         <p>{name}</p>
              <img src={image} width='200px' />      
    </article>
  )
}

export default CharacterCard
