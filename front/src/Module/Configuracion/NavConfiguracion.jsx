import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

import { Dropdown, toast } from "keep-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import { RiStackLine } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { BiLock, BiSolidDashboard, BiUser, BiUserPlus } from "react-icons/bi";
import {
    MdAccessibility,
    MdClose,
    MdNotifications,
    MdNotificationsNone,
    MdOutlineKeyboardAlt,
} from "react-icons/md";

const NavConfiguracion = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen  flex-col ">
                <div className="flex flex-1 ">
                    <aside className="sticky left-0 hidden w-64 flex-col m-5  pt-5 pl-8 rounded-xl sm:flex border-r-2">
                        <div className="mb-20 flex items-center gap-2">
                            <h2 className="text-lg font-bold text-primario">
                                Settings
                            </h2>
                        </div>

                        <div className="mb-4 flex items-center gap-2">
                            <h2 className="text-sm font-semibold ">
                                Ajustes de usuario
                            </h2>
                        </div>

                        <nav className="flex flex-col space-y-2">
                            <NavLink
                            
                                to={"/configuracion/MiCuenta"}
                                className={({ isActive }) =>
                                    `flex items-center text-stone-700 gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors mr-8  hover:text-primario hover:font-semibold ${
                                        isActive
                                            ? " font-semibold bg-primario text-white  "
                                            : ""
                                    }`
                                }
                                
                            >
                                <BiUser className="h-5 w-5" />
                                Mi cuenta
                            </NavLink>
                            <NavLink
                                to={"/configuracion/Seguridad"}
                                className={({ isActive }) =>
                                    `flex items-center text-stone-700 gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors mr-8  hover:text-primario hover:font-semibold ${
                                        isActive
                                            ? " font-semibold bg-primario text-white  "
                                            : ""
                                    }`
                                }
                            >
                                <BiLock className="h-5 w-5" />
                                Seguridad
                            </NavLink>
                        </nav>

                        <div className="mb-4 mt-16 flex items-center gap-2">
                            <h2 className="text-sm font-semibold ">
                                Ajustes de aplicacion
                            </h2>
                        </div>

                        <nav className="flex flex-col space-y-2">
                            <NavLink
                                to={"/configuracion/Apariencia"}
                                className={({ isActive }) =>
                                    `flex items-center text-stone-700 gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors mr-8  hover:text-primario hover:font-semibold ${
                                        isActive
                                            ? " font-semibold bg-primario text-white  "
                                            : ""
                                    }`
                                }
                               
                                
                            >
                                <CgWebsite className="h-5 w-5" />
                                Apariencia
                            </NavLink>
                            <NavLink
                                to={"/configuracion/Accesibilidad"}
                                className={({ isActive }) =>
                                    `flex items-center text-stone-700 gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors mr-8  hover:text-primario hover:font-semibold ${
                                        isActive
                                            ? " font-semibold bg-primario text-white  "
                                            : ""
                                    }`
                                }
                            >
                                <MdAccessibility className="h-5 w-5" />
                                Accesibilidad
                            </NavLink>
                            <NavLink
                                to={"/configuracion/Notificaciones"}
                                className={({ isActive }) =>
                                    `flex items-center text-stone-700 gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors mr-8  hover:text-primario hover:font-semibold ${
                                        isActive
                                            ? " font-semibold bg-primario text-white  "
                                            : ""
                                    }`
                                }
                            >
                                <MdNotificationsNone className="h-5 w-5" />
                                Notificaciones
                            </NavLink>

                            <NavLink
                                to={"/configuracion/AtajosTeclado"}
                                className={({ isActive }) =>
                                    `flex items-center text-stone-700 gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors mr-6  hover:text-primario hover:font-semibold ${
                                        isActive
                                            ? " font-semibold bg-primario text-white  "
                                            : ""
                                    }`
                                }
                            >
                                <MdOutlineKeyboardAlt className="h-5 w-5" />
                                Atajos de teclado
                            </NavLink>
                        </nav>
                    </aside>


                    <div className="flex flex-1 flex-col pt-20 px-14">{children}</div>
                </div>
            </div>

            <Link className="fixed top-10 right-10 text-primario" to={"/"}>
                <MdClose  size={25}/>
            </Link>
        </>
    );
};

export default NavConfiguracion;
