import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// iconos
import { AiOutlineDelete } from "react-icons/ai";

// Keep react
import { Button, Modal, toast } from "keep-react";

// data
import { deleteProduct, getProducts } from "../../../Redux/actions/productoActions";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../../Redux/constants/productoConstants";

export const ModalEliminar = ({ productoId, showModal, handleCloseModal }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {productos} = useSelector(state => state.products)

    const { isDelected ,error } = useSelector(    (state) => state.product  );

    const producto = productos.find(p => p._id === productoId);
    
    useEffect(() => {
        if (error) {
            toast.error(error)
        }

        if (isDelected) {
            toast.success("producto eliminado correctamente")
            dispatch({type: DELETE_PRODUCT_RESET})
            dispatch(getProducts());
            handleCloseModal();
            navigate("/Inventario");

        }
    }, [dispatch, toast, isDelected]);
    
    
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="flex w-[500px] flex-col items-center p-6 lg:p-8">
                    <Modal.Icon className="h-20 w-20 border mb-2 border-primario bg-secundario text-primario">
                        <AiOutlineDelete size={50} />
                    </Modal.Icon>
                    <Modal.Content className="my-8 text-center">
                        <h3 className="mb-4 text-body-1 font-bold text-metal-900">
                            ¿Eliminar {producto.nombre}?
                        </h3>
                        <p className="mx-auto max-w-md text-body-4 font-normal text-metal-600">
                            Estás seguro de eliminar el registro de
                            {" " + producto.nombre}. No podrás
                            recuperarlo. Asegúrate de que no haya acciones
                            asociadas a este producto.
                        </p>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button
                            onClick={handleCloseModal}
                            className="text-black h-12 after:border-none before:border-none after:outline-none before:outline-none bg-transparent focus:outline-none focus:border-none inline-flex items-center hover:bg-transparent focus:ring-4  font-medium  text-base px-5 py-2.5 text-center  rounded  hover:scale-105"
                        >
                            cancelar
                        </Button>
                        <Button
                            onClick={() => deleteProductHandler(productoId)}
                            className="text-white h-12 inline-flex items-center bg-primario focus:ring-4 focus:outline-none font-medium  text-base px-5 py-2.5 text-center  rounded-xl hover:bg-primario hover:scale-105"
                        >
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
};
