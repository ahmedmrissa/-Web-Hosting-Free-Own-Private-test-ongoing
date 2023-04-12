import React from 'react'
import { useState} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  const navigate=useNavigate()
  const {login}=useAuth()
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });




  return (
    <section className="h-screen bg-gray-200">
      <div className="h-full px-6 text-gray-800 shadow-md">
        <div className="flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-center g-6 ">
          <div className="p-4 m-4 mb-12 rounded-md shadow-md xl:ml-20 xl:w-5/12 lg:w-4/12 md:w-4/12 md:mb-0 bg-slate-300">
            <form>
              <div className="flex flex-row items-center justify-center p-3 m-2 lg:center">
                <p className="mb-0 mr-4 text-lg text-center">Sign in</p>
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="email"
                  name="email"
                  value={credentials.email}
                  placeholder="Email address"
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>


              <div className="mb-6">
                <input
                  type="password"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="password"
                  name="password"
                  value={credentials.password}
                  placeholder="Password"
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>



              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  onClick={() => 
                    login(credentials.email,credentials.password)
                    .then(res=>{
                      
                      if(res.status!=='Error'){
                        navigate('/')
                      }
                    })
                    .catch(error=>{
                      Swal.fire({
                        title: 'Error!',
                        text: 'Login Failed Verify your email and password',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                    })}
                >
                  Login
                </button>
                <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                  Don't have an account?
                  <Link
                    to={"/register"}
                    className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;

