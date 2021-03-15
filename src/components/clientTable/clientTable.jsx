import React from "react";
import moment from "moment";
import "./clientTable.scss"

import { useClientContext } from "common/context/ClientContext"

const ClientTable = () => {

    const { clients = [], search, searchedClients = [], activeClient, setActiveClient } = useClientContext()

    const getFullAddress = (address) => {
        return `${ address.descripcion } ${ address.barrio }, ${ address.ciudad }`
    }

    return(
        <div className="mx-auto border rounded-xl overflow-hidden text-base">
            <table className="w-full">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="w-1/5">Identificacion</th>
                        <th className="w-1/5">Nombre completo</th>
                        <th className="w-1/5">Edad</th>   
                        <th className="w-2/5">Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        (clients.length && searchedClients.length)?(
                            ( search.length? searchedClients: clients).map(({ identificacion, nombres, apellidos, fechaNacimiento, direcciones }, index)=>(
                                <tr 
                                    key={ index }
                                    onClick={ ()=> setActiveClient( clients[index] ) }
                                    className={ `cursor-pointer ${ activeClient.identificacion===identificacion?"bg-blue-100":"hover:bg-gray-50" }` }
                                >
                                    <td>{ identificacion }</td>
                                    <td>{ nombres } { apellidos }</td>
                                    <td className="text-center">{ fechaNacimiento?moment().diff(fechaNacimiento, 'years'):"" }</td>
                                    <td>{ getFullAddress(direcciones[0]) }</td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="20" className="text-center font-medium text-xl">No se encontraron resultados</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default ClientTable