import React from "react";

// iconos
import { CiFilter } from "react-icons/ci";
import { BiCategory, BiFilter, BiFilterAlt } from "react-icons/bi";
import { MdFilter, MdFilter1, MdFilterAlt, MdFilterAltOff, MdFilterBAndW, MdFilterCenterFocus, MdFilterList, MdOutlineInventory } from "react-icons/md";
import { MdBrightness1 } from "react-icons/md";

// Keep react
import { Dropdown } from "keep-react";

export const DropdownFilterComponent = ({
    categorias,
    filterCategory,
    filterStock,
    categoriaActual,
    stockActual,
}) => {
    return (
        <Dropdown
            action={
                <BiFilterAlt

                    className=" rounded-full h-6     w-6  lg:w-5 lg:h-5   fill-gray-700 transition-all duration-300 bg-transparent m-auto"
                />
            }
            actionClassName="border-none hover:bg-secundario  rounded-full flex items-center justify-center  h-10 focus:outline-none w-10 transition-all duration-300"
            className="p-0  py-1 w-48 origin-top-right rounded-md bg-white shadow-sm focus:outline-none"
            placement="right-start"
        >
            <Dropdown.List>
                <Dropdown.Item className=" pl-3  flex items-center text-primario font-semibold cursor-default hover:bg-transparent ">
                    <BiCategory
                        size={20}
                        fontWeight={100}
                        className="stroke-0 "
                    />
                    <p className=" ml-1 text-sm">Categorias</p>
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={() => filterCategory("")}
                    className={` hover:text-primario pl-9   flex items-center text-gray-600 h-7   ${
                        categoriaActual === "" && `pl-6 font-semibold`
                    } `}
                >
                    {categoriaActual === "" && (
                        <MdBrightness1
                            size={5}
                            fontWeight={100}
                            className="fill-black "
                        />
                    )}
                    <p className=" ml-3 text-sm">Todas</p>
                </Dropdown.Item>

                {categorias.map((categoria) => (
                    <Dropdown.Item
                        onClick={() => filterCategory(categoria)}
                        key={categoria}
                        className={`hover:text-primario pl-9   flex items-center text-gray-600 h-7  ${
                            categoriaActual == categoria && `pl-6 font-semibold`
                        }`}
                    >
                        {categoriaActual === categoria && (
                            <MdBrightness1
                                size={5}
                                fontWeight={100}
                                className="fill-black "
                            />
                        )}
                        <p className=" ml-3 text-sm">{categoria}</p>
                    </Dropdown.Item>
                ))}

                {/* Stok */}
                <Dropdown.Item className=" pl-3  flex items-center text-primario font-semibold cursor-default hover:bg-transparent mt-3 ">
                    <MdOutlineInventory
                        size={20}
                        fontWeight={100}
                        className="stroke-0 "
                    />
                    <p className=" ml-1 text-sm">Stock</p>
                </Dropdown.Item>

                {/* item stock */}

                <Dropdown.Item
                    onClick={() => filterStock("")}
                    className={`hover:text-primario pl-9   flex items-center text-gray-600 h-7 ${
                        stockActual == "" && `pl-6 font-semibold`
                    }`}
                >
                    {stockActual === "" && (
                        <MdBrightness1
                            size={5}
                            fontWeight={100}
                            className="fill-black "
                        />
                    )}
                    <p className=" ml-3 text-sm">Todo</p>
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={() => filterStock("Alto")}
                    className={`hover:text-primario pl-9   flex items-center text-gray-600 h-7 ${
                        stockActual == "Alto" && `pl-6 font-semibold`
                    }`}
                >
                    {stockActual === "Alto" && (
                        <MdBrightness1
                            size={5}
                            fontWeight={100}
                            className="fill-black "
                        />
                    )}
                    <p className=" ml-3 text-sm">Alto</p>
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={() => filterStock("Escaso")}
                    className={`hover:text-primario pl-9   flex items-center text-gray-600 h-7 ${
                        stockActual == "Escaso" && `pl-6 font-semibold`
                    }`}
                >
                    {stockActual === "Escaso" && (
                        <MdBrightness1
                            size={5}
                            fontWeight={100}
                            className="fill-black "
                        />
                    )}
                    <p className=" ml-3 text-sm">Escaso</p>
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => filterStock("Nulo")}
                    className={`hover:text-primario pl-9   flex items-center text-gray-600 h-7 ${
                        stockActual == "Nulo" && `pl-6 font-semibold`
                    }`}
                >
                    {stockActual === "Nulo" && (
                        <MdBrightness1
                            size={5}
                            fontWeight={100}
                            className="fill-black "
                        />
                    )}
                    <p className=" ml-3 text-sm">Nulo</p>
                </Dropdown.Item>
            </Dropdown.List>
        </Dropdown>
    );
};
