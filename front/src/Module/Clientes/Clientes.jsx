import React, { useEffect, useState } from "react";
import {  toast } from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import { getClientes } from "../../Redux/actions/clienteActionts";
import { PaginationComponent } from "../../Componentes Generales/Pagination/Pagination";
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";
import { PiEmptyBold } from "react-icons/pi";

import { DropdownAccionesComponent } from "./components/DropdownAccionesComponent";
import { DropdownFilterComponent } from "./components/DropdownFilterComponent";
import { ModalNewComponent } from "./components/ModalNewComponent";

function Clientes() {
    const [clientesData, setclientesData] = useState([]);
    const [search, setsearch] = useState("");
    const [A_Z, setA_Z] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [clientesFiltrados, setclientesFiltrados] = useState([]);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const clientesPorPagina = 8;
    const totalClientes = clientesFiltrados.length;
    const siguienteIndex = paginaActual * clientesPorPagina;
    const primerIndex = siguienteIndex - clientesPorPagina;

    const dispatch = useDispatch();
    const { clientes, error, loading } = useSelector((state) => state.clientes);

    useEffect(() => {
        dispatch(getClientes());
    }, [dispatch]);

    useEffect(() => {
        if (clientes && clientes.length > 0) {
            setclientesData(clientes);
            setMostrarMensaje(false);
        } else if (clientes && clientes.length === 0) {
            setMostrarMensaje(true);
        }

        if (error) {
            toast.error("No se pudo obtener los clientes", {
                position: "bottom-left",
                duration: 5000,
                classNames: { toast: "w-auto pr-10 ", title: " text-2xl ml-2" },
                style: { boxShadow: "0px 0px 19px 8px rgba(0,0,0,0.1)" },
            });
        }
    }, [clientes, error]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (clientesData.length === 0 && !error) {
                setMostrarMensaje(true);
            }
        }, 3000);

        return () => clearTimeout(timerId);
    }, [clientesData, error]);

    useEffect(() => {
        let resultado = [...clientesData];
        resultado = resultado.slice().reverse()

        if (search) {
            resultado = resultado.filter(dato =>
                dato.nombre.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (A_Z) {
            resultado = resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        setclientesFiltrados(resultado);
    }, [search, A_Z, clientesData]);

    const searcher = (e) => {
        setsearch(e.target.value);
        setpaginaActual(1);
    };

    const filterA_Z = (x) => {
        setA_Z(x);
        setpaginaActual(1);
    };


    

    const listaClientes = clientesFiltrados
        .slice(primerIndex, siguienteIndex)
        .map((cliente , index) => (
            <tr
                key={cliente._id}
                className="bg-white border-b cursor-default h-9 hover:bg-gray-50 font-light text-xs text-neutral-600"
            >
                <td className="min-w-24 text-center">{primerIndex + index + 1}

                </td>
                <td className="min-w-60 pl-6 text-primario font-medium cursor-pointer">
                    {cliente.nombre}
                </td>
                <td className="min-w-48 pl-2">{cliente.telefono}</td>
                <td className="min-w-48 pl-2">{cliente.telefono2}</td>
                <td className="min-w-72 text-center">
                    <DropdownAccionesComponent clienteId={cliente._id} />
                </td>
            </tr>
        ));

    return (
        <main className="container mx-auto px-10 pt-10 self-center lg:px-32 lg:pt-16 xl:px-24 2xl:px-32 2xl:pt-28 mt-20">
            <MetaData title={"Clientes"} />
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div>
                        <input
                            className="outline-none border-b-2 pl-1 pb-[1px] border-primario w-48 h-7 font-light md:w-56 md:h-10 md:font-normal lg:text-sm lg:pb-0 text-slate-600"
                            type="search"
                            placeholder="Buscar"
                            value={search}
                            onChange={searcher}
                        />
                    </div>
                    <DropdownFilterComponent filterA_Z={filterA_Z} A_Z={A_Z} />
                </div>
                <ModalNewComponent />
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : mostrarMensaje ? (
                <div className="mt-40">
                    <div className="px-10 py-4 w-full md:w-3/4 xl:w-1/2 2xl:w-2/5 mx-auto rounded-2xl border-slate-200">
                        <div className="w-16 h-16 flex items-center mx-auto rounded-full bg-secundario">
                            <PiEmptyBold
                                size={30}
                                className="mx-auto fill-primario"
                            />
                        </div>
                        <div className="my-6">
                            <h3 className="font-semibold text-center mb-4 text-lg">Opps!</h3>
                            <p className="text-center text-gray-600">
                                Parece que aún no hay clientes registrados. Por favor, añada clientes para verlos aquí.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto mt-16 lg:mx-8 xl:mx-7 border-x 2xl:mx-16 2xl:mt-20">
                    <table className="w-full text-sm text-left border text-gray-500 font-light">
                        <thead className="bg-white border-b">
                            <tr className="text-sm text-black h-12">
                                <th scope="col" className="min-w-24 text-center font-medium">#</th>
                                <th scope="col" className="min-w-60 pl-6 font-medium">Nombre</th>
                                <th scope="col" className="min-w-48 pl-2 font-medium">Teléfono 1</th>
                                <th scope="col" className="min-w-48 pl-2 whitespace-nowrap font-medium">Teléfono 2</th>
                                <th scope="col" className="min-w-72 text-center font-medium">Modificación</th>
                            </tr>
                        </thead>
                        <tbody>{listaClientes}</tbody>
                    </table>
                </div>
            )}
            {!mostrarMensaje && (
                <div className="h-28 flex justify-center items-center">
                    <PaginationComponent
                        itemsPorPagina={clientesPorPagina}
                        paginaActual={paginaActual}
                        totalItems={totalClientes}
                        setpaginaActual={setpaginaActual}
                    />
                </div>
            )}
        </main>
    );
}

export default Clientes;