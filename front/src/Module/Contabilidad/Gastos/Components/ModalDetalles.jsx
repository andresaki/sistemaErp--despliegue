import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// iconos
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCloseOutline, IoCalendarOutline } from "react-icons/io5";

// Keep react
import { Button, Modal, Divider } from "keep-react";

// data
import { ingresos } from "../../../../Data/Ingresos";
import {
    clearErrors,
    getGastoDetails,
} from "../../../../Redux/actions/gastoActions";

export const ModalDetalles = ({ gastoId, showModal, handleCloseModal }) => {
    const dispatch = useDispatch();

    const { error, gasto, loading } = useSelector(
        (state) => state.gastoDetails
    );

    useEffect(() => {
        dispatch(getGastoDetails(gastoId));

        if (error) {
            toast.error(error), dispatch(clearErrors());
        }
    }, [dispatch, error]);

    function convertirFecha(fechaString) {
        // 1. Separar la fecha en partes
        const [anio, mes, dia] = fechaString.split("-");

        // 2. Convertir el mes a nombre (resta 1 porque los meses empiezan en 0)
        const meses = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
        const mesNombre = meses[mes - 1];

        // 3. Formatear la fecha
        return `${dia} de ${mesNombre} de ${anio}`;
    }

    const formatDateWithoutTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="space-y-3  w-[400px] max-h-[900px] overflow-auto rounded-md p-4">
                    <div>
                        <Button
                            onClick={handleCloseModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-2xl" />
                            </span>
                        </Button>
                        <h3 className=" text-base text-center font-semibold mt-5 text-gray-700">
                            Gasto
                        </h3>
                    </div>
                    <Modal.Content>
                        <div className="grid gap-y-6 mt-16 mx-2 px-2 grid-cols-3">
                            <h1 className="col-span-1 text-xs font-semibold  text-zinc-700">
                                Categoria :
                            </h1>
                            {loading ? (
                                <div className=" ssc-line w-16"></div>
                            ) : (
                                <p className="col-span-2 font-semibold text-xs text-primario">
                                    {gasto.categoria}
                                </p>
                            )}

                            <h1 className="col-span-1 text-xs font-semibold  text-zinc-700">
                                Descripcion :
                            </h1>
                            {loading ? (
                                <div className=" ssc-line w-16"></div>
                            ) : (
                                <p className="col-span-2 font-semibold text-xs text-primario">
                                    {gasto.descripcion}
                                </p>
                            )}

                            <Divider className="my-5 col-span-3" />

                            <h1 className="col-span-1 text-xs font-semibold  text-zinc-700">
                                Monto :
                            </h1>

                            {loading ? (
                                <div className=" ssc-line w-16"></div>
                            ) : (
                                <p className="col-span-2 font-semibold text-xs text-primario">
                                    {gasto.monto}
                                </p>
                            )}

                            <p className="col-span-3 mt-9 font-normal text-end text-xs ">
                                {convertirFecha(
                                    formatDateWithoutTime(
                                        gasto.fechaModificacion
                                    )
                                )}
                            </p>
                        </div>
                    </Modal.Content>
                </Modal.Body>
            </Modal>
        </>
    );
};
