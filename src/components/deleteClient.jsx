import React from "react"
import Swal from 'sweetalert2'
import { useClientContext } from "common/context/ClientContext"

import Button from "common/components/form/button"

const DeleteClient = () => {

    const { clients, setClients, activeClient, isUserActive } = useClientContext()

    const deleteClient = () => {
        setClients(
            clients.filter(client => client.identificacion !== activeClient.identificacion)
        )
        Swal.fire({
            icon: 'success',    
            title: "Operación exitosa",
            text: "El cliente se elimino correctamente.",
            confirmButtonText: "Aceptar"
        })
    }

    return(
        <Button 
            onClick={ deleteClient }
            className="bg-red-600 text-white"
            disabled={ !isUserActive }
        >
            <i className="fas fa-trash mr-2"></i>
            Eliminar
        </Button>
    )
}

export default DeleteClient