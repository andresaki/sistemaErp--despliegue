import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AreaChart,
    
} from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/productoActions";
import {
    IoBagCheck,
    IoBagHandle,
    IoBagRemove,
    IoHandRight,
} from "react-icons/io5";
import { getPedidos, setPedidoFilter } from "../../Redux/actions/pedidoActionts";
import { MetaData } from "../../Componentes Generales/MetaData/MetaData";

function Home() {
    const [colorPrimario, setColorPrimario] = useState("");
    useEffect(() => {
        const rootStyles = getComputedStyle(document.body);
        const colorPrimario = rootStyles.getPropertyValue("--primary-color");
        setColorPrimario(colorPrimario);
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // selector
    const { pedidos, error, loading } = useSelector((state) => state.pedidos);

    const [pedidosToatels, setPedidosToatels] = useState("");
    const [pedidosPendientes, setPedidosPendientes] = useState("");
    const [pedidosCompletados, setPedidosCompletados] = useState("");
    const [pedidosNoReclamados, setpedidosNoReclamados] = useState("");

    useEffect(() => {
        dispatch(getPedidos());
    }, [dispatch]);

    useEffect(() => {
        let resultado = [...pedidos];

        
            setPedidosToatels(resultado.length)

            setPedidosCompletados(resultado.filter(
                (pedido) => pedido.terminado === true
            ).length)

            setPedidosPendientes(resultado.filter(
                (pedido) => pedido.terminado === false
            ).length)

        
            setpedidosNoReclamados(resultado.filter(
                (pedido) => pedido.entregado === false
            ).length)

    }, [pedidos, pedidosCompletados, pedidosPendientes, pedidosToatels, pedidosNoReclamados]);



    const handleClick = (filter) => {
        dispatch(setPedidoFilter(filter));
        navigate("/Pedidos")
    };


    return (
        <main className="container mx-auto pt-20">
            <MetaData title={"Home"} />
            <div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-4 md:p-6 mt-12">
                   
                   
                    <Card  texto={"Total de pedidos"} informacion={pedidosToatels} to="/Pedidos">
                        <IoBagHandle size={20} className="text-primario" />{" "}
                    </Card>
                    <Card onClick={() => handleClick('Completados')} texto={"Pedidos completados"} informacion={pedidosCompletados}>
                        <IoBagCheck size={20} className="text-primario" />{" "}
                    </Card>
                    <Card onClick={() => handleClick('pendiente')} texto={"Pedidos pendientes"} informacion={pedidosPendientes}>
                        <IoBagRemove size={20} className="text-primario" />{" "}
                    </Card>
                    <Card onClick={() => handleClick('NoReclamado')} texto={"Pedidos no reclamados"} informacion={pedidosNoReclamados}>
                        <IoHandRight size={20} className="text-primario" />{" "}
                    </Card>

                    <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
                        <CardArea
                            titulo={"Ingresos"}
                            texto={"Ingresos de los ultimos 6 meses"}
                        >
                            <AreaChart
                                dataKey="x"
                                secondaryDataKey="y"
                                showGridLine={true}
                                showXAxis={true}
                                showYAxis={true}
                                chartData={data}
                                XAxisDataKey="x"
                                YAxisDataKey="y"
                                showTooltip={true}
                                chartColor="#16A085"
                                secondaryChartColor={colorPrimario.trim()}
                                secondaryAreaStoke={colorPrimario.trim()}
                            />
                        </CardArea>
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
                        <CardArea
                            titulo={"Egresos"}
                            texto={"Egresos de los ultimos 6 meses"}
                        >
                            <AreaChart
                                dataKey="x"
                                secondaryDataKey="y"
                                showGridLine={true}
                                showXAxis={true}
                                showYAxis={true}
                                chartData={data2}
                                XAxisDataKey="x"
                                YAxisDataKey="y"
                                showTooltip={true}
                                secondaryAreaStoke={colorPrimario.trim()}
                                          
                            />


                        </CardArea>
                    </div>
                    
                </div>
            </div>
        </main>
    );
}

const Card = ({ informacion, texto, color, to = "/", children , onClick}) => {
    return (
        <div className="shadow-sm border p-6 rounded-lg" onClick={onClick}>
            <Link to={to}>
                <div className="flex flex-row items-center justify-between pb-2">
                    <h1 className="text-sm font-medium"> {texto}</h1>
                    {children}
                </div>
                <div className="pt-3">
                    <h2 className="text-2xl font-bold text-primario pb-1 ml-1 ">
                        {informacion}
                    </h2>
                    <p className="text-xs text-gray-500 ">
                        +12.5% desde el mes pasado
                    </p>
                </div>
            </Link>
        </div>
    );
};

const CardArea = ({ titulo, texto, children }) => {
    return (
        <div className="shadow-sm border p-6 rounded-lg">
            <div className="pt-3">
                <h2 className="text-2xl font-bold text-primario pb-1 ">
                    {titulo}
                </h2>
                <p className="text-xs text-gray-500 "> {texto}</p>
            </div>
            <div className="pt-10 px-3">{children}</div>
        </div>
    );
};

const data = [
    { x: "Jan", y: 60 },
    { x: "Feb", y: 48 },
    { x: "Mar", y: 177 },
    { x: "Apr", y: 78 },
    { x: "May", y: 96 },
    { x: "Jun", y: 204 },
];
const data2 = [
    { x: "Jan", y: 40 },
    { x: "Feb", y: 30 },
    { x: "Mar", y: 50 },
    { x: "Apr", y: 40 },
    { x: "May", y: 65 },
    { x: "Jun", y: 50 },
];
export default Home;
