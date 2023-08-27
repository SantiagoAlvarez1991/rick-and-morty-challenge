import Image from 'next/image';
import { FC } from 'react';
import { Planet } from '../icons/Planet';
import Heart from '../icons/Heart';
import NoSymbol from '../icons/NoSymbol';
interface CharacterCard {
  id: string;
  name: string;
  image: string;
  status: string;
  origin: string;
  species: string
}

const CharacterCard: FC<CharacterCard> = ({ name, image, status, origin, species }) => {

  const getNameSize = () => {
    if(name.length < 10){
      return 'text-2xl'
    } else if(name.length >= 10 && name.length < 20){
      return 'text-xl'
    } else {
      return 'text-lg'
    }
  }

  return (   
    <article className='h-fit flex justify-center bg-white rounded-xl p-4'>
      <div className='h-48 w-full relative bg-gray-300 basis-2/5 rounded-md overflow-hidden' >
        <Image className='object-cover overflow-hidden' src={image} fill alt={`${name} image`} sizes='100vw, (min-width: 768px) 40vw' priority />
      </div>
      <div className='basis-3/5 pl-4 text-slate-800'>       
        <p className={`${getNameSize()} font-extrabold`}>{name}</p>
        <p className='font-semibold text-slate-600 text-sm bg-slate-300 px-3  inline-block rounded-md mb-1'>{species}</p>

        <p className='text-sm font-semibold  text-slate-400 mb-1'>Status</p>
        <div className='flex items-center gap-1'>
          {status === "Alive"
            ? <Heart className='w-5 h-5 bg-slate-200 rounded-full p-1 stroke-2' />
            : <NoSymbol className='w-5 h-5 bg-slate-200 rounded-full p-1 stroke-2' />
          }
          <p className='text-sm'>{status}</p>
        </div>

        <p className=' text-sm font-semibold  text-slate-400 mb-1'>Origin</p>
        <div className='flex items-start gap-1'>
          <Planet className=' w-5 h-5 bg-slate-200 rounded-full p-1 stroke-2' />
          <p className='text-sm'>{origin}</p>
        </div>
      </div>
    </article>
  )
}

export default CharacterCard
