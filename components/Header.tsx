"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut , signIn } from "next-auth/react";
import SearchInput from "./SearchInput";
const Header = () => {
  const [isMobileMenuOpen , setIsMobileMenuOpen] = useState(false);
  const session = useSession();
  
  return (
    <header className="w-full fixed top-0 z-50 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] bg-zinc-950  p-2 backdrop-blur-md bg-zinc-950/50">
      <nav className="container relative mx-auto h-14 px-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl capitalize font-bold text-purple-400 drop-shadow-[0_0_8px_rgb(191,95,255)]">
            Code Craft
          </h1>
        </div>
        <ul className="flex gap-5">
        <Link href={"/articles"}> <li
            className="text-md font-semibold after:content-[''] relative after:absolute after:left-0 after:bottom-0 
    after:w-0 after:h-[2px] after:bg-zinc-400 after:transition-all 
    after:duration-300 hover:after:w-full cursor-pointer"
          >
            Articles
          </li></Link>
         <Link href={'/dashboard'}> <li
            className="font-semibold after:content-[''] relative after:absolute after:left-0 after:bottom-0 
    after:w-0 after:h-[2px] after:bg-zinc-400 after:transition-all 
    after:duration-300 hover:after:w-full cursor-pointer"
          >
            Dashboard
          </li></Link>
        </ul>
       { session.data?.user && <span className="md:hidden w-10 h-10 rounded-full flex justify-center items-center font-bold bg-zinc-900 text-2xl text-purple-600 cursor-pointer">{session.data.user.name?.charAt(0)}</span>}
        <div className="hidden md:flex items-center justify-center gap-2 md:gap-4">
          <SearchInput/>
        { session?.data?.user ? null :<button onClick={()=> signIn()}
            className=" px-4 md:px-8   py-2 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)]  border-gray-400 rounded-lg text-gray-300 hover:text-white 
             hover:bg-zinc-900 transition duration-150"
          >
           Sign In
          </button>}
          {
         session?.data?.user && (
              <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="m-1 rounded-full w-10 text-3xl text-purple-600 font-bold h-10 bg-zinc-800 text-center">{session?.data?.user?.name?.charAt(0)}</div>
                      <ul tabIndex={0} className="dropdown-content menu bg-zinc-900 backdrop-blur-md rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-2">
                      <button onClick={()=>signOut()} className="flex items-center gap-2 w-full px-4 py-2 font-semibold rounded-md  hover:text-purple-600 hover:bg-zinc-950 duration-300">
                      <i className="ri-logout-box-r-line text-xl"></i> Logout 
                       </button>
                       <button className="flex items-center w-full px-4  py-2 gap-2 font-semibold rounded-md  hover:text-purple-600 hover:bg-zinc-950 duration-300">
                       <i className="ri-user-line text-xl"></i> Profile 
                       </button>
                      </ul>
                </div>
            )
          }
        </div>
        <button className="md:hidden hover:bg-zinc-900 w-10 h-10 rounded-full duration-300" onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <i  className="ri-close-line text-xl cursor-pointer"></i> : <i className="ri-menu-line text-xl cursor-pointer"></i>}
        </button>

          {/* Mobile Menu */}

          {
             isMobileMenuOpen && (
              <div className="absolute bg-zinc-900 rounded-md w-56 h-fit top-14 right-8 p-2 flex flex-col gap-2">
                 { session?.data?.user ?<button onClick={()=>signOut()} className="flex border items-center justify-center w-full px-4 py-2 font-semibold border-zinc-950 rounded-md shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] hover:text-purple-600 hover:bg-zinc-950 duration-300">
                    Logout
                    </button> :<button onClick={()=>signIn()} className="flex border items-center justify-center w-full px-4 py-2 font-semibold border-zinc-950 rounded-md shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)] hover:text-purple-600 hover:bg-zinc-950 duration-300">
                    SignIn
                    </button>
                  }
                  <button className="flex border items-center justify-center w-full px-4 py-2 hover:text-purple-600 hover:bg-zinc-950 duration-200 font-semibold border-zinc-950 rounded-md shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)]">User</button>
              </div>
             )

         }
      </nav>   
    </header>
  );
};

export default Header;
