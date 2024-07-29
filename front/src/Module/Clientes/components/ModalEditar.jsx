import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import { MetaData } from "../../../Componentes Generales/MetaData/MetaData";
// iconos
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";

// Hook
import { useForm } from "../../../Hooks/useForm";

// data
import { clientes } from "../../../Data/Clientes";
import { clearErrors, getClienteDetails, getClientes, updateCliente } from "../../../Redux/actions/clienteActionts";
import { UPDATE_CLIENTE_RESET } from "../../../Redux/constants/clienteConstants";

export const ModalEditar = ({ clienteId, showModal, handleCloseModal }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { loading,  isUpdated, error: updateError } = useSelector( state => state.cliente );
    const { error,  cliente } = useSelector( state => state.clienteDetails );


    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [telefono2, setTelefono2] = useState("");

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!cliente || cliente._id !== clienteId || refresh) {
            dispatch(getClienteDetails(clienteId));
            setRefresh(false); // Reset refresh state after fetching details
        } else {
            setNombre(cliente.nombre || "");
            setTelefono(cliente.telefono || "");
            setTelefono2(cliente.telefono2 || "");
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Cliente Actualizado correctamente");
            dispatch(getClientes()); // Si tienes una acción para obtener la lista de clientes
            dispatch({ type: UPDATE_CLIENTE_RESET });
            handleCloseModal();
            setRefresh(true); // Trigger refresh after update
        }
    }, [dispatch, clienteId, cliente, error, updateError, isUpdated, navigate, handleCloseModal, refresh]);


    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("telefono", telefono);
        formData.set("telefono2", telefono2);

        dispatch(updateCliente(cliente._id , formData))
        
    };

    return (
        <>
            <MetaData  title={"Actualizar cliente"}/>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[500px] rounded-sm p-6">
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
                            Editar cliente
                        </h3>
                    </div>
                    <Modal.Content>
                        <form className=" mt-20 px-2" onSubmit={onSubmit}>
                            <div className="grid gap-y-12  gap-x-5 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="nombre"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Nombre del cliente
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="Nombre del cliente"
                                        required
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-1 ">
                                    <label
                                        htmlFor="telefono"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Telefono
                                    </label>
                                    <NumericFormat
                                        name="telefono"
                                        value={telefono}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setTelefono(
                                                floatValue !== undefined
                                                    ? floatValue
                                                    : 0
                                            );
                                        }}
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        prefix={"Tel :  "}
                                        decimalScale={0}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        required
                                    />
                                </div>

                                <div className="col-span-1 ">
                                    <label
                                        htmlFor="telefono2"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Telefono secundario
                                    </label>
                                    <NumericFormat
                                        name="telefono2"
                                        value={telefono2}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setTelefono2(
                                                floatValue !== undefined
                                                    ? floatValue
                                                    : 0
                                            );
                                        }}
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        
                                        prefix={"Tel :  "}
                                        decimalScale={0}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                    />
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
