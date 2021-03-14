import React from "react";

import { ClientProvider } from "common/context/ClientContext"

import BaseLayout from "common/layouts/baseLayout"
import ClientTable from "components/clientTable/clientTable"
import SearchClient from "components/searchClient"
import AddClient from "components/addClient"
import UpdateClient from "components/updateClient"
import DeleteClient from "components/deleteClient"

const HomePage = () => {
    return(
        <BaseLayout>
            <ClientProvider>
                <div className="mt-20 mb-4">
                    <h1 className="text-4xl text-center font-semibold mb-16">Listado de clientes</h1>
                    <div className="w-80 ml-auto mb-4">
                        <SearchClient/>
                    </div>
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