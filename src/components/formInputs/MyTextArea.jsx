// NPM Imports
import { Field, ErrorMessage } from "formik"

const MyTextArea = ({ label, name, ...rest }) => {
  return (
    <div>
         <label htmlFor={name}>{label}</label>
        <Field as='textarea' id={name} name={name} {...rest} />
        <ErrorMessage name={name} />
    </div>
  )
}

export default MyTextArea