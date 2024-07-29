import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// iconos
import {
    AiOutlineDelete,
} from "react-icons/ai";

// Keep react
import { Button, Modal, toast } from "keep-react";

// data
import { DELETE_CLIENTE_RESET } from "../../../Redux/constants/clienteConstants";
import { deleteCliente, getClientes } from "../../../Redux/actions/clienteActionts";

export const ModalEliminar = ({ clienteId, showModal, handleCloseModal }) => {

    const {clientes} = useSelector(state => state.clientes)
    const { isDelected ,error } = useSelector(    (state) => state.cliente  );

    const cliente = clientes.find(c => c._id === clienteId);
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
       
        if (error) {
            toast.error(error)
        }
        // no se si funcione
        if (isDelected) {
            toast.success("cliente eliminado correctamente")
            dispatch({type: DELETE_CLIENTE_RESET})
            dispatch(getClientes());
            handleCloseModal();
            navigate("/Clientes");

        }
    }, [dispatch, toast, isDelected]);
    
    
    const deleteHandler = (id) => {
        dispatch(deleteCliente(id))

    }

    return (
        <>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <Modal.Body className="flex w-[500px] flex-col items-center p-6 lg:p-8">
                    <Modal.Icon className="h-20 w-20 border mb-2 border-blue-200 bg-blue-50 text-blue-500">
                        <AiOutlineDelete size={50} />
                    </Modal.Icon>
                    <Modal.Content className="my-8 text-center">
                        <h3 className="mb-4 text-body-1 font-bold text-metal-900">
                            ¿Eliminar datos de {cliente.nombre}?
                        </h3>
                        <p className="mx-auto max-w-md text-body-4 font-normal text-metal-600">
                            Estás seguro de eliminar los datos de
                            {" " + cliente.nombre}. No podrás recuperarlo. Se
                            eliminaran todas la relaciones asociadas a este
                            cliente.
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
                            onClick={() => deleteHandler(clienteId)}
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
