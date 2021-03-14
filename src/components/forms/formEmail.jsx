import React, { useEffect } from "react";

import * as yup from 'yup';
import { useFormik } from 'formik';

import { TagList, Tag } from "common/components/tagList"
import Input from "common/components/form/input"
import Button from "common/components/form/button"



const FormEmail = ({ emails = [], isSubmit, onSubmit }) => {

    const EmailSchema = yup.object().shape({
        email: yup.string().required("Requerido").email("Email invalido").when('emails', (emails, emailSchema) => {
            return emailSchema.test("existEmail", "Email en lista", email => !emails.includes(email) )
        })
    });


    const formEmail = useFormik({
        initialValues: {
            email: '',
            emails,
        },
        validationSchema: EmailSchema,
        onSubmit(values, { resetForm }){
            resetForm()
            addEmail(values)
        }
    })

    useEffect(()=>{
        if(isSubmit) formEmail.handleSubmit()
    }, [ isSubmit ])

    const removeEmail = (index) => {
        formEmail.values.emails.splice(index, 1)
        formEmail.setFieldValue("emails", formEmail.values.emails)
        onSubmit(formEmail.values)
    }
    
    const addEmail = ({ email, emails }) => {
        emails.push(email)
        formEmail.setFieldValue("emails", emails)
        onSubmit({ email, emails })
    }
    
    return(
        <>
            <div className="flex">
                <Input 
                    name="email"
                    label="Email"
                    typeError="warning"
                    value={ formEmail.values.email }
                    onChange={ formEmail.handleChange }
                    messageError={ formEmail.errors.email }
                    error={ formEmail.errors.email && formEmail.touched.email }
                />

                <Button 
                    onClick={ ()=> formEmail.handleSubmit() }
                    className="h-12 bg-blue-500 text-white ml-3 mt-7">
                    <i class="fas fa-plus"></i>
                </Button>
            </div>

            <TagList >
                { formEmail.values.emails.map( (email, index) => (
                    <Tag 
                        key={ index }
                        onDelete={ ()=> removeEmail(index) }
                    >{ email }</Tag>
                )) }
            </TagList>
            { 
                (!formEmail.values.emails.length && isSubmit) &&
                    <span className="text-red-500 text-sm">Ingresa almenos un email a la lista</span>
            }
        </>
    )
}

export default FormEmail