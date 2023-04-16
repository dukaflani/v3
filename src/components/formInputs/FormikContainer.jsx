// MUI Imports
import { Button } from "@mui/material"

// NPM Imports
import { Formik, Form } from "formik"
import * as Yup from 'yup'

// Project Imports
import FormikControl from "./FormikControl"



const FormikContainer = () => {
    const dropdownOptions = [
        {
            key: 'Select an option',
            value: ''
        },
        {
            key: 'Option One',
            value: 'option1'
        },
        {
            key: 'Option Two',
            value: 'option2'
        },
        {
            key: 'Option Three',
            value: 'option3'
        },
    ]

    const radioOptions = [
        {
            key: 'Account One',
            value: 'account1'
        },
        {
            key: 'Account Two',
            value: 'account2'
        },
        {
            key: 'Account Three',
            value: 'account3'
        },
    ]

    const checkboxOptions = [
        {
            key: 'Role One',
            value: 'role1'
        },
        {
            key: 'Role Two',
            value: 'role2'
        },
        {
            key: 'Role Three',
            value: 'role3'
        },
    ]

    const initialValues = {
        email: '',
        description: '',
        selectOption: '',
        radioOption: '',
        checkboxOption: [],
        birthDate: null
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('Required').email('Wrong email format'),
        description: Yup.string().required('Required'),
        selectOption: Yup.string().required('Required'),
        radioOption: Yup.string().required('Required'),
        checkboxOption: Yup.array().min(1, "At least one role required").required('Required'),
        birthDate: Yup.date().required('Required').nullable()
    })

    const onSubmit = (values) => console.log('On Submit birthdate:', values)


  return (
    <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={onSubmit}>
        {
            (formik) => 
            (<Form>
                {/* <FormikControl control='input' type='email' label='Email' name='email' /> */}
                {/* <FormikControl control='textarea' label='Description' name='description' />
                <FormikControl control='select' label='Select Topic' name='selectOption' options={dropdownOptions} />
                <FormikControl control='radio' label='Select Account' name='radioOption' options={radioOptions} />
                <FormikControl control='checkbox' label='Select Role' name='checkboxOption' options={checkboxOptions} />
                <FormikControl control='date' label='Date of Birth' name='birthDate' /> */}
                <Button type="submit">Submit</Button>
            </Form>)
        }
    </Formik>
  )
}

export default FormikContainer