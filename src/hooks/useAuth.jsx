import { createContext, useContext,useState } from "react";
import axios from './../api/common-http'
export const AuthContext = createContext();


function AuthContextProvider({ children }) {
 
    const [user, setUser]=useState(null)

    const login=async (email,password)=>{
        const response =  await axios.post('/user/login',JSON.stringify({email,password}));
        const json=await response.data;
        const token= json.payload.token;
        if(token){
            localStorage.setItem('user',JSON.stringify(json.payload))
            setUser(json.payload);
        }

        if(json.status==="Error"){
            return ({status:'Error'})
        }
        
        return({status:'Success',user:json.payload});
    
    }
    const Register=async (fullName,email,password)=>{
        const response =  await axios.post('/user/register',JSON.stringify({fullName,email,password}));
        const json=await response.data;
        if(json.status="Sucess")
        {
       
        
        login(email,password)
        }
        
        return({status:'Success',user:json.payload});
           
    }
    const isAuthenticated = async ()=>{
        const user= await localStorage.getItem('user');
        if(!user){
            return null
        }
        setUser(JSON.parse(user))
    }
    
    const logout=async ()=>{
       await localStorage.removeItem('user');
       setUser(null)
    }
    
    return (
        <AuthContext.Provider value={{user,login,isAuthenticated,logout,Register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext)

export default AuthContextProvider;