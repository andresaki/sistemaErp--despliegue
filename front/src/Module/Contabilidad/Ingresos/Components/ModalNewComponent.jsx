import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

// iconos
import { MdOutlineAdd } from "react-icons/md";

import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";
import { clearErrors, getIngresos, newIngreso } from "../../../../Redux/actions/ingresoActions";
import { NEW_INGRESO_RESET } from "../../../../Redux/constants/ingresoConstants";

// Hook


export const ModalNewComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, success } = useSelector( (state) => state.newIngreso );

    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState(0);

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            toast.success("Ingreso registrado correctamente");
            navigate("/Contabilidad/Ingresos");
            closeModal();
            dispatch({ type: NEW_INGRESO_RESET });
            dispatch(getIngresos())

            setCategoria("")
            setDescripcion("")
            setMonto(0)
        }

    }, [dispatch, toast, error, success])

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("categoria", categoria);
        formData.set("descripcion", descripcion);
        formData.set("monto", monto);

        dispatch(newIngreso(formData));
        dispatch(getIngresos());
    };

    const categorias = [
        "Salario",
        "Alquiler",
        "Venta",
        "Pedido",
        "Servicio",
        "Propina",
        "Otros",
    ];
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
                <Modal.Body className="space-y-3  w-[450px] max-h-[900px] overflow-auto rounded-md p-6">
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
                            Nuevo ingreso
                        </h3>
                    </div>
                    <Modal.Content>
                        <form className=" mt-20 px-2" onSubmit={onSubmit}>
                            <div className="grid gap-y-12  gap-x-0 grid-cols-2">
                                

                                {/* Monto */}
                                <div className="col-span-1">
                                    <label
                                        htmlFor="monto"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Monto
                                    </label>
                                    <NumericFormat
                                        name="monto"
                                        value={monto}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setMonto(
                                                floatValue !== undefined
                                                    ? floatValue
                                                    : 0
                                            );
                                        }}
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-5/6 p-3 focus:ring-primario focus:ring-2 "
                                        thousandSeparator={true}
                                        prefix={"$  "}
                                        decimalScale={0}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        required
                                        placeholder="Ingrese el monto"
                                    />
                                </div>

                                {/* categoria */}
                                <div className="col-span-1 ">
                                    <label
                                        htmlFor="categoria"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Categoria
                                    </label>
                                    <select
                                        value={categoria}
                                        onChange={(e) =>
                                            setCategoria(e.target.value)
                                        }
                                        name="categoria"
                                        className="outline-none border  border-bordeInput text-gray-800 text-xs rounded-md block w-6/6 p-3 focus:ring-primario focus:ring-2"
                                    >
                                        <option className="py-2 text-sm " >
                                            Selecciona una categoria
                                        </option>
                                        
                                        {categorias.map((c) => (
                                            <option key={c} className="py-2 text-sm " value={c}>
                                            {c}
                                        </option>
                                        ))}
                                    </select>
                                </div>

                                {/* descripcion */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="descripcion"
                                        className="block mb-3  text-xs font-medium text-black"
                                    >
                                        Descripcion del ingreso
                                    </label>
                                    <textarea
                                        type="text"
                                        name="descripcion"
                                        className="outline-none border min-h-40 border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="Agrega una descripcion"
                                        value={descripcion}
                                        onChange={(e) =>
                                            setDescripcion(e.target.value)
                                        }
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
                                        className="text-white h-10 inline-flex items-center bg-primario focus:ring-4 focus:outline-none font-medium  text-xs px-5 py-2.5 text-center  rounded-md hover:bg-primario hover:scale-105"
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
