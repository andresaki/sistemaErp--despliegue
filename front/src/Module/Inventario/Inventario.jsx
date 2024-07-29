import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/productoActions";

// iconos
import { GoHistory } from "react-icons/go";
import { PiEmptyBold } from "react-icons/pi";

// Keep react
import { Button, toast } from "keep-react";

// Menus y modales
import { ModalNewComponent } from "./Components/ModalNewComponent";

import { DropdownFilterComponent } from "./Components/DropdownFilterComponent";

// metadata
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";
import { ItemTabla, ItemTablaLoading } from "./Components/ItemTabla";
import { PaginationComponent } from "../../Componentes Generales/Pagination/Pagination";
import { ModalMovimientosStock } from "./Components/ModalMovimientosStock";

function Inventario() {
    const { productos, error, loading } = useSelector(
        (state) => state.products
    );

    const [productosData, setproductosData] = useState([]); // Estado para almacenar los productos
    const [search, setsearch] = useState(""); // Estado para almacenar la búsqueda
    const [categoria, setcategoria] = useState(""); // Estado para almacenar la categoría seleccionada
    const [stock, setstock] = useState(""); // Estado para almacenar la stock seleccionada
    const [paginaActual, setpaginaActual] = useState(1); // Estado para la página actual en la paginación
    let [productosFiltrados, setproductosFiltrados] = useState([]); // Estado para almacenar los productos filtrados
    const productosPorPagina = 8; // Número de productos por página
    const totalProductos = productosFiltrados.length; // Total de productos filtrados
    const siguienteIndex = paginaActual * productosPorPagina; // Índice final de los productos en la página actual
    const primerIndex = siguienteIndex - productosPorPagina; // Índice inicial de los productos en la página actual

    const [mostrarMensaje, setMostrarMensaje] = useState(false); // Mostrar mensaje si no hay productos para visualizar

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts()); // Despachar la acción para obtener productos
    }, [dispatch]);

    useEffect(() => {
        if (productos && productos.length > 0) {
            setproductosData(productos);
            setMostrarMensaje(false);
        } else if (productos && productos.length === 0) {
            setMostrarMensaje(true);
        }


        if (error) {
            toast.error("No se pudo obtener los productos", {
                position: "bottom-left",
                duration: 5000,
                classNames: {
                    toast: "w-auto pr-10 ",
                    title: " text-2xl ml-2",
                },
                style: {
                    boxShadow: "0px 0px 19px 8px rgba(0,0,0,0.1)",
                },
            });
        }
    }, [productos, error]);


    // Mostrar mensaje si no hay productos después de 3 segundos
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (productosData.length === 0 && !error) {
                // Verificar que no haya error para mostrar el mensaje
                setMostrarMensaje(true);
            }
        }, 3000);

        return () => clearTimeout(timerId);
    }, [productosData, error]);



    // Función para manejar el cambio en el input de búsqueda
    const searcher = (e) => {
        setsearch(e.target.value);
        setpaginaActual(1); // Reiniciar a la primera página en cada búsqueda
    };

    // Función para manejar el filtrado por categoría
    const filterCategory = (categoria) => {
        setcategoria(categoria);
        setpaginaActual(1); // Reiniciar a la primera página en cada filtrado
    };

    // Función para manejar el filtrado por stock
    const filterStock = (stock) => {
        setstock(stock);
        setpaginaActual(1); // Reiniciar a la primera página en cada filtrado
        console.log(stock);
    };

    // useEffect para filtrar los productos en base a la búsqueda y la categoría
    useEffect(() => {
        let resultado = [...productosData];
        resultado = resultado.slice().reverse()

        // Filtrar por categoría
        if (categoria) {
            resultado = resultado.filter(
                (producto) => producto.categoria === categoria
            );
        }

        // Filtrar por stock
        if (stock) {
            console.log("soct bien" + stock);

            if (stock === "Alto") {
                console.log("Alto filter");
                resultado = resultado.filter(
                    (producto) => producto.stock > producto.stockMinimo
                );
            }
            if (stock === "Escaso") {
                resultado = resultado.filter(
                    (producto) =>
                        producto.stock < producto.stockMinimo &&
                        producto.stock > 0
                );
            }
            if (stock === "Nulo") {
                resultado = resultado.filter(
                    (producto) => producto.stock === 0
                );
            }
        }

        // Filtrar por búsqueda
        if (search) {
            resultado = resultado.filter((dato) =>
                dato.nombre.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Actualizar el estado de productos filtrados
        setproductosFiltrados(resultado);
    }, [search, categoria, productosData, stock]);



    const categorias = [
        ...new Set(productosData.map((producto) => producto.categoria)),
    ];

    


    const listaProductos = productosFiltrados
        .slice(primerIndex, siguienteIndex)
        .map((producto , index) => (
            <ItemTabla producto={producto} key={producto._id} index={primerIndex + index + 1} />
        ));

    return (
        <main className="container mx-auto px-10 pt-10   self-center  lg:px-32 lg:pt-16   xl:px-24 xl:   2xl:px-32 2xl:pt-28  mt-20 ">
            <MetaData title={"Inventario"} />
            <div className="w-full flex justify-between items-center ">
                <div className=" flex items-center gap-4">
                    <div>
                        <input
                            className="outline-none border-b-2 pl-1 pb-[1px] border-primario w-48 h-7 font-light md:w-56  md:h-10  md:font-normal  lg:text-sm lg:pb-0 text-slate-600"
                            type="search "
                            placeholder="Buscar"
                            onChange={searcher}
                        />
                    </div>
                    <DropdownFilterComponent
                        categorias={categorias}
                        filterCategory={filterCategory}
                        filterStock={filterStock}
                        categoriaActual={categoria}
                        stockActual={stock}
                    />
                    <ModalMovimientosStock/>
                </div>
                <ModalNewComponent />
            </div>


            {mostrarMensaje ? (
                <>
                    <div className="mt-40 ">
                        <div className="px-10 py-4  w-full md:w-3/4 xl:w-1/2 2xl:w-2/5 mx-auto rounded-2xl  border-slate-200">
                            <div className="w-16 h-16 flex items-center mx-auto rounded-full bg-secundario ">
                                <PiEmptyBold
                                    size={30}
                                    className="mx-auto fill-primario "
                                />
                            </div>
                            <div className="my-6">
                                <h3 className="font-semibold text-center mb-4 text-lg">
                                    Opps!
                                </h3>
                                <p className="text-center text-gray-600">
                                    Parece que aún no hay productos registrados.
                                    Por favor, añada productos para verlos aqui.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className=" overflow-x-auto mt-16 lg:mx-8 xl:mx-7 border-x 2xl:mx-16 2xl:mt-20">
                    <table className="w-full text-sm  text-left border text-gray-500 font-light">
                        <thead className="bg-white border-b">
                            <tr className=" text-sm  text-black h-12 ">
                                <th
                                    scope="col"
                                    className=" pl-10 pr-20  font-medium text-gray-400 italic"
                                >
                                    #
                                </th>
                                <th scope="col" className="pr-48   font-medium">
                                    Nombre
                                </th>
                                <th scope="col" className="pr-28  font-medium">
                                    Unidades
                                </th>
                                <th
                                    scope="col"
                                    className="pr-32 whitespace-nowrap   font-medium "
                                    >
                                    Stock min
                                </th>
                                <th scope="col" className="pr-20   font-medium">
                                    Modificaion
                                </th>
                                <th scope="col" className="pr-32 "></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {loading
                                ? [...Array(3)].map((_, index) => (
                                      <ItemTablaLoading key={index} />
                                    ))
                                    : productosData.length > 0 && listaProductos}
                        </tbody>
                    </table>
                </div>
            )}
    {!mostrarMensaje && (
        <div className="h-28 flex justify-center items-center">
            <PaginationComponent
                itemsPorPagina={productosPorPagina} // Número de productos por página
                paginaActual={paginaActual} // Página actual
                totalItems={totalProductos} // Total de productos filtrados
                setpaginaActual={setpaginaActual} // Función para actualizar la página actual
            />
        </div>
    )}
        </main>
    );
}

export default Inventario;
