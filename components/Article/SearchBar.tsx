"use client"
import React from 'react'
import SearchAction from '@/actions/search'
import { useSearchParams } from 'next/navigation'
const SearchBar = () => {
  const searchParams = useSearchParams();

  
  return (
    <form action={SearchAction} className='max-w-2xl mx-auto text-black'>
        <div className='relative'>
        <i className="ri-search-line absolute left-3 top-1/3 w-5 h-5 "></i>
        <input type="text" name='search' defaultValue={searchParams.get('search') || ""} className="pl-10 w-full pr-4 text-lg py-4 bg-zinc-300 outline-none text-black " placeholder="Search Articles..." />
        </div>
    </form>
  )
}

export default SearchBar
