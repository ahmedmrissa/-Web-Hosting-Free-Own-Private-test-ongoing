
import { useParams } from 'react-router-dom'
import  FileUploadContact from '../components/FileUploadContact'

function UploadPage() {
    
const id= useParams()
    return (

        <div>
            <FileUploadContact id={id}/>
        </div>


    )
}

export default UploadPage