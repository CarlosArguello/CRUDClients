import React from "react";

import { ClientProvider } from "common/context/ClientContext"

import BaseLayout from "common/layouts/baseLayout"
import ClientTable from "components/clientTable/clientTable"
import AddClient from "components/addClient"
import UpdateClient from "components/updateClient"
import DeleteClient from "components/deleteClient"

const HomePage = () => {
    return(
        <BaseLayout>
            <ClientProvider>
                <div className="mt-20 mb-4 space-y-12">
                    <h1 className="text-4xl text-center font-semibold">Listado de clientes</h1>

                    <ClientTable></ClientTable>
                </div>

                <div className="interaction flex justify-between">
                    <AddClient />
                    <div className="space-x-8">

                        <UpdateClient />
                        <DeleteClient />

                    </div>

                </div>
            </ClientProvider>
        </BaseLayout>
    )
}

export default HomePage;