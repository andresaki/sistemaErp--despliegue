import React, { useEffect, useState } from "react";
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../Redux/actions/userActions";



// Fondo 
import { Wave } from "./Wave";

// iconos
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { LuKeyRound } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "keep-react";

export const Login = () => {
    const [hidenPassword, sethidenPassword] = useState(false);
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch()
    const {isAuthenticated, error, loading, user } = useSelector(state => state.auth)

    useEffect(() => {
        if(isAuthenticated){
            if (user){
                if (user.role === "admin"){
                    navigate("/Admin")
                }
                else{
                    navigate("/")
                }
            }
        }

        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login (Email , Password))
    }

    const onVisiblePassword = () => {
        sethidenPassword(false);
    };

    const onHiddenPassword = () => {
        sethidenPassword(true);
    };

    return (
        <>
            <MetaData title={"Inicio de seción"}/> 
            <div className="bg-[#DBE9FF] w-full h-screen flex justify-center items-center">
                <div className="fixed top-0 lg:-top-16 xl:-top-24 w-full">
                    <Wave />
                </div>

                <div className="w-72">
                    <h2 className="font-semibold text-3xl text-[#0565D4] text-center">
                        Iniciar seción
                    </h2>

                    <form action="" className=" mt-14 col-span-1" onSubmit={onSubmitHandler}>
                        <div className="col-span-2 relative mb-7">
                            <FaRegUser className="absolute left-4 top-3 fill-[#0565D4] h-4" />
                            <input
                                type="email"
                                name="Email"
                                className="outline-none  text-gray-800 text-[12px] rounded-2xl block w-full h-10 pr-4  pl-11 focus:ring-/0.9 focus:ring-2 "
                                placeholder="Email"
                                required
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 relative mb-5">
                            {hidenPassword ? (
                                <IoEyeOutline
                                    onClick={onVisiblePassword}
                                    className="hover:bg-blue-50 rounded-full  absolute right-4 top-3 text-[#0565D4] cursor-pointer "
                                />
                            ) : (
                                <IoEyeOffOutline
                                    onClick={onHiddenPassword}
                                    className="hover:bg-blue-50 rounded-full  absolute right-4 top-3 fill-[#0565D4] cursor-pointer "
                                />
                            )}

                            <LuKeyRound className="absolute left-4 top-2 text-[#0565D4]  h-6" />
                            <input
                                type={hidenPassword ? "text" : "password"}
                                name="Password"
                                className="outline-none  text-[12px]  text-gray-800  rounded-2xl block w-full h-10 pr-4  pl-11 focus:ring-/0.9 focus:ring-2 "
                                placeholder="Password"
                                required
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to={"/contrasenaOlvidada"}
                                className="text-xs text-[#0565D4] font-semibold  "
                            >
                                Contraseña olvidada?
                            </Link>
                        </div>

                        <div className="flex mt-10">
                            <button
                                type="submit"
                                onSubmit={onSubmitHandler}
                                className="h-8 w-32 bg-[#0565D4] text-white rounded-2xl font-medium text-sm mx-auto "
                            >
                                Iniciar seción
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
