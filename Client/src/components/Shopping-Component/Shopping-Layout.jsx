import React from 'react'
import { Outlet } from 'react-router-dom'
import { ShoppingHeader } from './Header'

export const ShoppingLayout = () => {
    return (
        <div className='flex min-h-screen w-full'>
            <div className='flex-1 flex-col'>
            <ShoppingHeader/>            
            <main className='flex flex-col w-full'>
                <Outlet/>
            </main>
            </div>
        </div>
    )
}
