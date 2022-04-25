import React from 'react'
import { useParams } from 'react-router-dom';

const SearchResults = () => {
    let { serchKey } = useParams();

  return (
    <div>{serchKey}</div>
  )
}

export default SearchResults