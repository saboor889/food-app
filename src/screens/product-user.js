import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { db , collection , getDocs , setDoc ,doc } from "../configs/firebase";
import { GlobalContext } from "../context/context";

function ProductUser(){
    let ProductId =localStorage.getItem('ProductId');
    let history = useHistory()
    let {state , dispatch} = useContext(GlobalContext);
    let [productObj , setProductObj] = useState([])
    useEffect(async function(){

        let dataRef = collection(db,'ResUsers',ProductId , 'products')
        try {
            let dataProducts = await getDocs(dataRef)
            let userClone = [];
            dataProducts.forEach(function(doc){
                userClone.push(doc.data())
                setProductObj(userClone)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    async function orderBtn(e){
        let dataRef = doc(db,'ResUsers',ProductId,'Orders',state.CusUser.UID)
        try {
            await setDoc(dataRef,{
                orderpersonUID : state.CusUser.UID,
                itemname : e.parentNode.children[1].innerText,
                price : e.parentNode.children[2].innerText,
                cateory : e.parentNode.children[3].innerText,
                delieverytype : e.parentNode.children[4].innerText
            })
            history.push('/order-page')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <h2>Products</h2>
        {
            productObj.map(function(doc){
                let {itemname , cateory,price,delieverytype,imageUrl} = doc;
                return(
                    <div key={imageUrl}>
                        <img src={imageUrl} />
                        <p>{itemname}</p>
                        <p>{price}</p>
                        <p>{cateory}</p> 
                        <b>{delieverytype}</b><br />
                        <button onClick={(e)=>{orderBtn(e.target)}}>Order</button>
                    </div>
                )
            })
        }
        </>
    )
}

export default ProductUser;