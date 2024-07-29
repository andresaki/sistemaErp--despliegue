import { Pagination } from "keep-react";

export const PaginationComponent = ({
    itemsPorPagina,
    paginaActual,
    totalItems,
    setpaginaActual,
}) => {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalItems / itemsPorPagina); i++) {
        pageNumbers.push(i);
    }

    const onPaginaAnterior = () => {
        setpaginaActual(paginaActual - 1);
    };

    const onPaginaSiguiente = () => {
        setpaginaActual(paginaActual + 1);
    };

    const onSpecificPage = (n) => {
        setpaginaActual(n);
    };

    return (
        <Pagination shape="circle" className="w-auto">
            <Pagination.Navigator shape="circle" onClick={onPaginaAnterior} disabled={paginaActual === 1}>
                {"<"}
            </Pagination.Navigator>

            <Pagination.List>
                {pageNumbers.map((numeroPagina) => (
                    <Pagination.Item
                        className={`h-7 w-7 ${numeroPagina === paginaActual ? 'bg-primario' : 'bg-transparent'}`}
                        key={numeroPagina}
                        active={numeroPagina === paginaActual}
                        onClick={() => onSpecificPage(numeroPagina)}
                    >
                        {numeroPagina}
                    </Pagination.Item>
                ))}


                <Pagination.Item> {"..."} </Pagination.Item>
            </Pagination.List>

            <Pagination.Navigator shape="circle" onClick={onPaginaSiguiente} disabled={paginaActual === pageNumbers[pageNumbers.length - 1]}>
                {">"}
            </Pagination.Navigator>
        </Pagination>
    );
};