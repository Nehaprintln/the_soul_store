import React from 'react'
import { useSearch } from '../Context/SearchContext'

export default function SearchProduct() {
    const {fetchProducts} = useSearch();
    console.log('fetchData', fetchProducts)
  return (
    <div>
        
    </div>
  )
}
