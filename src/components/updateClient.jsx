import React, { useState } from "react";
import { useClientContext } from "common/context/ClientContext"
import Swal from 'sweetalert2'

import ClientModal from "components/clientModal"
import Button from "common/components/form/button"

const AddClient = () => {

    const [ isUpdatingUser, setIsUpdatingUser ] = useState()
    const { clients, setClients, activeClient, isUserActive } = useClientContext()

    const updateClient = (client) => {
        const index = clients.findIndex( ({ identificacion}) => identificacion == activeClient.identificacion)
        if(index != -1){
            setClients(clients.map( (nClient, nIndex) =>  nIndex === index? client: nClient  ))
        }

        setIsUpdatingUser(false)

        Swal.fire({
            icon: 'success',    
            title: "Operación exitosa",
            text: "El cliente se actualizó correctamente.",
            confirmButtonText: "Aceptar"
        })
    }

    return(
        <>

            <Button 
                onClick={ ()=> setIsUpdatingUser(true) }
                className="bg-yellow-500 text-white"
                disabled={ !isUserActive }
            >
                <i className="fas fa-user-edit mr-2"></i>
                Editar
            </Button>

            <ClientModal 
                { ...activeClient }
                title="Editar cliente"
                isOpen={ isUpdatingUser }
                onClose={ ()=> setIsUpdatingUser(false) }
                onSubmit={ updateClient }
            />
        </>
    )
}

export default AddClient
