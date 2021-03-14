import React from "react"
import Input from "common/components/form/input"

import { useClientContext } from "common/context/ClientContext"

const SearchClient = () => {
    const { search, setSearch } = useClientContext()

    return(
        <Input 
            label="Buscar cliente: "
            onChange={ ({ target })=> setSearch(target.value) }
            value={ search }
        />
    )
}

export default SearchClient