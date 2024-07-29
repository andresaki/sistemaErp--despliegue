import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    clearErrors,
    getPedidoDetails,
    getPedidos,
    newPedido,
    updatePedido,
} from "../../../Redux/actions/pedidoActionts";
import { getClientes } from "../../../Redux/actions/clienteActionts";

// iconos
import { MdOutlineAdd } from "react-icons/md";

import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, Divider, toast } from "keep-react";

// data
import { pedidos } from "../../../Data/Pedidos";
import { NumericFormat } from "react-number-format";
import { UPDATE_PEDIDO_RESET } from "../../../Redux/constants/pedidoConstants";

export const ModalEditar = ({ pedidoId, showModal, handleCloseModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // selector de todos los clientes, detalles pedido , updatepedido
    const { clientes, error: errorClientes } = useSelector(
        (state) => state.clientes
    );
    const { error, pedido } = useSelector((state) => state.pedidoDetails);
    const { isUpdated, error: updateError} = useSelector(  (state) => state.updatePedido  );

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [expecificacionesCliente, setExpecificacionesCliente] = useState("");
    const [pagado, setPagado] = useState(false);
    const [terminado, setTerminado] = useState(false);
    const [entregado, setEntregado] = useState(false);
    const [costoTotal, setCostoTotal] = useState(0);
    const [fechaEstimadaEntrega, setFechaEstimadaEntrega] = useState("");
    const [cliente, setCliente] = useState("");

    useEffect(() => {
        dispatch(getClientes());

        if (errorClientes) {
            toast.error(errorClientes);
            dispatch(clearErrors());
        }
    }, [dispatch, errorClientes]);

    useEffect(() => {
        if (pedido && pedido._id !== pedidoId) {
            dispatch(getPedidoDetails(pedidoId));
        } else {
            setNombre(pedido.nombre);
            setDescripcion(pedido.descripcion);
            setExpecificacionesCliente(pedido.expecificacionesCliente);
            setPagado(pedido.pagado);
            setTerminado(pedido.terminado);
            setEntregado(pedido.entregado);
            setCostoTotal(pedido.costoTotal);
            setFechaEstimadaEntrega(pedido.fechaEstimadaEntrega.split('T')[0]);
            setCliente(pedido.cliente);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Pedido Actualizado correctamente");
            navigate("/Pedidos");
            handleCloseModal();
            dispatch({ type: UPDATE_PEDIDO_RESET });
            dispatch(getPedidos());
            setNombre("");
            setDescripcion("");
            setExpecificacionesCliente("");
            setPagado(false);
            setEntregado(false);
            setTerminado(false);
            setCostoTotal("");
            setFechaEstimadaEntrega("");
            setCliente("");



        }
    }, [dispatch, toast, error, isUpdated,navigate,  updateError, pedido, pedidoId]);

    console.log(pedido)
    console.log(
        cliente
    )

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("descripcion", descripcion);
        formData.set("expecificacionesCliente", expecificacionesCliente);
        formData.set("pagado", pagado);
        formData.set("terminado", terminado);
        formData.set("entregado", entregado);
        formData.set("costoTotal", costoTotal);
        formData.set("fechaEstimadaEntrega", fechaEstimadaEntrega);
        formData.set("cliente", cliente);

        dispatch(updatePedido(pedido._id, formData));

       console.log(
        cliente

       )
    };



    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[450px] max-h-[900px] overflow-auto rounded-md p-6">
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
                            Registrar pedido
                        </h3>
                    </div>
                    <Modal.Content>
                        <form className=" mt-20 px-2" onSubmit={onSubmit}>
                            <div className="grid gap-y-12  gap-x-5 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="nombre"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Nombre del pedido
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="ej: estampado , confeccion , areglo . . . "
                                        required
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="descripcion"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Descripcion del pedido
                                    </label>
                                    <textarea
                                        type="text"
                                        name="descripcion"
                                        className="outline-none border min-h-40 border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="Ingrese los detalles o la descripcion del pedido"
                                        required
                                        value={descripcion}
                                        onChange={(e) =>
                                            setDescripcion(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="especificacionespedido"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Especificaciones de pedido
                                    </label>
                                    <textarea
                                        type="text"
                                        name="especificacionespedido"
                                        className="outline-none border min-h-40 border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="Ingrese las especificaciones o requerimientos que tiene el pedido"
                                        value={expecificacionesCliente}
                                        onChange={(e) =>
                                            setExpecificacionesCliente(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="costoTotal"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Costo total
                                    </label>
                                    <NumericFormat
                                        name="costoTotal"
                                        value={costoTotal}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setCostoTotal(
                                                floatValue !== undefined
                                                    ? floatValue
                                                    : 0
                                            );
                                        }}
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        thousandSeparator={true}
                                        prefix={"$  "}
                                        decimalScale={0}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        required
                                        placeholder="Ingrese el precio"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="fechaEntregaEstimada"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Fecha estimada de entrega
                                    </label>
                                    <input
                                        type="date"
                                        className="outline-none border min-h-10  border-bordeInput text-gray-800 text-xs rounded-md block w-2/3 p-3 focus:ring-primario focus:ring-2 "
                                        name="fechaEntregaEstimada"
                                        value={fechaEstimadaEntrega}
                                        onChange={(e) =>
                                            setFechaEstimadaEntrega(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <Divider className="col-span-2 my-10" />

                                <div className="col-span-2">
                                    <label
                                        htmlFor="estado"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Estado de produccion
                                    </label>
                                    <select
                                        name="estado"
                                        value={terminado}
                                        onChange={(e) =>
                                            setTerminado(e.target.value)
                                        }
                                        className="outline-none border w-2/3 border-bordeInput text-gray-800 text-xs rounded-md block  p-3 focus:ring-primario focus:ring-2"
                                    >
                                        <option
                                            className="py-2 text-sm"
                                            value={false}
                                        >
                                            Pendiente
                                        </option>
                                        <option
                                            className="py-2 text-sm "
                                            value={true}
                                        >
                                            Finalizado
                                        </option>
                                    </select>
                                </div>

                                <div className="col-span-1  ">
                                    <label
                                        htmlFor="pagado"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Pagado
                                    </label>
                                    <select
                                        name="pagado"
                                        value={pagado}
                                        onChange={(e) =>
                                            setPagado(e.target.value)
                                        }
                                        className="outline-none border  border-bordeInput text-gray-800 text-xs rounded-md block  p-3 focus:ring-primario focus:ring-2"
                                    >
                                        <option
                                            className="py-2 text-sm "
                                            value={false}
                                        >
                                            No
                                        </option>
                                        <option
                                            className="py-2 text-sm "
                                            value={true}
                                        >
                                            Si
                                        </option>
                                    </select>
                                </div>

                                <div className="col-span-1  ">
                                    <label
                                        htmlFor="entregado"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Entregado
                                    </label>
                                    <select
                                        name="entregado"
                                        value={entregado}
                                        onChange={(e) =>
                                            setEntregado(e.target.value)
                                        }
                                        className="outline-none border  border-bordeInput text-gray-800 text-xs rounded-md block  p-3 focus:ring-primario focus:ring-2"
                                    >
                                        <option
                                            className="py-2 text-sm "
                                            value={false}
                                        >
                                            No
                                        </option>
                                        <option
                                            className="py-2 text-sm "
                                            value={true}
                                        >
                                            Si
                                        </option>
                                    </select>
                                </div>

                                <Divider className="col-span-2 my-10" />

                                <div className="col-span-2  ">
                                    <label
                                        htmlFor="cliente"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Cliente
                                    </label>
                                    <select
                                        name="cliente"
                                        value={cliente}
                                        onChange={(e) =>
                                            setCliente(e.target.value)
                                        }
                                        className="outline-none border w-full border-bordeInput text-gray-800 text-xs rounded-md block  p-3 focus:ring-primario focus:ring-2"
                                    >
                                        <option
                                            className="py-2 text-sm "
                                        >
                                            seleccione
                                        </option>

                                        {!clientes ? (
                                            <></>
                                        ) : (
                                            clientes.map((cliente) => (
                                                <option
                                                    key={cliente._id}
                                                    className="py-2 text-sm"
                                                    value={cliente._id}
                                                >
                                                    {cliente.nombre}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                

                                <Modal.Footer className=" col-span-2 flex justify-center w-full mt-16 mb-6">
                                    <Button
                                        type="submit "
                                        className="text-white h-10 inline-flex items-center bg-primario focus:ring-4 focus:outline-none font-medium  text-sm px-5 py-2.5 text-center  rounded hover:bg-primario hover:scale-105"
                                    >
                                        Guardar cambios
                                    </Button>
                                </Modal.Footer>
                            </div>
                        </form>
                    </Modal.Content>
                </Modal.Body>
            </Modal>
        </>
    );
};
