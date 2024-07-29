import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// iconos
import { MdOutlineAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";

// Hook
import { useForm } from "../../../Hooks/useForm";

import { clearErrors, getClientes, newCliente } from "../../../Redux/actions/clienteActionts";
import { NEW_CLIENTE_RESET } from "../../../Redux/constants/clienteConstants";
import { NumericFormat } from "react-number-format";

export const ModalNewComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };


    // metodo, useefect...
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector(
        (state) => state.newCliente
    );


    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [telefono2, setTelefono2] = useState("");



    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }

        if (success) {
            toast.success("Cliente registrado correctamente");
            navigate("/Clientes");
            closeModal();
            dispatch({ type: NEW_CLIENTE_RESET });
            dispatch(getClientes())

            setNombre("")
            setTelefono("")
            setTelefono2("")
        }
    }, [dispatch, toast, error, success])

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("telefono", telefono);
        formData.set("telefono2", telefono2);

        dispatch(newCliente(formData));
        dispatch(getClientes());
    };


    return (
        <>
            <Button
                onClick={openModal}
                className="bg-primario hover:scale-110 p-0 hover:bg-primario transition-all duration-300 z-10 rounded-full w-10 h-10 text-center fixed bottom-8 right-10  lg:static  xl:w-10 xl:h-10"
                type="button"
            >
                <span>
                    {" "}
                    <MdOutlineAdd className="block text-2xl w-5 h-5  fill-white  lg:w-5" />
                </span>
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3  w-[500px] rounded-md p-6">
                    <div>
                        <Button
                            onClick={closeModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-2xl" />
                            </span>
                        </Button>
                        <h3 className=" text-base text-center font-medium mt-9 text-black font-montserrat">
                            Registrar cliente
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
                                        minLength="10"
                                        prefix={"Tel :  "}
                                        decimalScale={0}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        type="tel"
                                    />
                                </div>

                                <Modal.Footer className=" col-span-2 flex justify-end w-full mt-14">
                                    <Button
                                        type="button"
                                        onClick={closeModal}
                                        className="text-black h-10 cursor-pointer inline-flex items-center font-medium  text-sm px-5 py-2.5 text-center bg-transparent hover:bg-transparent"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit "
                                        className="text-white h-10 inline-flex items-center bg-primario focus:ring-4 focus:outline-none font-medium  text-sm px-5 py-2.5 text-center  rounded hover:bg-primario hover:scale-105"
                                    >
                                        Guardar
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
