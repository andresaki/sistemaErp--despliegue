import { Dropdown, toast } from "keep-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbCalendarUser } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaUserLock, FaUsersLine } from "react-icons/fa6";
import { HeaderAdmin } from "./HeaderAdmin";
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";
import {
    clearErrors,
    deleteUser,
    getUsers,
} from "../../Redux/actions/userActions";
import { DELETE_USER_RESET } from "../../Redux/constants/userConstants";
import { Link, useNavigate } from "react-router-dom";
export const Admin = () => {
    const { users, error, loading } = useSelector((state) => state.users);
    const { isDelected } = useSelector((state) => state.deleteUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isDelected) {
            toast.success("usuario eliminado correctamente");
            dispatch({ type: DELETE_USER_RESET });
            dispatch(getUsers());
            navigate("/Admin");
        }
    }, [dispatch, isDelected, error]);

    const deleteHandler = (id) => {
        const response = window.confirm(
            "Esta seguro de querer eliminar permanentemente este usuario?"
        );
        if (response) {
            dispatch(deleteUser(id));
        }
    };

    const formatDateWithoutTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    

    return (
        <HeaderAdmin>
            <MetaData title={"Admin"} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                    {/* card */}
                    <div className="shadow-md rounded-2xl p-7 h-max">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <p className="text-sm font-medium">Usuarios</p>

                            <FaUsersLine className="fill-primario" size={20} />
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold">{users.length}</div>
                        </div>
                    </div>
                    <div className="shadow-md rounded-2xl p-7 ">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <p className="text-sm font-medium">
                                Usuarios activos
                            </p>

                            <FaUserLock className="fill-primario" size={20} />
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold">1</div>
                        </div>
                    </div>
                    <div className="shadow-md rounded-2xl p-7 ">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <p className="text-sm font-medium">
                                Renovacion de suscripcion
                            </p>

                            <TbCalendarUser
                                className="text-primario"
                                size={20}
                            />
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold">0</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6 ">
                    {/* card */}
                    <div className="shadow-md rounded-2xl p-7 border-t ">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <p className="text-sm font-medium">
                                Lista de usuarios{" "}
                            </p>

                            <FaUsersLine className="text-primario" size={20} />
                        </div>

                        <div className="mt-4">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&amp;_tr]:border-b">
                                    <tr className="border-b  hover:bg-metal-50">
                                        <th className="h-12 px-4 text-left align-middle font-medium  ">
                                            Nombre
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium  ">
                                            Email
                                        </th>
                                        <th className="h-12 px-4 align-middle font-medium  text-left">
                                            Inicio
                                        </th>
                                        <th className="h-12 px-4 align-middle font-medium text-left ">
                                            Expira el
                                        </th>
                                        <th className="h-12 px-4 align-middle font-medium text-left "></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (
                                        users.map((user) => (
                                            <tr
                                                key={user._id}
                                                className="border-b transition-colors hover:bg-metal-50 cursor-default "
                                            >
                                                <td className="p-4 align-middle  font-medium">
                                                    {user.nombre}
                                                </td>
                                                <td className="p-4 align-middle ">
                                                    <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-primario hover:bg-secondary/80">
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="align-middle px-4 ">
                                                    {formatDateWithoutTime(
                                                        user.fechaRegistro
                                                    )}
                                                </td>
                                                <td className="align-middle px-4 ">
                                                    06/08/2024
                                                </td>
                                                <td className="align-middle px-4 ">
                                                    <Dropdown
                                                        placement="left"
                                                        action={
                                                            <BiDotsHorizontalRounded
                                                                size={32}
                                                                className="hover:bg-blue-100  rounded-full w-6 h-6  transition-all duration-300 bg-transparent text-primario m-auto"
                                                            />
                                                        }
                                                        actionClassName="rounded-full bg-transparent border-none"
                                                        className=" shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-40 p-2"
                                                    >
                                                        <Dropdown.List>
                                                            <Dropdown.Item className="hover:text-primario  hover:font-semibold  flex items-center text-gray-700 ">
                                                                <Link
                                                                    to={`/Admin/edit/${user._id}`}
                                                                    className="  text-sm"
                                                                >
                                                                    Editar
                                                                </Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className="hover:text-primario  hover:font-semibold  flex items-center text-gray-700 ">
                                                                <p
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            user._id
                                                                        )
                                                                    }
                                                                    className=" text-sm"
                                                                >
                                                                    Eliminar
                                                                </p>
                                                            </Dropdown.Item>
                                                        </Dropdown.List>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center p-4"
                                            >
                                                Cargando ...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </HeaderAdmin>
    );
};
