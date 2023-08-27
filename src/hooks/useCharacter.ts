import { useAppContext } from '@/context/context';
import { FIND_CHARACTER } from '@/queries/findCharacter';
import { Character, Information } from '@/types/types';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const useCharacter = () => {

  const { offset, limit, getPageLimit } = useAppContext()
  const [generalInformation, setGeneralInformation] = useState<Information>()
  const [foundCharacter, setFoundCharacter] = useState<Character[]>([])
  const [dataForRender, setDataForRender] = useState<Character[]>([])

  const [getCharacter, { error, loading, data, variables, refetch }] = useLazyQuery(FIND_CHARACTER,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache'
    })

  const fetchCharacter = (name: string, page: number | undefined | null) => {
    getCharacter({
      variables: {
        nameToSearch: name,
        pageToSearch: page
      }
    })
  }

  useEffect(() => {
    if (data) {
      setFoundCharacter(prevState => prevState.concat(data.characters.results))
      setGeneralInformation(data.characters.info)
    }
  }, [data])

  useEffect(() => {
    setDataForRender(foundCharacter?.slice(offset, limit))
  }, [foundCharacter, offset, limit])

  useEffect(() => {
    generalInformation && getPageLimit(generalInformation?.count)
  }, [generalInformation, getPageLimit])

  useEffect(() => {
    setFoundCharacter([])    
  }, [variables?.nameToSearch])

  return { dataForRender, generalInformation, error, loading, fetchCharacter, refetch, variables }
}

export default useCharacter
