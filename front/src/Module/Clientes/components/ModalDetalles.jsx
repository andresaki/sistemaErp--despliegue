import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getClienteDetails,
} from "../../../Redux/actions/clienteActionts";

// iconos
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Divider, Modal, toast } from "keep-react";

// data
import { getPedidosCliente } from "../../../Redux/actions/pedidoActionts";
import { PiEmptyBold } from "react-icons/pi";

export const ModalDetalles = ({ clienteId, showModal, handleCloseModal }) => {
    const dispatch = useDispatch();

    const { error, cliente, loading } = useSelector(
        (state) => state.clienteDetails
    );
    let { pedidos, loading: loadingPedido } = useSelector(
        (state) => state.pedidos
    );

    useEffect(() => {
        dispatch(getClienteDetails(clienteId));

        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }
    }, [dispatch, toast, error, clienteId]);

    useEffect(() => {
        if (pedidos) {
            pedidos = [];
        }
        dispatch(getPedidosCliente(cliente._id));
    }, [dispatch]);

    // Metodo para formatear la fecha
    const formatDateWithoutTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[470px] rounded-sm p-6 pb-10">
                    <div>
                        <Button
                            onClick={handleCloseModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-2xl" />
                            </span>
                        </Button>
                        <h3 className=" text-base text-center font-medium mt-9 text-black font-montserrat">
                            Detalles del cliente
                        </h3>
                    </div>
                    <Modal.Content>
                        <div className="grid gap-y-12 mt-20 mx-3 px-2 gap-x-5 grid-cols-2">
                            <div className="col-span-2">
                                <h1 className="font-semibold text-xs text-primario">
                                    Nombre del cliente
                                </h1>

                                {loading ? (
                                    <div className=" ssc-line w-16"></div>
                                ) : (
                                    <p className="font-normal text-[14px]  mt-4">
                                        {cliente.nombre}
                                    </p>
                                )}
                            </div>

                            <hr className="col-span-2" />

                            <div className="col-span-1">
                                <h1 className="font-semibold text-xs text-primario">
                                    Telefono
                                </h1>
                                {loading ? (
                                    <div className=" ssc-line w-16"></div>
                                ) : (
                                    <p className="font-normal text-[14px]  mt-4">
                                        {cliente.telefono}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <h1 className="font-semibold text-xs text-primario">
                                    Telefono secundario
                                </h1>
                                {loading ? (
                                    <div className=" ssc-line w-16"></div>
                                ) : (
                                    <p className="font-normal text-[14px]  mt-4">
                                        {cliente.telefono2}
                                    </p>
                                )}
                            </div>
                        </div>

                        {loadingPedido ? (
                            <p>cargando</p>
                        ) : pedidos.length === 0 ? (
                            <>
                                <div className="mt-16 ">
                                    <Divider className="my-3"/>
                                    <div className="  w-full  mx-auto rounded-2xl  border-slate-200">
                                        <div className="w-10 h-10 flex items-center mx-auto rounded-full bg-secundario ">
                                            <PiEmptyBold
                                                size={18}
                                                className="mx-auto fill-primario "
                                            />
                                        </div>
                                        <div className="my-3">
                                            <h3 className="font-medium text-center mb-4 text-sm">
                                                El cliente no tiene productos asociados
                                            </h3>
                                            
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="mt-28 mx-3">
                                <h1 className="font-medium text-[14px] text-center mb-11">
                                    Pedidos recientes{" "}
                                </h1>

                                <div className=" overflow-x-auto border-x">
                                    <table className="w-full text-sm  text-left border text-gray-500 font-light">
                                        <thead className="bg-white border-b">
                                            <tr className=" text-xs  text-black h-9 w-full ">
                                                <th
                                                    scope="col"
                                                    className=" w-[15%] text-center  font-medium"
                                                >
                                                    Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="w-[60%] pl-6  font-medium"
                                                >
                                                    Nombre
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="w-[25%] pl-2 font-medium "
                                                >
                                                    Fecha
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs font-light">
                                            {loadingPedido ? (
                                                <p>cargando</p>
                                            ) : (
                                                pedidos &&
                                                pedidos.map((p, index) => (
                                                    <tr
                                                        key={p._id}
                                                        className="text-xs font-light bg-white border-b cursor-default h-9 hover:bg-gray-50 text-black"
                                                    >
                                                        <th className="w-[15%] text-center text-xs font-light">
                                                            {index + 1}
                                                        </th>
                                                        <th className="w-[60%] text-xs pl-6 font-light">
                                                            {p.nombre}
                                                        </th>
                                                        <th className="w-[25%] pl-2 text-xs font-light">
                                                            {formatDateWithoutTime(
                                                                p.fechaEstimadaEntrega
                                                            )}
                                                        </th>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            
                            </div>
                        )}
                    </Modal.Content>
                </Modal.Body>
            </Modal>
        </>
    );
};
