import React from "react"

import Modal from "common/components/modal"
import FormClient from "components/forms/formClient"


const ClientModal = ({ isOpen, onClose, title = "Nuevo usuario", onSubmit, ...client }) => {

    return(
        <Modal
        isOpen={ isOpen }
        onClose={ onClose }
        >
            <h1 className="text-2xl font-bold text-center mb-6">{ title }</h1>
            <FormClient
                { ...client }
                onSubmit={ onSubmit }
            ></FormClient>
        </Modal>
    )
}

export default ClientModal