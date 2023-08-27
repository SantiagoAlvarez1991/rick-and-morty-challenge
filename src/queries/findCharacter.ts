import { gql } from "@apollo/client";

export const FIND_CHARACTER = gql`
    query findCharacterByName($nameToSearch: String!, $pageToSearch: Int!) {
      characters(page: $pageToSearch, filter:{ name : $nameToSearch}) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          image
          status
          species
          origin {
            name
          }          
        }
      }
    }
  `