import { createContext, useEffect, useMemo, useContext, useState } from "react";

const ClientContext = createContext()

export const ClientProvider = ({ children }) => {
    const [ init, setInit ] = useState(false)
    const [ clients, setClients ] = useState([])
    const [ searchedClients, setSearchedClients ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ isUserActive, setIsUserActive ] = useState(false)
    const [ activeClient, setActiveClient ] = useState({})

    const clearActiveClient = ()=> setActiveClient({})

    //CARGAR DATA
    useEffect(()=>{
        const storageClient = localStorage.getItem("clients")
        if(storageClient){
            setClients(JSON.parse(storageClient))
        }
        setInit(true)
    }, [])

    //BUSCAR CLIENTES
    useEffect(()=>{
        const searchDataClient = clients.filter( 
            ({ identificacion = "", nombres, apellidos }) => (
                String(identificacion).includes(search)  || `${nombres} ${ apellidos}`.includes(search)
            )
        )
        setSearchedClients(searchDataClient)
        // eslint-disable-next-line
    }, [ search, clients ])

    //(BOOLEAN) CUANDO EL CLIENTE ESTE ACTIVO
    useEffect(()=>{
        setIsUserActive(!!Object.keys(activeClient).length)
    }, [ activeClient ])

    //CUANDO EL CLIENTE CAMBIE ACTUALIZAR EL LOCAL STORAGE
    useEffect(()=>{
        if(init) {
            localStorage.setItem("clients", JSON.stringify(clients))
            setSearch("")
        }
    // eslint-disable-next-line
    }, [ clients ])

    const getIDs = () => {
        return clients.map( ({ identificacion }) => identificacion )
    }

    const value = useMemo(() => ({
        
        clients,
        setClients,
        
        search,
        setSearch,
        searchedClients,

        activeClient,
        setActiveClient,

        clearActiveClient,
        isUserActive,

        getIDs
    // eslint-disable-next-line
    }), [ clients, activeClient, isUserActive, search, searchedClients ])

    return <ClientContext.Provider value={ value }>{ children }</ClientContext.Provider>
}

export const useClientContext = () => {
    const context = useContext(ClientContext)

    if (!context) {
      return {}
    }
  
    return context;
}