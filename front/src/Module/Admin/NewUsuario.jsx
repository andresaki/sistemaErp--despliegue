import React, {useState , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { HeaderAdmin } from "./HeaderAdmin";
import { Button, toast } from "keep-react";

import { MetaData } from "../../Componentes Generales/MetaData/MetaData";
import {register , clearErrors, getUsers} from "../../Redux/actions/userActions"
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";



export const NewUsuario = () => {


    const estructura = {
        nombre: "",
        email: "",
        password: ""
    };
    const { formState, onInputChange } = useForm(estructura);
    const { nombre, email, password } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            
            toast.error("No se pudo crear un nuevo usuario", {
                position: "bottom-left",
                duration: 5000,
                classNames: {
                    toast: "w-auto pr-10 ",
                    title: " text-2xl ml-2",
                },
                style: {
                    boxShadow: "0px 0px 19px 8px rgba(0,0,0,0.1)",
                },
            });
            
            dispatch(clearErrors)
        }
    }, [dispatch, error])

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(register(formState))
        toast.success("Usuario creado correctamente")
        navigate("/Admin")
        dispatch(getUsers())
    };




    return (
        <HeaderAdmin>

            <MetaData title={"Nuevo usuario"} />
            <main className="mt-20 px-4">
                <div
                    className="rounded-3xl p-3 border-t shadow-2xl w-full md:max-w-md lg:  xl:max-w-4xl mx-auto"
                    data-v0-t="card"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className=" text-base text-center font-semibold m-3 text-black font-montserrat">
                            Nuevo usuario
                        </h3>
                        <p className="text-xs text-muted-foreground text-center">
                            Ingrese la informacion necesaria para crear el usuario
                        </p>
                    </div>
                    <form className="p-6 space-y-8 xl:space-y-0 xl:grid xl:grid-cols-2 gap-8" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="nombre"
                            >
                                Nombre
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                placeholder="Nombre"
                                required
                                name="nombre"
                                value={nombre}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                required
                                name="email"
                                autoComplete="off"
                                placeholder="email"
                                type="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                autoComplete="off"
                                required
                                name="password"
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={onInputChange}
                                
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="subscription-expiry"
                            >
                                Fecha de Vencimiento de Suscripción
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                id="subscription-expiry"
                                placeholder="subscription expiry date"
                                type="date"
                            />
                        </div>
                        <div className="flex w-full justify-center p-6">
                            <Button
                                type="submit "
                                className="text-white h-9  bg-primario focus:ring-4 focus:outline-none font-medium  text-xs px-5 py-2 text-center  rounded  hover:bg-primario"
                                >
                                Guardar
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </HeaderAdmin>
    );
};
