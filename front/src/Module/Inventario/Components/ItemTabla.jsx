import React from "react";
import { DropdownAccionesComponent } from "./DropdownAccionesComponent";

export const ItemTabla = ({ producto , index }) => {

    const formatDateWithoutTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
    
    return (
        <tr className="  bg-white border-b cursor-default   h-9 hover:bg-gray-50 font-light text-xs text-neutral-600 ">
            <td className="pl-10 ">{index} </td>
            <td className="text-primario font-medium cursor-pointer">
                {producto.nombre}
            </td>
            <td className="pl-4">{producto.stock}</td>
            <td className="pl-7 font-medium text-primario">
                {producto.stockMinimo}
            </td>
            <td> {formatDateWithoutTime(producto.fechaModificacion)}</td>
            <td>
                <DropdownAccionesComponent productoId={producto._id} />
            </td>
        </tr>
    );
};

export const ItemTablaLoading = () => {
    return (
        <tr className=" bg-white border-b cursor-default   h-9 hover:bg-gray-50 font-light text-xs text-neutral-600 ">
            <td className="pl-10  ssc-line w-7 ml-6 mt-4 block"> </td>

            <td className="text-primario cursor-pointer mr-3"><span className="w-52 ssc-line mt-2"></span></td>

            <td className=""><span className="w-32 ssc-line mt-2"></span></td>

            <td className=" font-medium text-primario">  <span className=" w-24 ssc-line mt-2"></span>   </td>
            <td className=""><span className="ssc-line mt-2 w-28"></span></td>
            <td> <span className="ssc-circle  w-6 h-6"></span>   </td>
        </tr>
    );
};


