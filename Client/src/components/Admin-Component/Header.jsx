import React, { useState } from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut, ShoppingCart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutTheUser, resetTokenAndCredentials } from '@/store/auth-slice'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { getProducts } from '@/store/admin/Product-Slice'
import { useNavigate } from 'react-router-dom'

export const Header = ({setOpen}) => {
  const dispatch = useDispatch()
  const [openDialog,setOpenDialog] = useState(false)
  const navigate = useNavigate()

  function toLogout() {
    // when you want to logout the cookies which get saved in your cookies
    // dispatch(logoutTheUser()).then((data)=>{
    //   if(data.payload.success){
    //     dispatch(getProducts())
    //   }
    // })


    // when you want to logout the cookies which get saved in your session storage
     dispatch(resetTokenAndCredentials());
     sessionStorage.clear();
     navigate("/auth/login");
    
  }
  return (
    <header className='flex items-center bg-adminSideBar  border-b-2 justify-between px-4 py-4  border-black'>
      <Button className="lg:hidden sm:block" onClick={()=>setOpen(true)}>
        <AlignJustify />
        <span className=' sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex-1 flex justify-end'>
        <AlertDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <AlertDialogTrigger asChild>
       <Button className="cursor-pointer font-bold">
        <LogOut/>
        Logout
       </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={()=>toLogout()}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </header>
  )
}
