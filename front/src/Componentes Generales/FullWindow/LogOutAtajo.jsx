import React from 'react'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/actions/userActions';
import { toast } from 'keep-react';



export const LogOutAtajo = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {

        dispatch(logout());
        toast.success("LogOut exitoso")

    }



  return (
    <div onClick={logoutHandler} className=" hidden hover:scale-105 duration-200 transition-all hover:bg-blue-50 rounded-full p-1 lg:fixed bottom-20 right-8 lg:flex flex-col items-center cursor-pointer text-primario">
        
        <MdLogout size={19} fontWeight={100} className=" " />
    </div>
  )
}
