import React from "react";
import { auth , signOut  } from "../configs/firebase";

function Logout(){
    async function logoutBtn(){
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <button onClick={logoutBtn}>Logout</button>
        </>
    )
}

export default Logout