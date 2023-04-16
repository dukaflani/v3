// Project Imports
import MyCheckBoxGroup from "./MyCheckBox"
import MyDatePicker from "./MyDatePicker"
import MyInput from "./MyInput"
import MyRadioButtons from "./MyRadioButtons"
import MySelectInput from "./MySelectInput"
import MyTextArea from "./MyTextArea"


const FormikControl = ({ control, ...rest }) => {
    switch(control) {
        case 'input':
            return <MyInput {...rest} />
        case 'textarea':
            return <MyTextArea {...rest} />
        case 'select':
            return <MySelectInput {...rest} />
        case 'radio':
            return <MyRadioButtons {...rest} />
        case 'checkbox':
            return <MyCheckBoxGroup {...rest} />
        case 'date':
            return <MyDatePicker {...rest} />
        default: 
            return null
    }
}

export default FormikControl