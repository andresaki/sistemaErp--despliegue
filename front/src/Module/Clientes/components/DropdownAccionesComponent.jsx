import React from "react";
import { useState } from "react";

// iconos
import {  BiDotsHorizontalRounded} from "react-icons/bi";
import { AiOutlineEdit, AiOutlineDelete,  AiOutlineAlignLeft} from "react-icons/ai";

// Keep react
import { Dropdown } from "keep-react";

import { ModalDetalles } from "./ModalDetalles";
import { ModalEditar } from "./ModalEditar";
import { ModalEliminar } from "./ModalEliminar";

export const DropdownAccionesComponent = ({ clienteId }) => {
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
                        className="hover:text-primario pl-4   flex items-center text-gray-700  h-8"
                        onClick={() => handleOpenModal("Detalles")}
                    >
                        <AiOutlineAlignLeft size={20} />
                        <p className=" ml-2 text-xs">Detalles</p>
                    </Dropdown.Item>
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
                </Dropdown.List>
            </Dropdown>

            {showModal && Tipo === "Detalles" && (
                <ModalDetalles
                    clienteId={clienteId}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {showModal && Tipo === "Editar" && (
                <ModalEditar
                    clienteId={clienteId}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {showModal && Tipo === "Eliminar" && (
                <ModalEliminar
                    clienteId={clienteId}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};
