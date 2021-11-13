import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth ,createUserWithEmailAndPassword,doc,setDoc,db} from "../configs/firebase";
import { GlobalContext } from "../context/context";


function ResOwner(){
    let history = useHistory();
    let {state , dispatch} = useContext(GlobalContext)
    let [emailInp , setEmailInp] = useState('');
    let [usernameInp , setUsernameInp] = useState('');
    let [nameOfRes , setNameOfRes] = useState('');
    let [cityInp , setCityInp] = useState('');
    let [countryInp , setCountryInp] = useState('');
    let [passwordInp , setPasswordInp] = useState('');
    async function registerResUser(){
      try {
        let {user} = await createUserWithEmailAndPassword(auth,emailInp,passwordInp);
        let UserObj = {
            email : user.email,
            username : usernameInp,
            resturantname : nameOfRes,
            city : cityInp,
            country : countryInp,
            UID : user.uid,
            type : 'resturant',
        }
        let Ref = doc(db,'ResUsers',user.uid);
        try {
            await setDoc(Ref , UserObj)
            history.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
      } catch (error) {
          console.log(error)
      }
      
    }
    
    
    return(
        <>
        <div id="main-heading">
        <label>Name Of ResTaurant : <input type='email' value={nameOfRes} onChange={(e)=>{setNameOfRes(e.target.value)}}/></label><br />
        <label>Email : <input type='email' value={emailInp} onChange={(e)=>{setEmailInp(e.target.value)}}/></label><br />
        <label>Username : <input type='text' value={usernameInp} onChange={(e)=>{setUsernameInp(e.target.value)}}/></label><br />
        <label>City : <input type='text' value={cityInp} onChange={(e)=>{setCityInp(e.target.value)}}/></label><br />
        <label>Country : <input type='text' value={countryInp} onChange={(e)=>{setCountryInp(e.target.value)}}/></label><br />
        <label>Password : <input type='password' value={passwordInp} onChange={(e)=>{setPasswordInp(e.target.value)}}/></label><br />
        <button onClick={registerResUser}>Submit</button>
        </div>
        </>
    )
}

export default ResOwner;