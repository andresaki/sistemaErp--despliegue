import React from "react";

// iconos
import { CiFilter} from "react-icons/ci";
import {  MdCheck} from "react-icons/md";

// Keep react
import { Dropdown, Divider} from "keep-react";


export const DropdownFilterComponent = ({
    filterCategoria,
    categoria,
    categorias,
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
            className="p-0  py-1 w-52 origin-top-right rounded-md bg-white shadow-sm focus:outline-none"
            placement="right-start"
        >
            <Dropdown.List>
            <Dropdown.Item
                    onClick={() => filterCategoria("")}
                    className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                        categoria === "" && `pl-3 font-semibold`
                    }`}
                >
                    {categoria === "" && <MdCheck size={20} fontWeight={100} />}

                    <p className=" ml-1 text-sm">Todas</p>
                </Dropdown.Item>

                {categorias.map((c) => (
                    <Dropdown.Item
                        onClick={() => filterCategoria(c)}
                        key={c}
                        className={` pl-10  flex items-center text-gray-600 hover:text-primario cursor-default hover:bg-transparent ${
                            categoria === c && `pl-3 font-semibold`
                        }`}
                    >
                        {categoria === c && (
                            <MdCheck size={20} fontWeight={100} />
                        )}

                        <p className=" ml-1 text-sm"> {c}</p>
                    </Dropdown.Item>
                ))}
            </Dropdown.List>
        </Dropdown>
    );
};
