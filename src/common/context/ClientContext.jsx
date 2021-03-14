import { createContext, useEffect, useMemo, useContext, useState } from "react";

const ClientContext = createContext()

export const ClientProvider = ({ children }) => {
    const [ init, setInit ] = useState(false)
    const [ clients, setClients ] = useState([])
    const [ isUserActive, setIsUserActive ] = useState(false)
    const [ activeClient, setActiveClient ] = useState({})

    const clearActiveClient = ()=> setActiveClient({})

    //CARGAR DATA
    useEffect(()=>{
        setClients(JSON.parse(localStorage.getItem("clients")))
        setInit(true)
    }, [])

    //(BOOLEAN) CUANDO EL CLIENTE ESTE ACTIVO
    useEffect(()=>{
        setIsUserActive(!!Object.keys(activeClient).length)
    }, [ activeClient ])

    //CUADNO EL CLIENTE CAMBIE ACTUALIZAR EL LOCAL STORAGE
    useEffect(()=>{
        if(init) {
            localStorage.setItem("clients", JSON.stringify(clients))
        }
    }, [ clients ])

    const getIDs = () => {
        return clients.map( ({ identificacion }) => identificacion )
    }

    const value = useMemo(() => ({
        clients,
        setClients,
        activeClient,
        setActiveClient,
        clearActiveClient,
        isUserActive,
        getIDs
    }), [ clients, activeClient, isUserActive ])

    return <ClientContext.Provider value={ value }>{ children }</ClientContext.Provider>
}

export const useClientContext = () => {
    const context = useContext(ClientContext)

    if (!context) {
      return {}
    }
  
    return context;
}