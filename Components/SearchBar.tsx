import { Search } from 'lucide-react'
import React from 'react'
import Form from 'next/form'
const SearchBar = () => {
  return (
    <div className=''>
       <Form action="/search" className='relative'>
        <input 
            type='text'
            name='q'
            placeholder='Search For Events...'
            className='
                w-full px-4 py-3 pl-12 bg-white  rounded-xl border border-gray-200 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition duration-300 ease-in-out
            '
        
        />   
    <Search className='absolute left-4 top-1/2  -translate-y-1/2 text-gray-500 w-5 y-5'/>

        <button className='absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-lg
            text-sm font-medium hover:bg-blue-700 transition-colors duration-200
        '>
            Search
        </button>
        </Form>
    </div>
  )
}

export default SearchBar
