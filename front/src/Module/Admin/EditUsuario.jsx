import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderAdmin } from "./HeaderAdmin";
import { Button, toast } from "keep-react";
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";
import { clearErrors, updateUserAdmin } from "../../Redux/actions/userActions";
import { USER_UPDATE_RESET } from "../../Redux/constants/userConstants";

export const EditUsuario = () => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { users, error, loading } = useSelector((state) => state.users);
    const { isUpdated, error: updateError} = useSelector((state) => state.user);
    const user = users.find((c) => c._id === params.id);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (error) {
            toast.error("no se pudo obtener los datos del usuario");
            dispatch(clearErrors());
        }

        if (user) {
            setEmail(user.email);
            setPassword(user.password);
        }


        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("user editado correctamente"); 
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/Admin")
            setEmail("")
            setPassword("")
        }
    }, [error, user, isUpdated, updateError]);

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.set("email", email);
        formData.set("password", password);

        dispatch(updateUserAdmin(params.id, formData));
    };

    return (
        <HeaderAdmin>
            <MetaData title={"Editar usuario - Admin"} />
            <main className="mt-20 px-4">
                {/* formulario */}
                <div className="rounded-3xl p-3 border-t shadow-2xl w-full md:max-w-md lg:  xl:max-w-4xl mx-auto">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className=" text-base text-center font-semibold m-3 text-primario font-montserrat">
                            Editar perfil de usuario
                        </h3>
                        <p className="text-xs text-muted-foreground text-center">
                            Ingrese la informacion necesaria para editar el
                            usuario
                        </p>
                    </div>

                    <div className="p-6">
                        <p className="font-semibold text-sm inline-block text-primario">
                            Id:
                        </p>{" "}
                        <span className=" text-xs inline-block">354565</span>{" "}
                        <br />
                        <p className="font-semibold text-sm inline-block text-primario">
                            Inicio:
                        </p>{" "}
                        <span className=" text-xs inline-block">
                            24 de junio del 2024
                        </span>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="p-6 space-y-8 xl:space-y-0 xl:grid xl:grid-cols-2 gap-8"
                    >
                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                name="email"
                                placeholder="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                name="password"
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="block  font-montserrat text-xs font-medium text-black"
                                htmlFor="subscription-expiry"
                            >
                                Fecha de Vencimiento de Suscripción
                            </label>
                            <input
                                className="outline-none border border-bordeInput text-gray-800 text-xs rounded-md block w-full p-3 focus:ring-primario focus:ring-2"
                                id="subscription-expiry"
                                placeholder="subscription expiry date"
                                type="date"
                            />
                        </div>
                        <div className="flex w-full justify-center p-6">
                            <Button
                                type="submit "
                                className="text-white h-9  bg-primario focus:ring-4 focus:outline-none font-medium  text-xs px-5 py-2 text-center  rounded  hover:bg-primario"
                            >
                                Guardar
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </HeaderAdmin>
    );
};
