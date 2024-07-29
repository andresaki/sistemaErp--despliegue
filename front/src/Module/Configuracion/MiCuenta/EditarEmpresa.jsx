import React, { useEffect, useState } from "react";
import { Buildings } from "phosphor-react";
import NavConfiguracion from "../NavConfiguracion";
import { useDispatch, useSelector } from "react-redux";
import { Button, toast } from "keep-react";
import { MetaData } from "../../../Componentes Generales/MetaData/MetaData";

import { useNavigate } from "react-router-dom";
import { UPDATE_COMPANY_RESET } from "../../../Redux/constants/userConstants";
import {
    clearErrors,
    loadUser,
    updateCompany,
} from "../../../Redux/actions/userActions";

export const EditarEmpresa = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isUpdated } = useSelector((state) => state.user);
    const { user, loading } = useSelector((state) => state.auth);

    const [NombreEmpresa, setNombreEmpresa] = useState("");
    const [CorreoEmpresa, setCorreoEmpresa] = useState("");
    const [Direccion, setDireccion] = useState("");

    useEffect(() => {
        if (user) {
            setNombreEmpresa(user.nombreEmpresa);
            setCorreoEmpresa(user.correoEmpresa);
            setDireccion(user.direccion);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Datos de la empresa actualizados correctamente");
            dispatch(loadUser());

            dispatch({
                type: UPDATE_COMPANY_RESET,
            });
        }
    }, [dispatch, toast, error, isUpdated]);

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.set("nombreEmpresa", NombreEmpresa);
        formData.set("correoEmpresa", CorreoEmpresa);
        formData.set("direccion", Direccion);

        dispatch(updateCompany(formData));
    };
    return (
        <NavConfiguracion>
            <MetaData title={"Actualizar datos de empresa"} />
            <main className="grid lg:grid-cols-2 grid-cols-1 gap-24">
                {/* formualtio */}
                <div className="w-full md:max-w-md  xl:max-w-4xl ">
                    <div className="flex flex-col space-y-1">
                        <h3 className=" text-lg font-medium font-montserrat">
                            Editar empresa
                        </h3>
                        <p className="text-[11px] text-[#494949] text-muted-foreground ">
                            Edita los campos necesarios
                        </p>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="mt-14 space-y-8 xl:space-y-0 xl:grid xl:grid-cols-2 gap-8"
                    >
                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="NombreEmpresa"
                            >
                                Nombre de la empresa
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                id="NombreEmpresa"
                                type="text"
                                name="NombreEmpresa"
                                value={NombreEmpresa}
                                onChange={(e) => setNombreEmpresa(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="CorreoEmpresa"
                            >
                                Email de la empresa
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                id="CorreoEmpresa"
                                placeholder="email de la empresa"
                                type="email"
                                name="CorreoEmpresa"
                                value={CorreoEmpresa}
                                onChange={(e) => setCorreoEmpresa(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="Direccion"
                            >
                                Direccion
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                id="Direccion"
                                placeholder="direccion"
                                type="text"
                                name="Direccion"

                                value={Direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>

                        <div className="w-full col-span-2">
                            <Button
                                type="submit"
                                className="text-white h-8  bg-primario focus:ring-4 focus:outline-none font-medium  text-xs px-3 text-center rounded  hover:bg-primario"
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="grid gap-7">
                    <div className="w-full max-w-md shadow-md rounded-b-sm">
                        <div className="relative h-16 overflow-hidden rounded-t-lg">
                            {/* <img
                                src={Fondo}
                                alt="Backgroud"
                                className="h-full w-full object-cover object-bottom filter:hue-rotate(80deg) "
                            /> */}

                            <div className="h-full w-full object-cover object-bottom bg-primario  "></div>
                        </div>

                        {/* Card- Body */}
                        <div className="relative -mt-4 px-6 pb-6 ">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-xl p-1">
                                        <Buildings
                                            size={50}
                                            className="text-primario"
                                        />
                                    </div>
                                    {loading ? (
                                        <div className=" ssc-line w-16"></div>
                                    ) : (
                                        <div className="text-sm font-medium mt-3">
                                            {user.nombreEmpresa}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg  p-4 ">
                                <div className="grid gap-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[#494949] text-xs font-semibold">
                                            Nombre
                                        </div>
                                        {loading ? (
                                            <div className=" ssc-line w-16"></div>
                                        ) : (
                                            <div className="text-xs text-[#494949] font-medium">
                                                {user.nombreEmpresa}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[#494949] text-xs font-semibold">
                                            Correo de la empresa
                                        </div>

                                        {loading ? (
                                            <div className=" ssc-line w-16"></div>
                                        ) : (
                                            <div className="text-xs text-[#494949] font-medium">
                                                {user.correoEmpresa}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[#494949] text-xs font-semibold ">
                                            Direccion
                                        </div>
                                        {loading ? (
                                            <div className=" ssc-line w-16"></div>
                                        ) : (
                                            <div className="text-xs text-[#494949] font-medium">
                                                {user.direccion}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </NavConfiguracion>
    );
};
