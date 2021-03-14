import React, { useState } from "react";
import { useClientContext } from "common/context/ClientContext"
import Swal from 'sweetalert2'

import ClientModal from "components/clientModal"
import Button from "common/components/form/button"

const AddClient = () => {

    const [ isAddingUser, setIsAddingUser ] = useState()
    const { clients, setClients, clearActiveClient } = useClientContext()

    const initAddUser = ()=> {
        clearActiveClient()
        setIsAddingUser(true)
    }

    const addClient = (client) => {
        setClients([ ...clients, client ])
        setIsAddingUser(false)
        Swal.fire({
            icon: 'success',    
            title: "Operación exitosa",
            text: "El cliente se agregó correctamente.",
            confirmButtonText: "Aceptar"
        })
    }

    return(
        <>
            <Button 
                onClick={ initAddUser }
                className="bg-blue-500 text-white"
            >
                <i className="fas fa-plus-square mr-2"></i>
                Nuevo
            </Button>

            <ClientModal 
                title="Nuevo cliente"
                isOpen={ isAddingUser }
                onClose={ ()=> setIsAddingUser(false) }
                onSubmit={ addClient }
            />
        </>
    )
}

export default AddClient