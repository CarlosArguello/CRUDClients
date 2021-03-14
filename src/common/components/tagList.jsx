import React from "react"
import Button from "common/components/form/button"


export const TagList = ({ children }) => {
    return(
        <ul className="bg-gray-100 p-2 rounded-md space-x-2" style={{ minHeight: 68 }}>
            { children }
        </ul>
    )
}

export const Tag = ({ children, onDelete }) => (
    <li className="font-medium text-sm inline-flex items-center pl-4 m-2 rounded-md bg-gray-300">
        { children }
        <Button 
            onClick={ onDelete }
            className="text-gray-500 p-0 -ml-2" 
        >
            <i className="fas fa-times" ></i>
        </Button>
    </li>
)