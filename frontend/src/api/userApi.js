import { API } from "../config"

// register
export const register=(username,email,password)=>{
    let user={username,email,password}
    return fetch(`${API}/register`,{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    }) 
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// verify email
export const verifyEmail=(token)=>{
    return fetch(`${API}/verifyemail/${token}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// login
export const userLogin=(email,password)=>{
    let user={email,password}
    return fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// authenticate apie
export const authenticate=(userInfo)=>{
    return localStorage.setItem('jwt',JSON.stringify(userInfo))
}

// check if user is authenticated or not
export const isAuthenticated=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}

// forget password
export const forgetPassword=(email)=>{
    return fetch(`${API}/forgetpassword`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// reset password
export const resetPassword=(password,token)=>{
    return fetch(`${API}/resetpassword/${token}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({password})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// logout
export const logOut=()=>{
    localStorage.removeItem('jwt')
    return fetch(`${API}/logout`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

//! get all user
export const getAllUsers=()=>{
    return fetch(`${API}/allusers`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// !get single user

export const getSingleUser=(id)=>{
    return fetch(`${API}/getuserbyid/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// !update user
export const updateUser=(username,email,id)=>{
    return fetch(`${API}/updateuser/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username,email})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}