import React from 'react'
import "./Login.css"
import {auth, provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import { saveToLocalStorage } from '../localStore'

const Login = ({messages}) =>{
    const [{}, dispatch] = useStateValue()
    const eseguiLogin = () => {
        signInWithPopup(auth,provider).then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
            saveToLocalStorage("user", result.user)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className='login'>
            <div className='loginContainer'>
                <img src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"/>
                <div className='loginText'>
                    <h1>Login</h1>
                </div>
                <button type="submit" onClick={eseguiLogin}>Esegui login</button>
            </div>
        </div>
    )
}

export default Login