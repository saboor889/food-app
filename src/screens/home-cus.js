import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Logout from "../components/logout";
import { collection , db , getDocs } from "../configs/firebase";
import { GlobalContext } from "../context/context";

function HomeCus(){
    let history = useHistory();
    let {state , dispatch} = useContext(GlobalContext);
    let [objClon , setObjClon] = useState([])
    useEffect(async function(){
        let dataRef = collection(db ,'ResUsers')
        let dataRes = await getDocs(dataRef);
        let userClone = [] ;
        dataRes.forEach(function(doc){
            userClone.push(doc)
            setObjClon(userClone);   
        })
    
    },[state.dataGet])
    
    function productBtn(e){
        let ProductId = e.parentNode.id;
        
        localStorage.setItem('ProductId' , ProductId)
        dispatch({type : 'PRODUCT_GET_ID' , payload : ProductId})
        history.push('/product-user')
    }
    return(
        <>
        <Logout />
        <h2>Hello User</h2>
        {
            objClon.map(function(doc){
                return(
                    
                  <div id={doc.id} key={doc.id}>

                  <button   onClick={(e)=>{productBtn(e.target)}}>{doc.data().username}</button>
                  
                 </div>
                  
                )
            })
        }
        </>
    )
}

export default HomeCus