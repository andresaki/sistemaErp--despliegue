import React from "react";

// iconos
import { CiFilter } from "react-icons/ci";
import { MdCheck } from "react-icons/md";

// Keep react
import { Dropdown, Divider } from "keep-react";

export const DropdownFilterComponent = ({
    filterA_Z,
    A_Z,
    filterEntregado,
    entregado,
    filterPagado,
    pagado,
    filterTerminado,
    terminado,
}) => {
    return (
        <Dropdown
            action={
                <CiFilter
                    size={32}
                    className=" rounded-full h-6     w-6  lg:w-5 lg:h-5   fill-gray-600 transition-all duration-300 bg-transparent m-auto"
                />
            }
            actionClassName="border-none hover:bg-blue-100  rounded-full flex items-center justify-center  h-10 focus:outline-none w-10 transition-all duration-300"
            className="p-0  py-1 w-52 origin-top-right rounded-md bg-white shadow-sm focus:outline-none z-50"
            placement="right-start"
        >
            <Dropdown.List>
                
                <Dropdown.Item
                    onClick={() => filterA_Z(false)}
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        A_Z == false && `pl-3 font-semibold`
                    }`}
                >
                    {A_Z == false && <MdCheck size={20} fontWeight={100} />}
                    <p className=" ml-1 text-sm">Descendente</p>
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => filterA_Z(true)}
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        A_Z == true && `pl-3 font-semibold`
                    }`}
                >
                    {A_Z == true && <MdCheck size={20} fontWeight={100} />}
                    <p className=" ml-1 text-sm">De la A - Z</p>
                </Dropdown.Item>

                <Divider className="w-11/12 mx-auto my-2" />

                <Dropdown.Item
                    onClick={() =>
                        terminado === "pendiente"
                            ? filterTerminado("")
                            : filterTerminado("pendiente")
                    }
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        terminado == "pendiente" && `pl-3 font-semibold`
                    }`}
                >
                    {terminado == "pendiente" && (
                        <MdCheck size={20} fontWeight={100} />
                    )}
                    <p className=" ml-1 text-sm">Pendientes</p>
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={() =>
                        terminado === "Completados"
                            ? filterTerminado("")
                            : filterTerminado("Completados")
                    }
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        terminado === "Completados" && `pl-3 font-semibold`
                    }`}
                >
                    {terminado === "Completados" && (
                        <MdCheck size={20} fontWeight={100} />
                    )}
                    <p className=" ml-1 text-sm">Completados</p>
                </Dropdown.Item>

                <Divider className="w-11/12 mx-auto my-2" />

                <Dropdown.Item
                    onClick={() =>
                        entregado === "reclamado"
                            ? filterEntregado("")
                            : filterEntregado("reclamado")
                    }
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        entregado === "reclamado" && `pl-3 font-semibold`
                    }`}
                >
                    {entregado === "reclamado" && (
                        <MdCheck size={20} fontWeight={100} />
                    )}
                    <p className=" ml-1 text-sm">Reclamado</p>
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={() =>
                        entregado === "NoReclamado"
                            ? filterEntregado("")
                            : filterEntregado("NoReclamado")
                    }
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        entregado === "NoReclamado" && `pl-3 font-semibold`
                    }`}
                >
                    {entregado === "NoReclamado" && (
                        <MdCheck size={20} fontWeight={100} />
                    )}
                    <p className=" ml-1 text-sm">No reclamado</p>
                </Dropdown.Item>

                <Divider className="w-11/12 mx-auto my-2" />







                <Dropdown.Item
                    onClick={() =>
                        pagado === "pagado"
                            ? filterPagado("")
                            : filterPagado("pagado")
                    }
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        pagado === "pagado" && `pl-3 font-semibold`
                    }`}
                >
                    {pagado === "pagado" && (
                        <MdCheck size={20} fontWeight={100} />
                    )}
                    <p className=" ml-1 text-sm">Pagado</p>
                </Dropdown.Item>




                <Dropdown.Item
                    onClick={() =>
                        pagado === "Nopagado"
                            ? filterPagado("")
                            : filterPagado("Nopagado")
                    }
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        pagado === "Nopagado" && `pl-3 font-semibold`
                    }`}
                >
                    {pagado === "Nopagado" && (
                        <MdCheck size={20} fontWeight={100} />
                    )}
                    <p className=" ml-1 text-sm">No pagado</p>
                </Dropdown.Item>
            </Dropdown.List>
        </Dropdown>
    );
};
