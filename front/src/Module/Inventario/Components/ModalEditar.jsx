import React, { useEffect } from "react";
import { useState } from "react";


// iconos
import { MdOutlineAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, toast } from "keep-react";

// Hook
import { useForm } from "../../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";

// metadata
import { MetaData } from "../../../Componentes Generales/MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import { getProducts, clearErrors, updateProduct, getProductDetails } from "../../../Redux/actions/productoActions";
import { NumericFormat } from "react-number-format";
import { UPDATE_PRODUCT_RESET } from "../../../Redux/constants/productoConstants";
import { getMovimientos } from "../../../Redux/actions/stockActions";


export const ModalEditar = ({ productoId, showModal, handleCloseModal }) => {
   

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading,  isUpdated,updateError } = useSelector( state => state.product );
    const { error,  product } = useSelector( state => state.productDetails );

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
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
        if(product && product._id !== productoId){
            dispatch(getProductDetails(productoId))
        }else{
            setNombre(product.nombre)
            setPrecio(product.precio)
            setCategoria(product.categoria)
            setStockMinimo(product.stockMinimo)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }

        if(updateError){
            toast.error(error)
            dispatch(clearErrors)
        }


        if(isUpdated){
            toast.success("Producto Actualizado correctamente");
            navigate("/Inventario")
            handleCloseModal()
            dispatch(getProducts());
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch(getMovimientos())

            setNombre("")
            setPrecio(0)
            
            setCategoria("")
            
            setStockMinimo(0)
        }

    },[dispatch, toast, error, isUpdated, updateError, product, productoId])



    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("categoria", categoria);
        formData.set("stockMinimo", stockMinimo);
        formData.set("precio", precio);

        dispatch(updateProduct(product._id , formData))
        
    };

    return (
        <>
            <MetaData title={ "Actualizar - " + product.nombre}/>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[400px] rounded-md bge">
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
                            Actualizar Producto
                        </h3>
                    </div>
                    <Modal.Content>
                        <form className=" mt-20 px-2" onSubmit={onSubmit} encType='application/json'>
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
                                        required
                                        value={stockMinimo}
                                        onChange={(e) =>
                                            setStockMinimo(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-1">
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
                                            setPrecio(floatValue !== undefined ? floatValue : 0);
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
                                        onClick={handleCloseModal}
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
