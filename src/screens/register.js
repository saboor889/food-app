import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../context/context";

function Register(){
    let history = useHistory();
    let {state , dispatch} = useContext(GlobalContext)

    return(
        <>
       <button onClick={()=>{
           history.push('/owner')
       }}>owner</button>
       <button onClick={()=>{
           history.push('/user')
       }}>user</button>
        </>
    )
}

export default Register;