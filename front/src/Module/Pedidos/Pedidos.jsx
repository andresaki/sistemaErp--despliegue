import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions/pedidoActionts";

import { PaginationComponent } from "../../Componentes Generales/Pagination/Pagination";
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";

// iconos
import { GoHistory } from "react-icons/go";
import {
    MdHistoryToggleOff,
    MdCheck,
    MdOutlineAttachMoney,
    MdMoneyOff,
} from "react-icons/md";

// Keep react
import { Button, toast } from "keep-react";

// Componentes
import { ModalNewComponent } from "./Components/ModalNewComponent";
import { DropdownAccionesComponent } from "./Components/DropdownAccionesComponent";
import { DropdownFilterComponent } from "./Components/DropdownFilterComponent";
import { getClientes } from "../../Redux/actions/clienteActionts";
import { PiEmptyBold, PiHand } from "react-icons/pi";
import { TbHandOff, TbHandStop } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

function Pedidos() {
    // estados de data
    const [pedidosData, setPedidosData] = useState([]);
    const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

    // filtros
    const [A_Z, setA_Z] = useState(false);
    const [search, setsearch] = useState("");
    const [entregado, setEntregado] = useState("");
    const [terminado, setTerminado] = useState("");
    const [pagado, setPagado] = useState("");














    // pagination
    const [paginaActual, setpaginaActual] = useState(1);
    const itemsPorPagina = 8;
    const siguienteIndex = paginaActual * itemsPorPagina;
    const primerIndex = siguienteIndex - itemsPorPagina;

    // otros
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const totalItems = pedidosFiltrados.length;

    const dispatch = useDispatch();

    // selector
    const { pedidos, error, loading } = useSelector((state) => state.pedidos);
    const { clientes } = useSelector((state) => state.clientes);
    const { filter } = useSelector((state) => state.PedidoFilter);

    useEffect(() => {
        dispatch(getPedidos());
        dispatch(getClientes());
    }, [dispatch]);

    useEffect(() => {
        if (pedidos && pedidos.length > 0) {
            setPedidosData(pedidos);
            setMostrarMensaje(false);
        } else if (pedidos && pedidos.length === 0) {
            setMostrarMensaje(true);
        }

        if (error) {
            toast.error("No se pudo obtener los pedidos", {
                position: "bottom-left",
                duration: 5000,
                classNames: { toast: "w-auto pr-10 ", title: " text-2xl ml-2" },
                style: { boxShadow: "0px 0px 19px 8px rgba(0,0,0,0.1)" },
            });
        }
    }, [pedidos, error]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (pedidosData.length === 0 && !error) {
                setMostrarMensaje(true);
            }
        }, 3000);

        return () => clearTimeout(timerId);
    }, [pedidosData, error]);



    useEffect( () => {

        if(filter){
            if(filter === 'pendiente'){
                setTerminado(filter)
            }
            if(filter === 'Completados'){
                setTerminado(filter)
            }
            if(filter === 'NoReclamado'){
                setEntregado(filter)
            }
            
        }

        console.log(filter)
    },[filter])

    // metodos de seteos de estados de filtro
    const searcher = (e) => {
        setsearch(e.target.value);
        setpaginaActual(1);
    };

    const filterA_Z = (x) => {
        setA_Z(x);
        setpaginaActual(1);
    };

    const filterEntregado = (x) => {
        setEntregado(x);
        setpaginaActual(1);
    };

    const filterTerminado = (x) => {
        setTerminado(x);
        setpaginaActual(1);
    };

    const filterPagado = (x) => {
        setPagado(x);
        setpaginaActual(1);
    };

    useEffect(() => {
        let resultado = [...pedidosData];
        resultado = resultado.slice().reverse();

        if (search) {
            resultado = resultado.filter((dato) =>
                dato.nombre.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (A_Z) {
            resultado = resultado.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );

            if (A_Z === "") {
                resultado = resultado;
            }
        }

        // Filtrar por ESTADO
        if (terminado) {
            if (terminado === "pendiente") {
                resultado = resultado.filter(
                    (pedido) => pedido.terminado === false
                );
            }
            if (terminado === "Completados") {
                resultado = resultado.filter(
                    (pedido) => pedido.terminado === true
                );
            }

            if (terminado === "") {
                resultado = resultado;
            }
        }

        // Filtrar por entrega
        if (entregado) {
            if (entregado === "reclamado") {
                resultado = resultado.filter(
                    (pedido) => pedido.entregado === true
                );
            }
            if (entregado === "NoReclamado") {
                resultado = resultado.filter(
                    (pedido) => pedido.entregado === false
                );
            }
        }

        if (pagado) {
            console.log(pagado)
            if (pagado === "pagado") {
                resultado = resultado.filter(
                    (pedido) => pedido.pagado === true
                );

                console.log(resultado)
            }
            if (pagado === "Nopagado") {
                resultado = resultado.filter(
                    (pedido) => pedido.pagado === false
                );

                console.log(resultado)
            }
        }

        setPedidosFiltrados(resultado);
    }, [search, A_Z, terminado, pedidosData, entregado, pagado]);

    // metodo para obtener el nombre del cliente
    const getClientNameById = (id) => {
        const client = clientes.find((client) => client._id === id);
        return client ? client.nombre : "Eliminado";
    };

    // Metodo para formatear la fecha
    const formatDateWithoutTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const listapedidos = pedidosFiltrados.slice(primerIndex, siguienteIndex).map((pedido, index) => (
            <tr
                key={pedido._id}
                className="  bg-white border-b cursor-default  h-10 hover:bg-gray-50 font-normal text-xs text-neutral-600 "
            >
                <td className="min-w-20 text-center ">
                    {primerIndex + index + 1}
                </td>
                <td className="min-w-64 pl-6 w-3/4 whitespace-nowrap overflow-hidden text-ellipsis  ">
                    {pedido.nombre}
                </td>
                <td className="min-w-40 pl-2 ">
                    {getClientNameById(pedido.cliente)}
                </td>
                <td className="min-w-20 h-full  ">
                    {pedido.terminado ? (
                        <div className="relative group bg-primario mx-auto w-11 h-7 flex justify-center items-center rounded-full hover:scale-105">
                            <MdCheck size={19} className="fill-white" />
                            <p className="absolute left-12 top-0 rounded-md w-max px-2 text-center py-1  bg-primario text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Terminado
                            </p>
                        </div>
                    ) : (
                        <div className="relative group bg-slate-200 mx-auto w-11 h-7 flex justify-center items-center rounded-full hover:scale-105">
                            <MdHistoryToggleOff
                                size={19}
                                className="fill-black"
                            />
                            <p className="absolute left-12 top-0 rounded-md w-max px-2 text-center py-1  bg-slate-300 text-gray-700 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Pendiente
                            </p>
                        </div>
                    )}
                </td>
                <td className="min-w-20 h-full  ">
                    {pedido.pagado ? (
                        <div className="relative group bg-primario mx-auto w-11 h-7 flex justify-center items-center rounded-full hover:scale-105">
                            <MdOutlineAttachMoney
                                size={19}
                                className="fill-white"
                            />
                            <p className="absolute left-12 top-0 rounded-md w-max px-2 text-center py-1  bg-primario text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Si
                            </p>
                        </div>
                    ) : (
                        <div className="relative group bg-slate-200 mx-auto w-11 h-7 flex justify-center items-center rounded-full hover:scale-105">
                            <MdMoneyOff size={19} className="fill-black" />
                            <p className="absolute left-12 top-0 rounded-md w-max px-2 text-center py-1  bg-slate-300 text-gray-700 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                No
                            </p>
                        </div>
                    )}
                </td>
                <td className="min-w-36 ">
                    {pedido.entregado ? (
                        <div className="relative group bg-primario mx-auto w-11 h-7 flex justify-center items-center rounded-full hover:scale-105">
                            <PiHand
                                size={19}
                                className="fill-white"
                            />
                            <p className="absolute left-12 top-0 rounded-md w-max px-2 text-center py-1  bg-primario text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Reclamado 
                            </p>
                        </div>
                    ) : (
                        <div className="relative group bg-slate-200 mx-auto w-11 h-7 flex justify-center items-center rounded-full hover:scale-105">
                            <IoClose size={19} className="fill-black" />
                            <p className="absolute left-12 top-0 rounded-md w-max px-2 text-center py-1  bg-slate-300 text-gray-700 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                No reclamado
                            </p>
                        </div>
                    )}
                </td>

                <td className="min-w-40 text-center">
                    {formatDateWithoutTime(pedido.fechaEstimadaEntrega)}
                </td>
                <td className="min-w-52  text-center">
                    <DropdownAccionesComponent pedidoId={pedido._id} />
                </td>
            </tr>
    ));

    return (
        <main className="container mx-auto px-10 pt-10   self-center  lg:px-14 lg:pt-16   xl:px-10   2xl:px-10 2xl:pt-28  mt-20 ">
            <MetaData title={"Pedidos"} />

            <div className="w-full flex justify-between items-center ">
                <div className=" flex items-center gap-4">
                    <div>
                        <input
                            className="outline-none border-b-2 pl-1 pb-[1px] border-primario w-48 h-7 font-light md:w-56 md:h-10 md:font-normal lg:text-sm lg:pb-0 text-slate-600"
                            type="search"
                            placeholder="Buscar"
                            value={search}
                            onChange={searcher}
                        />
                    </div>
                    <DropdownFilterComponent
                        filterA_Z={filterA_Z}
                        A_Z={A_Z}
                        filterEntregado={filterEntregado}
                        entregado={entregado}
                        filterPagado={filterPagado}
                        pagado={pagado}
                        filterTerminado={filterTerminado}
                        terminado={terminado}
                    />
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
                            <h3 className="font-semibold text-center mb-4 text-lg">
                                Opps!
                            </h3>
                            <p className="text-center text-gray-600">
                                Parece que aún no hay Pedidos registrados. Por
                                favor, añada Pedidos para verlos aquí.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" overflow-x-auto mt-10   border-x  2xl:mt-20">
                    <table className="w-full text-sm  text-left border text-gray-500 font-light">
                        <thead className="bg-white border-b">
                            <tr className=" text-sm  text-black h-12 ">
                                <th
                                    scope="col"
                                    className=" min-w-20 max-w-20 text-center  font-medium"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="min-w-64  max-w-64 pl-6 font-medium"
                                >
                                    Pedido
                                </th>
                                <th
                                    scope="col"
                                    className="min-w-40 pl-2  font-medium"
                                >
                                    Cliente
                                </th>
                                <th
                                    scope="col"
                                    className="min-w-36 text-center  font-medium "
                                >
                                    Estado
                                </th>

                                <th
                                    scope="col"
                                    className="min-w-36 text-center  font-medium "
                                >
                                    Pagado 
                                </th>
                                <th
                                    scope="col"
                                    className="min-w-36 text-center  font-medium"
                                >
                                    Entrega
                                </th>

                                <th
                                    scope="col"
                                    className="min-w-40 text-center  font-medium"
                                >
                                    Fecha de Entrega
                                </th>
                                <th
                                    scope="col"
                                    className="min-w-52  text-center font-medium"
                                >
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">{listapedidos}</tbody>
                    </table>
                </div>
            )}
            {!mostrarMensaje && (
                <div className="h-28 flex justify-center items-center">
                    <PaginationComponent
                        itemsPorPagina={itemsPorPagina}
                        paginaActual={paginaActual}
                        totalItems={totalItems}
                        setpaginaActual={setpaginaActual}
                    />
                </div>
            )}
        </main>
    );
}

export default Pedidos;
