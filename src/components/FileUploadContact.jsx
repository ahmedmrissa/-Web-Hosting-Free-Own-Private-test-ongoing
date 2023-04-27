import React, { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function FileUploadContact() {
    const [preview, setPreview] = useState("")
    const [file, setFile] = useState({})
    const [readyToUpload, setReadyToUpload] = useState(false)
const id=useParams()

    const handleChange = (e) => {

        setPreview(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setReadyToUpload(true)
    }

    const handleUpload = (id) => {
        const formData = new FormData();
        formData.append("photo", file);

        const config = {
            url: `https://myfirstweb-udeq.onrender.com/contact/upload/${id}`,
            method: 'PUT',
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
        }

        axios(config).then(data => {
            console.log("Success")
            setReadyToUpload(false)
        }).catch(error => {
           console.log("failed")
        })
    }

    return (

        <form className="flex w-full  items-center justify-center bg-grey-lighter" onSubmit={(e) => {
            e.preventDefault()
            handleUpload(id)
            
        }
        }>
            <label className="w-40 flex flex-col items-center px-1 py-2 bg-blue text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white" variant="info">Upload new Photo
                <input   className="hidden"
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleChange(e)} />
            </label>
            {readyToUpload ? <img className='p2 m3 justify-center w-3/4' src={preview} /> : (<></>)}
            <input className=' p2 m-3 hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue p-4 py-2 px-4 border  rounded' type='submit'  variant="primary" disabled={!readyToUpload} value="Upload" />
        </form>


    )
}

export default FileUploadContact