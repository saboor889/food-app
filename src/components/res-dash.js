import React, { useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import { db , collection , getDocs , doc , setDoc , deleteDoc } from "../configs/firebase";
import { GlobalContext } from "../context/context";

function ResDash(){
    let {state , dispatch} = useContext(GlobalContext);
    useEffect(async function(){

       

        try {
            let dataRef = collection(db ,'ResUsers' , state.ResUser.UID , 'Orders')
            let ordersData = await getDocs(dataRef);
            ordersData.forEach(function(doc){
                dispatch({type : 'ORDERS_PENDING' , payload : doc})
            })
        } catch (error) {
            console.log(error)
        }

    },[state.authUser.UID])

    async function acceptedOrderBtn(e){
        let userOrderId = e.parentNode.id;
        
        try {
            
            let dataRef2 = doc(db ,'ResUsers' , state.ResUser.UID , 'Orders' , userOrderId)
            await deleteDoc(dataRef2);

            let dataRef3 = doc(db , 'ResUsers' , state.ResUser.UID , 'acceptedOrders' , userOrderId)
            await setDoc(dataRef3 , {
                orderStatus : 'Accepted',
                itemname : e.parentNode.children[0].innerText,
                cateory : e.parentNode.children[1].innerText,
                price : e.parentNode.children[2].innerText
            })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(async function(){

       

        try {
            let dataRef = collection(db ,'ResUsers' , state.ResUser.UID , 'acceptedOrders')
            let ordersData = await getDocs(dataRef);
            ordersData.forEach(function(doc){
                dispatch({type : 'ORDERS_ACCEPTED' , payload : doc})
            })
        } catch (error) {
            console.log(error)
        }

    },[state.authUser.UID])


    async function deliveredBtn(e){
        let userOrderId = e.parentNode.id;
        
        try {

            
            let dataRef2 = doc(db ,'ResUsers' , state.authUser.UID , 'acceptedOrders' , userOrderId)
            await deleteDoc(dataRef2);

          

            let dataRef3 = doc(db , 'ResUsers' , state.authUser.UID , 'deliveredOrders' , userOrderId)
            await setDoc(dataRef3 , {
                orderStatus : 'Delivered',
                itemname : e.parentNode.children[0].innerText,
                cateory : e.parentNode.children[1].innerText,
                price : e.parentNode.children[2].innerText
            })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(async function(){
        try {
            let dataRef = collection(db ,'ResUsers' , state.ResUser.UID , 'deliveredOrders')
            let ordersData = await getDocs(dataRef);
            ordersData.forEach(function(doc){
                dispatch({type : 'ORDERS_DELIVERED' , payload : doc})
            })
        } catch (error) {
            console.log(error)
        }

    },[state.authUser.UID])


    async function deleteBtn(e){
        let userOrderId = e.parentNode.id;
        try {
            let dataRef2 = doc(db ,'ResUsers' , state.ResUser.UID , 'deliveredOrders' , userOrderId)
            await deleteDoc(dataRef2);
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <>
        <h3>Dashboard Data</h3>
        <h4>Pending</h4>
        {
            state.ordersPending.map(function(doc , i){
                return (
                    <div key = {i} id ={doc.id}>
                        <p>{doc.data().itemname}</p>
                        <p>{doc.data().cateory}</p>
                        <p>{doc.data().price}</p> 
                        <button onClick={(e)=>{acceptedOrderBtn(e.target)}}>Accepted</button>
                    </div>
                )
            })
        }
        <h4>accepted</h4>
        {
            state.ordersAccepted.map(function(doc , i){
                return (
                    <div key = {i} id ={doc.id}>
                        <p>{doc.data().itemname}</p>
                        <p>{doc.data().cateory}</p>
                        <p>{doc.data().price}</p> 
                        <button onClick={(e)=>{deliveredBtn(e.target)}}>deliveredBtn</button>
                    </div>
                )
            })
        }
        <h4>Delivered</h4>
        {
            state.ordersDelivered.map(function(doc , i){
                return (
                    <div key = {i} id ={doc.id}>
                        <p>{doc.data().itemname}</p>
                        <p>{doc.data().cateory}</p>
                        <p>{doc.data().price}</p> 
                        <button onClick={(e)=>{deleteBtn(e.target)}}>Delete</button>
                    </div>
                )
            })
        }
        </>
    )
}

export default ResDash;