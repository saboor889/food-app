import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import Logout from "../components/logout";
import { GlobalContext } from "../context/context";

function Dashboard(){
    let {state , dispatch} = useContext(GlobalContext)
    let history = useHistory();

    return(
        <>
        <Logout />
        <h1>Dashboard</h1>

        <button onClick={()=>{
           history.push('/add-dish')
       }}>Add Dish</button>
       <button onClick={()=>{
           history.push('/res-dash')
       }}>Resturant Data</button>
        </>
    )
}

export default Dashboard;