import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// iconos
import {
    MdLogout,
    MdOutlineMenu,
    MdOutlineNotificationsNone,
} from "react-icons/md";
import { RiStackLine, RiSettings3Line } from "react-icons/ri";
import { UserCircle } from "phosphor-react";

// Keep react
import { Divider, Drawer, Dropdown, toast } from "keep-react";
import { logout } from "../../Redux/actions/userActions";
import { getProducts } from "../../Redux/actions/productoActions";
import { PiEmptyBold } from "react-icons/pi";

function Header() {
    const [isOpenHeader, setisOpenHeader] = useState(false);
    const { user, loading } = useSelector((state) => state.auth);

    return (
        <header
            id="header"
            className={` text-gray-600 z-10 bg-white fixed top-0 left-0 w-full transition duration-700 z-20" ${
                isOpenHeader ? "shadow-xl" : "" //pone sombra cuando esta abierto el menu
            } `}
        >
            <div className="container mx-auto flex p-5 items-center flex-wrap lg:flex-nowrap">
                {/* Logo de la empresa */}
                <Link
                    className="flex flex-1 font-medium items-center text-gray-900  cursor-pointer "
                    to="/"
                >
                    <RiStackLine className="w-10 h-10 text-white p-2  bg-primario rounded-full" />
                    {!user ? (
                        <span className="ml-3 text-xl font-medium">
                            Empresa
                        </span>
                    ) : loading ? (
                        <div className="ssc-line w-16"></div>
                    ) : (
                        <span className="ml-3 text-xl font-medium">
                            {user.nombreEmpresa}
                        </span>
                    )}
                </Link>

                {/* boton para abrir menu para pantallas pequeñas */}
                <button
                    onClick={() => setisOpenHeader(!isOpenHeader)}
                    id="btn_header"
                    className=" sm:block lg:hidden bg-transparent hover:bg-blue-100 rounded-full p-1"
                    type="button"
                >
                    <MdOutlineMenu className="fill-primario w-6 h-6" />
                </button>

                <nav
                    id="nav"
                    className={`px-10 sm:px-72  lg:px-0 w-screen lg:w-auto flex-grow  lg:flex gap-5 flex-wrap items-center text-base justify-center ${
                        isOpenHeader ? "block" : "hidden"
                    }`}
                >
                    <NavLinkComponent to={"/"} text={"Home"} />
                    <NavLinkComponent to={"/Inventario"} text={"Inventario"} />
                    <NavLinkComponent to={"/Clientes"} text={"Clientes"} />
                    <NavLinkComponent to={"/Pedidos"} text={"Pedidos"} />
                    <NavLinkComponent
                        to={"/Contabilidad"}
                        text={"Contabilidad"}
                    />
                </nav>

                {/* separador para pantallas pequeñas */}
                <div
                    id="separador"
                    className={` mx-auto w-[calc(100%-3rem)] h-1  border-b border-gray-300  my-10 lg:hidden" ${
                        isOpenHeader ? "" : "hidden"
                    }`}
                ></div>

                <div
                    className={` justify-end  lg:m-0 w-full text-center lg:flex-1 lg:justify-end lg:flex items-center ${
                        isOpenHeader ? "" : "hidden"
                    }`}
                >
                    <DropdownComponent></DropdownComponent>
                </div>
            </div>
        </header>
    );
}

const NavLinkComponent = ({ to, text }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `block my-9 lg:my-0 text-gray-500 text-center cursor-pointer hover:text-gray-900 hover:font-medium hover:border-primario hover:border-b-2 text-sm  transition-all ${
                    isActive
                        ? " mt-9 lg:mt4 text-gray-900 font-medium border-primario border-b-2"
                        : ""
                }`
            }
        >
            {text}
        </NavLink>
    );
};

const DropdownComponent = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        toast.success("LogOut exitoso");
    };

    const [isOpen, setIsOpen] = useState(false);
    const [stockNulo, setStockNulo] = useState([]);
    const [stockEscaso, setStockEscaso] = useState([]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const { productos, error, loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getProducts()); // Despachar la acción para obtener productos
    }, [dispatch]);

    useEffect(() => {
        if (productos) {
            const productosConStockNulo = productos.filter(
                (producto) => producto.stock === 0
            );
            setStockNulo(productosConStockNulo);
            const productosConStockEscaso = productos.filter(
                (producto) =>
                    producto.stock < producto.stockMinimo && producto.stock > 0
            );
            setStockEscaso(productosConStockEscaso);
        }
    }, [productos]);

    return (
        <> 
            <Dropdown
                action={
                    <UserCircle
                        size={32}
                        className="hover:bg-blue-100 z-50 rounded-full w-8 h-8 transition-all duration-300 bg-transparent text-primario m-auto"
                    />
                }
                actionClassName="border-none rounded-full py-1 z-50 focus:outline-none w-10"
                className="p-0 py-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                placement="bottom"
            >
                <Dropdown.List>
                    <Dropdown.Item
                        className="hover:text-primario pl-4 flex items-center text-gray-700"
                        onClick={handleOpenModal}
                    >
                        <MdOutlineNotificationsNone
                            size={24}
                            fontWeight={100}
                            className="stroke-0"
                        />
                        <p className="ml-3 text-sm">Notificaciones</p>
                    </Dropdown.Item>

                    <Dropdown.Item className="pl-4">
                        <Link
                            to="/configuracion/MiCuenta"
                            className="hover:text-primario flex items-center text-gray-700 m-0"
                        >
                            <RiSettings3Line size={24} />
                            <p className="ml-5 text-sm">Ajustes</p>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={logoutHandler}
                        className="hover:text-primario pl-5 flex items-center text-gray-700"
                    >
                        <MdLogout
                            size={20}
                            fontWeight={100}
                            className="stroke-0"
                        />
                        <p className="ml-3 text-sm">Cerrar sesión</p>
                    </Dropdown.Item>
                </Dropdown.List>
            </Dropdown>
            <Drawer position="left" isOpen={isOpen} onClose={handleCloseModal}>
                <Drawer.Content className="md:w-[400px] rounded-sm p-7">
                    <h3 className="text-lg text-left font-semibold mt-4 text-primario mb-12">
                        Notificaciones
                    </h3>

                    <div className="grid gap-14">
                        {stockNulo.length === 0 && stockEscaso.length === 0 ? (
                            <div className="mt-40">
                                <div className="px-10 py-4 w-full md:w-3/4 xl:w-1/2 2xl:w-2/5 mx-auto rounded-2xl border-slate-200">
                                    <div className="w-16 h-16 flex items-center mx-auto rounded-full bg-secundario">
                                        <PiEmptyBold
                                            size={30}
                                            className="mx-auto fill-primario"
                                        />
                                    </div>
                                    <div className="my-6">
                                        <h3 className="font-semibold text-center mb-4 text-lg">
                                            ¡Opps!
                                        </h3>
                                        <p className="text-center text-gray-600">
                                            No hay nada por notificar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {stockNulo.length > 0 && (
                                    <div>
                                        <Divider/>
                                        <div className="text-sm rounded-md font-semibold my-3">
                                            Productos con stock en ceros
                                        </div>
                                        {stockNulo.map((producto, index) => (
                                            <div
                                                className="p-2 ml-1 bg-zinc-50 w-full rounded-md my-2 flex items-center justify-between"
                                                key={index}
                                            >
                                                <div>
                                                    <h4 className="font-medium text-sm">
                                                        {producto.nombre}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        Stock actual :{" "}
                                                        {producto.stock}
                                                    </p>
                                                </div>
                                                <button className="text-xs px-2 bg-primario py-1.5 font-medium text-white rounded-md">
                                                    ver detalles
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {stockEscaso.length > 0 && (
                                    <div>
                                        <Divider/>
                                        <div className="text-sm rounded-md font-semibold my-3">
                                            Productos con stock escaso
                                        </div>
                                        {stockEscaso.map((producto, index) => (
                                            <div
                                                className="p-2 ml-1 bg-zinc-50  w-full rounded-md my-2 flex items-center justify-between"
                                                key={index}
                                            >
                                                <div>
                                                    <h4 className="font-medium text-sm">
                                                        {producto.nombre}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        Stock actual :{" "}
                                                        {producto.stock}
                                                    </p>
                                                </div>
                                                <button className="text-xs px-2 bg-primario py-1.5 font-medium text-white rounded-md">
                                                    ver detalles
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Drawer.Content>
            </Drawer>{" "}
        </>
    );
};

export default Header;
