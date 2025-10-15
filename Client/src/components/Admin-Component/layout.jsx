import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export const AdminLayout = () => {
  const [openSideBar,setOpenSideBar] = useState(false)
  return (
    <div className='flex min-h-screen w-full '>
        <Sidebar open={openSideBar} setOpen={setOpenSideBar}/>
        <div className='flex flex-1/2 flex-col bg-content text-white'>
        <Header open={openSideBar} setOpen={setOpenSideBar} />
        <main className='flex flex-1 text-black flex-col font-bold  md:p-6 p-8'>
            <Outlet></Outlet>
        </main>
        </div>
        </div>
  )
}
