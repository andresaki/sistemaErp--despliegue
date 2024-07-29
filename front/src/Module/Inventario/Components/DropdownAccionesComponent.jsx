import React from "react";
import { useState } from "react";

// iconos
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { LuClipboardEdit } from "react-icons/lu";

// Keep react
import { Dropdown} from "keep-react";

// componentes modals
import { ModalEditar } from "./ModalEditar";
import { ModalEliminar } from "./ModalEliminar";
import { ModalStock } from "./ModalStock";




export const DropdownAccionesComponent = ({ productoId }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [Tipo, setTipo] = useState("");

    const handleOpenModal = (tipo) => {
        setShowModal(true);
        setTipo(tipo);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Dropdown
                action={
                    <BiDotsHorizontalRounded
                        size={32}
                        className="hover:bg-blue-100  rounded-full w-6 h-6  transition-all duration-300 bg-transparent text-black m-auto"
                    />
                }
                actionClassName="border-none rounded-full py-1  focus:outline-none w-10"
                className="p-0  py-1 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                placement="right"
            >
                <Dropdown.List>
                    <Dropdown.Item
                        className="hover:text-primario pl-4   flex items-center text-gray-700 h-8"
                        onClick={() => handleOpenModal("Editar")}
                    >
                        <AiOutlineEdit size={20} className="stroke-0 " />
                        <p className=" ml-2 text-xs">Editar</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="hover:text-primario pl-4   flex items-center text-gray-700  h-8 "
                        onClick={() => handleOpenModal("Eliminar")}
                    >
                        <AiOutlineDelete size={20} />
                        <p className=" ml-2 text-xs">Eliminar</p>
                    </Dropdown.Item>
                    <Dropdown.Item className="hover:text-primario pl-4   flex items-center text-gray-700  h-8"
                        onClick={() => handleOpenModal("Stock")}
                    >
                        <LuClipboardEdit size={20} />
                        <p className=" ml-2 text-xs">Stock</p>
                    </Dropdown.Item>
                </Dropdown.List>
            </Dropdown>

            {showModal && Tipo === "Editar" && (
                <ModalEditar
                    productoId={productoId}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {showModal && Tipo === "Eliminar" && (
                <ModalEliminar
                    productoId={productoId}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {showModal && Tipo === "Stock" && (
                <ModalStock
                    productoId={productoId}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};
