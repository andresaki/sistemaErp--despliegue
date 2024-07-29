import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// iconos
import { MdHistory, MdOutlineAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";
import { useNavigate } from "react-router-dom";
// Hook
import { useForm } from "../../../Hooks/useForm";

import { NEW_PRODUCT_RESET } from "../../../Redux/constants/productoConstants";

import { NumericFormat } from "react-number-format";
import { BiHistory } from "react-icons/bi";
import { getMovimientos } from "../../../Redux/actions/stockActions";

export const ModalMovimientosStock = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovimientos()); // Despachar la acción para obtener productos
    }, [dispatch]);

    const { movimientos, error, loading } = useSelector(
        (state) => state.movimientosStock
    );



    //  funciones modal
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                onClick={openModal}
                className="border-none hover:bg-bg-secundario bg-transparent rounded-full flex items-center justify-center  h-10 focus:outline-none w-10 transition-all duration-300"
                type="button"
            >
                <span>
                    <BiHistory className="rounded-full h-6 w-6  lg:w-5 lg:h-5  fill-gray-700 transition-all duration-300 bg-transparent m-auto" />
                </span>
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3 w-full md:w-4/5 rounded-md">
                    <div>
                        <Button
                            onClick={closeModal}
                            className="p-0 bg-transparent hover:bg-bg-secundario  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="rounded-full h-6   w-6  lg:w-5 lg:h-5   text-gray-600 transition-all duration-300 bg-transparent m-auto" />
                            </span>
                        </Button>

                        <h2 className="text-center text-sm font-medium">
                            Historial de movimientos de stock
                        </h2>
                    </div>
                    <Modal.Content>
                        <div className=" overflow-x-auto overflow-y-auto max-h-96 mt-16 lg:mx-8 xl:mx-7 border-x 2xl:mx-16 2xl:mt-20">
                            <table className="w-full text-sm  text-left border text-gray-500 font-light">
                                <thead className="bg-white border-b">
                                    <tr className=" text-sm  text-black h-12 ">
                                        <th
                                            scope="col"
                                            className=" pl-5 pr-32  font-medium whitespace-nowrap"
                                        >
                                            Producto
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-28   font-medium"
                                        >
                                            Tipo
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-24  font-medium"
                                        >
                                            Cantidad
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-32 whitespace-nowrap   font-medium "
                                        >
                                            Fecha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {loading ? (
                                        <></>
                                    ) : (

                                        movimientos.slice().reverse().map((m) => (
                                            <tr key={m._id} className="  bg-white border-b cursor-default   h-9 hover:bg-gray-50 font-light text-xs text-neutral-600 ">
                                                <td className="pl-5 ">
                                                    {m.nombreproducto}
                                                </td>
                                                <td className="text-primario font-medium cursor-pointer">
                                                    {m.tipo}
                                                </td>
                                                <td className="pl-7">

                                                    {m.tipo === "entrada" ? "+ " : "- "}
                                                    {m.cantidad}
                                                </td>
                                                <td className=" font-medium text-primario">
                                                    {m.fechaCreacion}
                                                </td>
                                            
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Content>
                </Modal.Body>
            </Modal>
        </>
    );
};
