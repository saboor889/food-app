import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { auth ,createUserWithEmailAndPassword ,doc , db ,setDoc } from "../configs/firebase";
import { GlobalContext } from "../context/context";

function Customer(){
    let history = useHistory();
    let {state , dispatch} = useContext(GlobalContext)
    let [emailInp , setEmailInp] = useState('');
    let [usernameInp , setUsernameInp] = useState('');
    let [phoneInp , setPhoneInp] = useState('');
    let [cityInp , setCityInp] = useState('');
    let [countryInp , setCountryInp] = useState('');
    let [passwordInp , setPasswordInp] = useState('');
    async function registerCusUser(){
        try {
            let {user} = await createUserWithEmailAndPassword(auth,emailInp,passwordInp);
            let UserObj = {
                email : user.email,
                username : usernameInp,
                phonenumber : phoneInp,
                city : cityInp,
                country : countryInp,
                UID : user.uid,
                type : 'customer'
            }
            let Ref = doc(db,'CusUsers',user.uid);
            console.log(state)

            try {
                await setDoc(Ref , UserObj)
                history.push('/home-cus')
            } catch (error) {
                console.log(error)
            }
          } catch (error) {
              console.log(error)
          }
    }

    // useState(function(){    
    //     console.log(state)
    //     if(state.CusUser.email == null){
    //     }else{
            
    //         history.push('/home-cus')
    //     }
    // },[state.CusUser])
    return(
        <>
    
        <label>Email : <input type='email' value={emailInp} onChange={(e)=>{setEmailInp(e.target.value)}}/></label><br />
        <label>Username : <input type='text' value={usernameInp} onChange={(e)=>{setUsernameInp(e.target.value)}}/></label><br />
        <label>Phone Number : <input type='number' value={phoneInp} onChange={(e)=>{setPhoneInp(e.target.value)}}/></label><br />
        <label>City : <input type='text' value={cityInp} onChange={(e)=>{setCityInp(e.target.value)}}/></label><br />
        <label>Country : <input type='text' value={countryInp} onChange={(e)=>{setCountryInp(e.target.value)}}/></label><br />
        <label>Password : <input type='password' value={passwordInp} onChange={(e)=>{setPasswordInp(e.target.value)}}/></label><br />
        <button onClick={registerCusUser}>Register</button>
        </>
    )
}

export default Customer;