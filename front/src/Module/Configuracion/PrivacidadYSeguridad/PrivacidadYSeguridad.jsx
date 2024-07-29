import React, { useEffect, useState } from "react";
import NavConfiguracion from "../NavConfiguracion";
import { Button, Modal, toast } from "keep-react";
import { MdKey } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../../Redux/actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../../Redux/constants/userConstants";

import { MetaData } from "../../../Componentes Generales/MetaData/MetaData";

export const PrivacidadYSeguridad = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [currentPassword, setcurrentPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {error, isUpdated, loading } = useSelector( state => state.user)


    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }


        if (isUpdated){
            toast.success("contraseña actualizada correctamente")
            navigate("/configuracion/Seguridad")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })

            closeModal()
        }

    }, [dispatch, toast, error, isUpdated])

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };


    const submitHandler = (e) => {
        e.preventDefault();

        const forData =  new FormData();

        forData.set("currentPassword", currentPassword)
        forData.set("newPassword", newPassword)
        forData.set("confirmNewPassword", confirmNewPassword)

        dispatch(updatePassword(forData))
    }




    return (
        <NavConfiguracion>
            <MetaData title={"Seguridad - cambiar contraseña"}/>
            <div className="space-y-4 mb-10">
                <h1 className="font-medium text-xl">Contraseña</h1>
                <p className="text-[#494949] text-base font-normal">
                    Debes de recordar la contraseña actual
                </p>
            </div>

            <Button
                onClick={openModal}
                className="text-white h-8  flex gap-4 max-w-max bg-primario focus:ring-4 focus:outline-none font-medium  text-xs px-3 text-center rounded  hover:bg-primario"
            >
                <MdKey size={17} />
                Cambiar cotraseña
            </Button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Body className="space-y-2  w-[500px] rounded-md">
                    <div>
                        <Button
                            onClick={closeModal}
                            className="p-0 bg-transparent hover:bg-blue-50  rounded-full hover:scale-105 transition-all duration-100 font-montserrat hover:text-gray-900  flex justify-center items-center "
                        >
                            <span>
                                <IoCloseOutline className="text-black text-xl" />
                            </span>
                        </Button>
                        <h3 className=" text-sm text-center font-semibold m-3 text-black font-montserrat">
                            Actualiza tu contraseña
                        </h3>
                        <p className="text-xs text-center mx-6">
                            Ingresa tu contraseña actual y una nueva contraseña.
                        </p>
                    </div>
                    <Modal.Content>
                        <form onSubmit={submitHandler} className=" mt-20 px-2">
                            <div className="grid gap-y-10">

                                <div className="space-y-2">
                                    <label
                                        htmlFor="currentPassword"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Contraseña actual
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2 "
                                        
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setcurrentPassword(e.target.value)}
                                    />
                                </div>

                                <div className=" ">
                                    <label
                                        htmlFor="newPassword"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type="text"
                                        name="newPassword"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3  focus:ring-primario focus:ring-2  "
                                        
                                        required
                                        value={newPassword}
                                        onChange={(e) => setnewPassword(e.target.value)}
                                    />
                                </div>

                                <div className=" ">
                                    <label
                                        htmlFor="confirmNewPassword"
                                        className="block mb-3 font-montserrat text-xs font-medium text-black"
                                    >
                                        Confirmar la nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3  focus:ring-primario focus:ring-2  "
                                        
                                        required
                                        value={confirmNewPassword}
                                        onChange={(e) => setconfirmNewPassword(e.target.value)}
                                    />
                                </div>


                                <div className="mt-12 w-full flex justify-end">
                                    <Button
                                    type="submit"
                                        className="text-white h-8  bg-[#0256A4] flex gap-4 max-w-max  focus:ring-4 focus:outline-none font-medium  text-xs px-3 text-center rounded  hover:bg-[#0256A4]"
                                        >
                                        Cambiar
                                    </Button>
                                </div>
                                
                            </div>
                        </form>
                    </Modal.Content>
                </Modal.Body>
            </Modal>
        </NavConfiguracion>
    );
};
