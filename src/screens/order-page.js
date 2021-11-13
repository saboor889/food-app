import React, { useContext, useEffect, useState } from "react";
import Logout from "../components/logout";
import { db , getDoc , doc } from "../configs/firebase";
import { GlobalContext } from "../context/context";


function OrderPage(){
    let ProductId =localStorage.getItem('ProductId');
    let {state , dispatch} = useContext(GlobalContext);
    let [orderStatus1 , setOrderStatus1] = useState('')
   
    

    useEffect(async function(){
        try {
            let dataRef = doc(db,'ResUsers',ProductId,'acceptedOrders',state.authUser.UID);
            let userOrders = await getDoc(dataRef);
            if(userOrders.data() != undefined){
                setOrderStatus1(userOrders.data().orderStatus)
            }
            
        } catch (error) {
            console.log(error)
        }
    },[state,orderStatus1])
    useEffect(async function(){
        try {
            let dataRef = doc(db,'ResUsers',ProductId,'deliveredOrders',state.authUser.UID);
            let userOrders = await getDoc(dataRef);
           
            if(userOrders.data() != undefined){
                setOrderStatus1(userOrders.data().orderStatus)
            }
        } catch (error) {
            console.log(error)
        }
    },[state])
    
    return(
        <>
        <Logout />
        <h3>Your Order Details</h3>
        {
            console.log(orderStatus1),
            orderStatus1 === undefined ? <h2>Pending</h2> : orderStatus1 === "Accepted" ? <h2>Accepted</h2> :
            orderStatus1 === 'Delivered' ? <h2>Delivered</h2> : <h2>Pending</h2>

            
        }
    
        </>
    )
}

export default OrderPage;