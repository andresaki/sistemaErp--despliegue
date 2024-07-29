import React, { useState } from "react";
import { MetaData } from "../../../Componentes Generales/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import NavConfiguracion from "../NavConfiguracion";
import { loadUser, updateColor } from "../../../Redux/actions/userActions";

export const Apariencia = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);
    const [selectedColor, setSelectedColor] = useState(user.colorPrimario);

    const colors = [
        "#0256A4",
        "#5865F2",
        "#494949",
        "#23232F",
        "#FF4D00",
        "#037300",
        "#7D44C7",
        "#000000",
        "#00B091",
        "#497891",
        "#5c4b43",
        "#f4c430",
        "#85a6c9",
        "#015a6b",
        "#2f428f",
        "#747c91",
        "#6f7f96",
        "#434d5c",
        "#4f7c8b",
        "#5B2C6F",
        "#1E8449",
        "#922B21",
        "#d9539d",
    ];

    const handleColorClick = (color) => {

        const formData = new FormData()
        formData.set("colorPrimario", color);

        setSelectedColor(color);
        dispatch(updateColor(formData));
        dispatch(loadUser());
    };

    return (
        <NavConfiguracion>
            <MetaData title={"Apariencia"} />

            <main>
                <h1 className="font-medium text-xl"> Apariencia </h1>

                <div className="mt-8 space-y-4 font-medium  text-gray-600">
                    <h2>Color principal</h2>

                    <div className="flex flex-wrap absolute">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => handleColorClick(color)}
                                className={` relative w-10 h-10 m-1 rounded-full cursor-pointer border-4 ${
                                    selectedColor === color
                                    ? "border-slate-700 " 
                                        : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color }}
                                />
                        ))}
                    </div>
                </div>
            </main>
        </NavConfiguracion>
    );
};
