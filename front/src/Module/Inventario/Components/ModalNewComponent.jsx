import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// iconos
import { MdOutlineAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";
import { useNavigate } from "react-router-dom";
// Hook
import { useForm } from "../../../Hooks/useForm";
import {
    clearErrors,
    getProducts,
    newProduct,
} from "../../../Redux/actions/productoActions";
import { NEW_PRODUCT_RESET } from "../../../Redux/constants/productoConstants";

import { NumericFormat } from "react-number-format";

export const ModalNewComponent = () => {
    //  funciones modal
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
        (state) => state.newProduct
    );

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [stock, setStock] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(0);
    const [precio, setPrecio] = useState(0);
    const categorias = [
        "Oficina",
        "Materia Prima",
        "Tecnologia",
        "Hogar",
        "Ropa y Accesorios",
        "Alimentos y bebidas",
        "Limpieza y suministros",
        "Otros",
    ];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Producto registrado correctamente");
            navigate("/Inventario");
            closeModal();
            dispatch({ type: NEW_PRODUCT_RESET });
            dispatch(getProducts());

            setNombre("")
            setCategoria("")
            setStock(0)
            setStockMinimo(0)
            setPrecio(0)
        }
    }, [dispatch, toast, error, success]);

    const onSubmit = (event) => {
        event.preventDefault();

        


        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("categoria", categoria);
        formData.set("stock", stock);
        formData.set("stockMinimo", stockMinimo);
        formData.set("precio", precio);

        dispatch(newProduct(formData));

        dispatch(getProducts());
    };

    return (
        <>
            <Button
                onClick={openModal}
                className="bg-primario hover:scale-110 p-0 hover:bg-primario transition-all duration-300  rounded-full w-10 h-10 text-center fixed bottom-8 right-10  lg:static  xl:w-10 xl:h-10"
                type="button"
            >
                <span>
                    <MdOutlineAdd className="block text-2xl w-5 h-5  fill-white  lg:w-5" />
                </span>
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-3  w-[400px] rounded-md">
                    <div>
                        <Button
                            onClick={closeModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-2xl" />
                            </span>
                        </Button>
                        <h3 className=" text-base text-center font-medium m-3 text-black font-montserrat">
                            Nuevo Producto
                        </h3>
                    </div>
                    <Modal.Content>
                        <form
                            className=" mt-20 px-2"
                            onSubmit={onSubmit}
                            encType="application/json"
                        >
                            <div className="grid gap-12 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="nombre"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Nombre del producto
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="Nombre del producto"
                                        required
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-2 ">
                                    <label
                                        htmlFor="categoria"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Categoria
                                    </label>
                                    <select
                                        type="text"
                                        name="categoria"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3  focus:ring-primario focus:ring-2  "
                                        placeholder="Categoria del producto"
                                        required
                                        value={categoria}
                                        onChange={(e) =>
                                            setCategoria(e.target.value)
                                        }
                                    >
                                        <option
                                        >
                                            Seleccione una categoria
                                        </option>
                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria}
                                                value={categoria}
                                            >
                                                {categoria}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-1 ">
                                    <label
                                        htmlFor="stock"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Cantidad inicial
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                        required
                                        placeholder="0"
                                        value={stock}
                                        onChange={(e) =>
                                            setStock(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-1 ">
                                    <label
                                        htmlFor="stockMinimo"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Stock minimo
                                    </label>
                                    <input
                                        type="number"
                                        name="stockMinimo"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        placeholder="0"
                                        required=""
                                        value={stockMinimo}
                                        onChange={(e) =>
                                            setStockMinimo(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="precio"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Precio
                                    </label>
                                    <NumericFormat
                                        name="precio"
                                        value={precio}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setPrecio(
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

                                <Modal.Footer className=" col-span-2 flex justify-end w-full mt-14">
                                    <Button
                                        onClick={closeModal}
                                        className="text-black h-10 cursor-pointer inline-flex items-center font-medium  text-sm px-5 py-2.5 text-center bg-transparent hover:bg-transparent"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit "
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
