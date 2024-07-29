import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// iconos
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCloseOutline, IoCalendarOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, Divider } from "keep-react";
import { clearErrors, getPedidoDetails } from "../../../Redux/actions/pedidoActionts";
import { getClientes } from "../../../Redux/actions/clienteActionts";

export const ModalDetalles = ({ pedidoId, showModal, handleCloseModal }) => {
    const { error, pedido, loading } = useSelector(
        (state) => state.pedidoDetails
    );
    const { clientes } = useSelector((state) => state.clientes);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPedidoDetails(pedidoId));
        dispatch(getClientes());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    // metodo para obtener el nombre del cliente
    const getClientNameById = (id) => {
        const client = clientes.find((client) => client._id === id);
        return client ? client.nombre : "Eliminado";
    };

    function convertirFecha(fechaString) {

        fechaString.split('T')[0]
        // 1. Separar la fecha en partes
        const [anio, mes, dia] = fechaString.split("-");

        // 2. Convertir el mes a nombre (resta 1 porque los meses empiezan en 0)
        const meses = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
        const mesNombre = meses[mes - 1];

        // 3. Formatear la fecha
        return `${dia} de ${mesNombre} de ${anio}`;
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[450px] max-h-[900px] overflow-auto rounded-md p-4">
                    <div>
                        <Button
                            onClick={handleCloseModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-2xl" />
                            </span>
                        </Button>
                        <h3 className=" text-base text-center font-semibold mt-5 text-gray-700">
                            Detalles del pedido
                        </h3>
                    </div>
                    <Modal.Content>
                        <div className="grid gap-y-10 mt-20 mx-2 px-2 gap-x-5 grid-cols-3">
                            <div className="col-span-3 mx-3">
                                {loading ? (
                                    <div className="ssc-line mb-2 w-20 h-2"></div>
                                ) : (
                                    <h1 className="block mb-2  text-sm font-bold  text-primario">
                                        {pedido.nombre}
                                    </h1>
                                )}

                                {loading ? (
                                    <div className="ssc-line mb-2 w-20 h-2"></div>
                                ) : (
                                    <p className="font-normal text-xs ">
                                        {pedido.descripcion}
                                    </p>
                                )}
                            </div>

                            <Divider className="col-span-3" />

                            <div className="col-span-1 mx-3">
                                <h1 className="block mb-2  text-xs font-semibold  text-zinc-700">
                                    Cliente
                                </h1>

                                {loading ? (
                                    <div className="ssc-line mb-2 w-20 h-2"></div>
                                ) : (
                                    <p className="font-normal text-xs ">
                                        {getClientNameById(pedido.cliente)}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <h1 className="block mb-2  text-xs font-semibold  text-zinc-700">
                                    Especificaciones del cliente
                                </h1>
                                {loading ? (
                                    <div className="ssc-line mb-2 w-20 h-2"></div>
                                ) : (
                                    <p className="font-normal text-xs ">
                                        {pedido.expecificacionesCliente}
                                    </p>
                                )}
                            </div>

                            <Divider className="col-span-3" />

                            <div className="grid gap-x-5 grid-cols-2 gap-y-10 col-span-3 mx-3">
                                <div className="col-span-1">
                                    <h1 className="block mb-3  text-xs font-medium  text-black">
                                        Estado de entrega
                                    </h1>

                                    {loading ? (
                                        <div className="ssc-line mb-2 w-20 h-2"></div>
                                    ) : pedido.entregado ? (
                                        <div className=" ml-2 font-semibold text-xs text-primario border-blue-300   border w-max py-1  px-2 rounded-full ">
                                            <p> Reclamado</p>
                                        </div>
                                    ) : (
                                        <div className=" ml-2 font-semibold text-xs text-zinc-900 border-gray-300  border w-max py-1  px-2 rounded-full ">
                                            <p> No reclamado</p>
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-1">
                                    <h1 className="block mb-3  text-xs font-medium  text-black">
                                        Estado de elaboracion
                                    </h1>
                                    {loading ? (
                                        <div className="ssc-line mb-2 w-20 h-2"></div>
                                    ) : pedido.terminado ? (
                                        <div className=" ml-2 font-semibold text-xs text-primario border-blue-300  border w-max py-1  px-2 rounded-full ">
                                            <p> Completado</p>
                                        </div>
                                    ) : (
                                        <div className=" ml-2 font-semibold text-xs text-zinc-900 border-gray-300   border w-max py-1  px-2 rounded-full ">
                                            <p> Pendiente</p>
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <h1 className="block mb-3  text-xs font-medium  text-black">
                                        Pago
                                    </h1>
                                    {loading ? (
                                        <div className="ssc-line mb-2 w-20 h-2"></div>
                                    ) : pedido.pagado ? (
                                        <div className=" ml-2 font-semibold text-xs text-primario border-blue-300   border w-max py-1  px-2 rounded-full ">
                                            <p> Pagado</p>
                                        </div>
                                    ) : (
                                        <div className=" ml-2 font-semibold text-xs text-zinc-900 border-gray-300  border w-max py-1  px-2 rounded-full ">
                                            <p> No pagado</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Divider className="col-span-2" />

                            <div className="col-span-3 mb-8 mx-3">
                                <h1 className="block mb-5  text-sm font-medium  text-zinc-600">
                                    Recogida
                                </h1>

                                <div className="items-center ml-3 flex gap-3 font-normal text-xs mb-3 ">
                                    {" "}
                                    <IoCalendarOutline
                                        className="fill-primario text-primario"
                                        size={18}
                                    />
                                    {pedido && pedido.fechaCreacion ? (
                                        <p>
                                            Pedido realizado el{" "}
                                            {convertirFecha( pedido.fechaCreacion.split('T')[0])}
                                        </p>
                                    ) : (
                                        <div className="ssc-line mb-2 w-20 h-2"></div>
                                    )}
                                </div>
                                <div className="items-center ml-3 flex gap-3 font-normal text-xs ">
                                    <CiDeliveryTruck
                                        className="fill-primario text-primario"
                                        size={20}
                                    />
                                    <p>
                                        Listo para la entrega el 
                                        {pedido && pedido.fechaEstimadaEntrega? (
                                            <p>
                                                {convertirFecha(  pedido.fechaEstimadaEntrega.split('T')[0])}
                                            </p>
                                        ) : (
                                            <div className="ssc-line mb-2 w-20 h-2"></div>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal.Content>
                </Modal.Body>
            </Modal>
        </>
    );
};
