import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// iconos
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";

// data
import {
    getProductDetails,
    getProducts,
} from "../../../Redux/actions/productoActions";
import {
    clearErrors,
    newMovimientoStock,
} from "../../../Redux/actions/stockActions";
import { CLEAR_ERRORS, NEW_MOVIMIENTO_STOCK_RESET } from "../../../Redux/constants/stockConstants";

import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

export const ModalStock = ({ productoId, showModal, handleCloseModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProductDetails(productoId));
    }, []);
    // form
    const [tipo, setTipo] = useState("");
    const [Cantidad, setCantidad] = useState(0);

    const { product, loading } = useSelector((state) => state.productDetails);
    const { error, success } = useSelector((state) => state.newMovimientoStock);


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }

        if (success) {
            toast.success("Movimiento de stock hecho correctamente");
            navigate("/Inventario");
            handleCloseModal();
            dispatch({ type: NEW_MOVIMIENTO_STOCK_RESET });
            dispatch(getProducts());
        }
    }, [dispatch, toast, error, success]);

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("tipo", tipo);
        formData.set("cantidad", Cantidad);
        formData.set("producto", product._id);
        formData.set("nombreproducto", product.nombre);
        dispatch(newMovimientoStock(formData));

        console.log(tipo, Cantidad, productoId, product._id, product.nombre);
    };

    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[320px] rounded-md bge">
                    <div>
                        <Button
                            onClick={handleCloseModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-2xl" />
                            </span>
                        </Button>
                        <h3 className=" text-base text-center font-medium m-3 text-black font-montserrat">
                            Modificar Stock
                        </h3>
                    </div>
                    <Modal.Content>
                        <form className=" mt-16 px-2">
                            <div className="">
                                <div className="grid gap-6">
                                    <div className="flex items-center ">
                                        <div className="grid gap-1.5">
                                            <h3 className="font-semibold text-primario text-base leading-none mb-1">
                                                {!loading && product.nombre}
                                            </h3>
                                            <p className="text-xs leading-none text-gray-800 flex gap-3">
                                                <strong>
                                                ID: 
                                                </strong>
                                                
                                                {!loading && product._id}
                                            </p>
                                            <p className="text-xs leading-none text-gray-800 flex gap-3">
                                                <strong>
                                                Cantidad actual:
                                                </strong>
                                                
                                                {!loading && product.stock}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-1 mt-10">
                                        <label
                                            className="block mb-1 font-montserrat text-xs font-medium text-black"
                                            htmlFor="tipo"
                                        >
                                            Tipo de Movimiento
                                        </label>
                                        <select
                                            name="tipo"
                                            id="tipo"
                                            value={tipo}
                                            onChange={(e) =>
                                                setTipo(e.target.value)
                                            }
                                            className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        >

                                            <option>
                                                Seleccione el tipo 
                                            </option>
                                            <option value={"entrada"}>
                                                Entrada
                                            </option>
                                            <option value={"salida"}>
                                                Salida
                                            </option>
                                        </select>
                                    </div>

                                    
                                    <div className="grid gap-1">
                                        <label
                                            className="block mb-1 font-montserrat text-xs font-medium text-black"
                                            htmlFor="cantidad"
                                        >
                                            Cantidad
                                        </label>


                                        <NumericFormat
                                        name="cantidad"
                                        value={Cantidad}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setCantidad(
                                                floatValue !== undefined
                                                    ? floatValue
                                                    : 0
                                            );
                                        }}
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        thousandSeparator={true}
                                        suffix={" unidades"}
                                        decimalScale={0}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        required
                                        placeholder="0 unidades"
                                    />
                                        
                                    </div>
                                </div>

                                <Modal.Footer className=" col-span-2 flex justify-end w-full mt-14">
                                    <Button
                                        onClick={handleCloseModal}
                                        className="text-black h-10 cursor-pointer inline-flex items-center font-medium  text-sm px-5 py-2.5 text-center bg-transparent hover:bg-transparent"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={onSubmit}
                                        className="text-white h-9 inline-flex items-center bg-primario focus:ring-4 focus:outline-none font-medium  text-sm px-5 py-2.5 text-center  rounded hover:bg-primario hover:scale-105"
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
