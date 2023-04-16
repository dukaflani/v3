// React Import
import React from "react"

// NPM Imports
import { Field, ErrorMessage } from "formik"

const MyRadioButtons = ({ name, label, options, ...rest }) => {
  return (
    <div>
        <label>{label}</label>
        <Field name={name} {...rest} >
           {
            ({ field }) => {
              return options?.map((option, i) => {
                return (
                  <React.Fragment key={i}>
                    <input type="radio" id={option.value} {...field} value={option.value} checked={field.value === option.value} />
                    <label htmlFor={option.value} >{option.key}</label>
                  </React.Fragment>
                )
              })
            }
           }
        </Field>
        <ErrorMessage name={name} />
    </div>
  )
}

export default MyRadioButtons