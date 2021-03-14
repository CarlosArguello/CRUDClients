import React from "react"

const Button = ({ children, className, disabled = false, type = "button", ...props }) => (
    <button 
        { ...props }
        type={ type }
        disabled={ disabled }
        className={`py-3 px-4 rounded-md border font-bold outline-none  border-none ${ disabled?"opacity-50":"" } ${ className }`}
    >
        { children }
    </button>
)

export default Button