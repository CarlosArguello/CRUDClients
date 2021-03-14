import React from "react"

const Input = ({ label, type, error, messageError, typeError = "danger", children = [], ...props}) => {

    let colorError;
    switch (typeError) {
        case "warning":
            colorError = "yellow"
        break;

        default:
            colorError = "red"
        break;
    }
    
    return(
        <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-gray-600 mb-2">{ label }</label>
            {
                type === "select"?(
                    <select
                        { ...props }
                        className={`px-4 h-12 border rounded-md bg-white ${error?`border-${colorError}-500`:""}`}
                        style={{ outline: "none" }}
                    >
                        { children }
                    </select>
                ):(
                    <input 
                        type={ type } 
                        { ...props }
                        className={`px-4 h-12 border rounded-md ${error?`border-${colorError}-500`:""}`}
                        style={{ outline: "none" }}
                    />
                )
            }

            { error && <span className={`text-${colorError}-500 text-sm`}>{ messageError }</span> }
        </div>
    )
}

export default Input