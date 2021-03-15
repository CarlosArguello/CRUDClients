import React, { useEffect } from "react";

import * as yup from 'yup';
import { useFormik } from 'formik';

import { TagList, Tag } from "common/components/tagList"
import Input from "common/components/form/input"    
import Button from "common/components/form/button"


const FormAddress = ({ direcciones = [], isSubmit, onSubmit }) => {

    const AddressSchema = yup.object().shape({
        ciudad: yup.string().required("Requerido"),
        barrio: yup.string().required("Requerido"),
        descripcion: yup.string().required("Requerido"),
        tipo: yup.string().required("Requerido").when('direcciones', (direcciones, tipo) => {
            return tipo.test("mainType", "Ya tienes sede principal", ()=> !direcciones.filter( address => address.tipo === 'principal').length )
        })
    });

    const formAddress = useFormik({
        initialValues: {
            ciudad: '',
            barrio: '',
            descripcion: '',
            tipo: '', 
            direcciones
        },
        validationSchema: AddressSchema,
        onSubmit(values, { resetForm }){
            resetForm()
            addAddress(values)
        }
    })

    useEffect(()=>{
        if(isSubmit) formAddress.handleSubmit()
        // eslint-disable-next-line
    }, [ isSubmit ])


    const removeAddress = (index) => {
        formAddress.values.direcciones.splice(index, 1)
        formAddress.setFieldValue("direcciones", formAddress.values.direcciones)
        onSubmit(formAddress.values)
    }
        
    const addAddress = ({ ciudad, barrio, descripcion, tipo, direcciones }) => {
        direcciones.push({ ciudad, barrio, descripcion, tipo })
        formAddress.setFieldValue("direcciones", direcciones)
        onSubmit({ ciudad, barrio, descripcion, tipo, direcciones })
    }
    

    return(
        <>
            <div className="flex">
                <Input 
                    name="ciudad"
                    label="Ciudad"
                    typeError="warning"
                    value={ formAddress.values.ciudad }
                    onChange={ formAddress.handleChange }
                    messageError={ formAddress.errors.ciudad }
                    error={ formAddress.errors.ciudad && formAddress.touched.ciudad }
                ></Input>

                <div className="w-6"></div>

                <Input 
                    name="barrio"
                    label="Barrio"
                    typeError="warning"
                    value={ formAddress.values.barrio }
                    onChange={ formAddress.handleChange }
                    messageError={ formAddress.errors.barrio }
                    error={ formAddress.errors.barrio && formAddress.touched.barrio }
                ></Input>
            </div>


            <div className="flex">
                <Input 
                    name="descripcion"
                    label="Dirección"
                    typeError="warning"
                    value={ formAddress.values.descripcion }
                    onChange={ formAddress.handleChange }
                    messageError={ formAddress.errors.descripcion }
                    error={ formAddress.errors.descripcion && formAddress.touched.descripcion }
                ></Input>

                <div className="w-1/3 pl-3">
                    <Input 
                        type="select"
                        name="tipo"
                        label="Tipo"
                        typeError="warning"
                        value={ formAddress.values.tipo }
                        onChange={ formAddress.handleChange }
                        messageError={ formAddress.errors.tipo }
                    error={ formAddress.errors.tipo && formAddress.touched.tipo }
                    >
                        <option value=""></option>
                        <option value="principal">Principal</option>
                        <option value="sucursal">Sucursal</option>
                    </Input>
                </div>

                <Button 
                    onClick={ ()=> formAddress.handleSubmit() }
                    className="h-12 bg-blue-500 text-white ml-3 mt-7">
                    <i class="fas fa-plus"></i>
                </Button>

            </div>

            <TagList >
                { formAddress.values.direcciones.map( ({ ciudad, barrio, descripcion, tipo }, index) => (
                    <Tag 
                        key={ index }
                        onDelete={ ()=> removeAddress(index) }
                    >{ `${ descripcion } ${ barrio }, ${ ciudad }` }</Tag>
                )) }
            </TagList>

            { 
                (!formAddress.values.direcciones.length && isSubmit) &&
                    <span className="text-red-500 text-sm">Ingresa almenos una dirección a la lista</span> 
            }
        </>
    )
}

export default FormAddress