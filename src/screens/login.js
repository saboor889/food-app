import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Logout from "../components/logout";
import { auth ,signInWithEmailAndPassword , doc , db , getDoc } from "../configs/firebase";
import { GlobalContext } from "../context/context";

function Login(){
    let {state , dispatch} = useContext(GlobalContext)
    let history = useHistory();
    let [emailInp , setEmailInp] = useState('');
    let [passwordInp , setPasswordInp] = useState('');
 

     function loginBtn(){
         
        signInWithEmailAndPassword(auth , emailInp  , passwordInp)
            .then(async function({user}){
                if(user){

        
             
            }})
            .catch(function(err){
                console.log(err)
            })
        
        
       
    }

    useEffect(function(){
        if(state.authUser != undefined){
            if(state.authUser.type === 'resturant'){
                history.push('/dashboard')
    
            }else if(state.authUser.type === 'customer'){
                
                history.push('/home-cus')
            }
        }
        else{
            history.push('/')
        }
    },[loginBtn])


    return(
        <>
        <label>Email : <input type='email' value={emailInp} onChange={(e)=>{setEmailInp(e.target.value)}} /></label><br />
        <label>Password : <input type='password' value={passwordInp} onChange={(e)=>{setPasswordInp(e.target.value)}} /></label><br />
        <button onClick={loginBtn}>Login</button><br />


        </>
    )
}

export default Login;