import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// iconos
import {  AiOutlineDelete} from "react-icons/ai";

// Keep react
import {Button, Modal, toast} from "keep-react";
import { DELETE_GASTO_RESET } from "../../../../Redux/constants/gastoConstants";
import { deleteGasto, getGastos } from "../../../../Redux/actions/gastoActions";


export const ModalEliminar = ({ gastoId, showModal, handleCloseModal }) => {
    
    const {gastos} = useSelector(state => state.gastos)
    const { isDelected ,error } = useSelector(    (state) => state.deleteGasto  );

    const gasto = gastos.find(c => c._id === gastoId);
    
    const dispatch = useDispatch()
    const navigate = useNavigate();


    

    useEffect(() => {

        if (error) {
            toast.error(error)
        }

        if (isDelected) {
            toast.success("Gasto eliminado correctamente")
            dispatch({type: DELETE_GASTO_RESET})
            dispatch(getGastos());
            handleCloseModal();
            navigate("/Contabilidad/Egresos");

        }
    }, [dispatch, toast, isDelected]);


    const deleteHandler = (id) => {
        dispatch(deleteGasto(id))
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
                            ¿Eliminar registro de gasto? 
                        </h3>
                        <p className="mx-auto max-w-md text-body-4 font-normal text-metal-600">
                            Estás seguro de eliminarlo es de tipo ( {gasto.categoria} )
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
                            onClick={() => deleteHandler(gastoId)}
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
