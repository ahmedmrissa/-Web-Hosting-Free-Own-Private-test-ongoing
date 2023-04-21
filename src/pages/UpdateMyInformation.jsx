import React from 'react'
import { useEffect,useRef } from 'react'
import FileUploadAvatar from '../components/FileUploadAvatar'
import { useAuth } from '../hooks/useAuth'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from '../api/common-http'
function UpdateMyInformation() {
    const {user,isAuthenticated}=useAuth()
    const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordC = useRef();
  const form = useRef();
const navigate=useNavigate();
    useEffect(() => {
        const getUserById = async (id) => {
        await axios.get(`/user/one/${id}`)
        .then( response =>response.data )
        .then(data => data.payload)
        .then(users => {

          fullName.current.value = users[0].fullName;
          email.current.value = users[0].email;
          
        })
        .catch(error => console.log(error))

    }
    getUserById(user._id)
  
        isAuthenticated()
    },[user._id])
    const updateProductHandler = async (e) => {
        e.preventDefault();
        if(password===passwordC)
        {
        const newUser = {
          fullName: fullName.current.value,
          email: email.current.value,
          password: password.current.value,
         
        }
       
    
        await axios.put(`/${user._id}`,newUser)
        .then(response=>response.data)
         .then(data=>{
         if(data.status="success"){
               Swal.fire({
            title: 'Success',
            text: "Successfully Updated",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }else if(data.status="error"){
          Swal.fire({
            title: 'Error',
            text: "Failed to Update the Information",
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
          navigate("/")
         })
         .catch(error=>{
          Swal.fire({
            title: 'Error',
            text: "Failed to Update the Information",
            icon: 'error',
            confirmButtonText: 'Ok'
          })
         })
        }
        else{
            Swal.fire({
                title: 'Error',
                text: "Password Did not Match",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
      }
    
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Update Your Informations</h2>
        
        <form onSubmit={updateProductHandler} 
    ref={form}  className="space-y-8">
        <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Update Your Avatar</label>
                <FileUploadAvatar id={user._id} />
            </div>
        
            <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change Your FullName</label>
                <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"  required 
                ref={fullName}
                name="fullName"
                />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change Your email</label>
                <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"  required
                 ref={email}
                 name="email"
                />
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                ref={password}
                name="password"
                >Change Your Pasword</label>
                <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="*******" required />
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                ref={password}
                name="password"
                >Confirm Your Pasword</label>
                <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="*******" required 
                ref={passwordC}
                name="passwordC"
                />
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-700">Send message</button>
        </form>
    </div>
  </section>
  )
}

export default UpdateMyInformation

