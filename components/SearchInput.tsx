"use client"
import SearchAction from '@/actions/search';
import { useSearchParams } from 'next/navigation'
import React from 'react'

const SearchInput = () => {
    const searchParams = useSearchParams();
  return (
    <form action={SearchAction} className=" relative">
            <input
              type="text"
              name='search'
              placeholder="Search"
              defaultValue={searchParams.get('search') || ""}
              className="px-2 py-1 md:px-4 md:py-2 outline-none border border-zinc-500 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] rounded-lg"
            />
          </form>
  )
}

export default SearchInput
