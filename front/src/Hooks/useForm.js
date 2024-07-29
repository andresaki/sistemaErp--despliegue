import { useState } from "react";


export const useForm = (estructura = {}) => {
  
    // Recibe la estructura de objeto y la setea en el estado
    const [formState, setFormState] = useState(estructura);

    
    const onInputChange = ({target}) => {
        const {name , value} = target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    return{
        formState,
        onInputChange
    }
}
