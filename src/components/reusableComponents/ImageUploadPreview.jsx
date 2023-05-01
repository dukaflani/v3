// React Imports
import { useState } from "react"

const ImageUploadPreview = ({ file }) => {
    const [preview, setPreview] = useState({})
    if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
        }
    }


  return (
    <>
        <img src={preview} alt="" style={{ width: '100px', height: '100px' }} />
    </>
  )
}

export default ImageUploadPreview