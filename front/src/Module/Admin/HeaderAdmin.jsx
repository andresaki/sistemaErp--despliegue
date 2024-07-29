import { Dropdown, toast  } from "keep-react";
import React from "react";
import {useDispatch} from "react-redux"
import { Link } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import { RiStackLine } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import {
    BiSolidDashboard,
    BiUserPlus,
} from "react-icons/bi";

import { logout } from "../../Redux/actions/userActions";

export const HeaderAdmin = ({children}) => {

    const dispatch = useDispatch();

    const logoutHandler = () => {

        dispatch(logout());
        toast.success("LogOut exitoso")

    }

  return (
    <div className="flex min-h-screen w-full flex-col ">
            <header className="flex h-16 items-center justify-between  sticky top-0  bg-white  px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <RiStackLine className="w-9 h-9 text-white p-2  bg-primario rounded-full" />
                    <h2 className="text-lg font-semibold text-primario">
                        Sistema Erp
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    <Dropdown
                        action={
                            <UserCircle
                                size={32}
                                className="rounded-full w-8 h-8  text-primario"
                            />
                        }
                        actionClassName="rounded-full bg-transparent border-none"
                        className=" shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-40 p-2"
                    >
                        <Dropdown.List>
                            
                            <Dropdown.Item onClick={logoutHandler}>
                                <a
                                    href="configuracion/MiCuenta"
                                    className="hover:text-primario  hover:font-semibold  flex items-center text-gray-700 m-0"
                                >
                                    <p className=" text-sm">Salir</p>
                                </a>
                            </Dropdown.Item>
                        </Dropdown.List>
                    </Dropdown>
                </div>
            </header>

            <div className="flex flex-1 ">
                <aside className="hidden w-14 h-full flex-col ml-3 rounded-xl sm:flex bg-secundario  fixed top-16 ">
                    <nav className="flex flex-col items-center gap-8 px-2 sm:py-5 ">
                        <Link className="relative group" to={"/Admin"}>
                            <BiSolidDashboard    className="fill-primario"    size={23}         />
                            <p className="absolute left-11 top-0 rounded-md w-max px-2 text-center py-1  bg-primario text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</p>
                        </Link>
                        
                        <Link className="relative group" to={"/Admin/newUsuario"}>
                            <BiUserPlus className="fill-primario" size={27} />
                            <p className="absolute left-11 top-0 rounded-md w-max px-2 text-center py-1  bg-primario text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Nuevo usuario</p>
                        </Link>
                        <Link className="relative group"  to={"/"}>
                            <CgWebsite className="text-primario" size={24} />
                            
                            <p className="absolute left-11 top-0 rounded-md w-max px-2 text-center py-1  bg-primario text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sitio web</p>
                        </Link>
                            
                        
                    </nav>
                </aside>

                <div className="flex flex-1 flex-col ml-16">
                    {children}
                </div>
            </div>
        </div>
  )
}
