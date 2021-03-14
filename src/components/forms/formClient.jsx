import React from "react";

import * as yup from 'yup';
import { useFormik } from 'formik';

import Input from "common/components/form/input"
import Button from "common/components/form/button"
import FormEmail from "components/forms/formEmail"
import FormAddress from "components/forms/formAddress"


import { useClientContext } from "common/context/ClientContext"

const FormClient = ({ identificacion = "", nombres = "", apellidos = "", fechaNacimiento = "", emails = [], direcciones = [], onSubmit }) => {
    
    const { getIDs } = useClientContext()

    const ClientSchema = yup.object().shape({
        identificacion: yup.number()
        .required("Requerido")
        .positive("Números positivo")
        .integer("Ingresar solo valores numéricos")
        .test("existsId", "La identificación ya está registrada", identificacionVal => {
            if(identificacion) return true;
            return !getIDs().includes(identificacionVal)

        }),
        nombres: yup.string().required("Requerido"),
        apellidos: yup.string().required("Requerido")
    });

    const formClient = useFormik({
        initialValues: {
            identificacion,
            nombres,
            apellidos,
            emails,
            direcciones,
            fechaNacimiento
        },
        validationSchema: ClientSchema,
        onSubmit,
    })

    return(
        <form 
        className="space-y-4"
        onSubmit={ formClient.handleSubmit }
        >
            <div className="flex">
                <div className="w-2/5 pr-3">

                    <Input 
                        type="number"
                        name="identificacion"
                        label="Identificación"
                        onChange={ formClient.handleChange }
                        value={ formClient.values.identificacion }
                        messageError={ formClient.errors.identificacion }
                        error={ formClient.errors.identificacion && formClient.touched.identificacion }
                        disabled={ identificacion }
                    />
                </div>
                <Input 
                    type="date"
                    name="fechaNacimiento"
                    label="Fecha de nacimiento"
                    onChange={ formClient.handleChange }
                    value={ formClient.values.fechaNacimiento }
                    messageError={ formClient.errors.fechaNacimiento }
                    error={ formClient.errors.fechaNacimiento && formClient.touched.fechaNacimiento }
                />
            </div>
            <div className="flex">
                <Input 
                    name="nombres"
                    label="Nombres"
                    onChange={ formClient.handleChange }
                    value={ formClient.values.nombres }
                    messageError={ formClient.errors.nombres }
                    error={ formClient.errors.nombres && formClient.touched.nombres }
                ></Input>

                <div className="w-6"></div>

                <Input 
                    name="apellidos"
                    label="Apellido"
                    onChange={ formClient.handleChange }
                    value={ formClient.values.apellidos }
                    messageError={ formClient.errors.apellidos }
                    error={ formClient.errors.apellidos && formClient.touched.apellidos }
                ></Input>
            </div>
            
            <FormEmail 
                emails={ emails }
                isSubmit={ formClient.submitCount > 0 }
                onSubmit={ ({ emails }) => formClient.setFieldValue("emails", emails) }
            />

            <FormAddress
                direcciones={ direcciones }
                isSubmit={ formClient.submitCount > 0 }
                onSubmit={ ({ direcciones }) => formClient.setFieldValue("direcciones", direcciones) }
            />

            <Button 
                type="submit"
                className="bg-blue-500 text-white mx-auto block px-12 py-2 text-lg"
            >Guardar</Button>

        </form>

    )
}

export default FormClient