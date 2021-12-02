import React from 'react'
import './SignUp.css'
import {useState,useEffect} from 'react';
import Axios from "axios";
import CryptoJS from 'crypto-js';


 function SignUp() {

    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [check, setCheck] = useState(0);

    function nameChange(e){
        setName(e.target.value);
    }
    function usernameChange(e){
        setUsername(e.target.value);
    }
    function emailChange(e){
        setEmail(e.target.value);
    }
    function passwordChange(e){
        setPassword(e.target.value);
    }

    useEffect(() => {
        if(name.length>0 && password.length>0 && username.length>0 && email.length>0)
        {
            setCheck(1);
        }
        else{
            setCheck(0);
        }

        //Encryption
        //var ciphertext =CryptoJS.AES.encrypt((password), 'MeraDolaniaayaDola').toString();
    })

    
    


   

    return (
        <div className="signup">
            <h1>Create an Account</h1>
            <form>
                <label>Full Name: </label>
                <input type="text" id="name" value={name} onChange={nameChange}  /><br />
                <label>Username: </label>
                <input type="text" id="username" value={username} onChange={usernameChange}   /><br />
                <label>Email: </label>
                <input type="email" id="email" value={email} onChange={emailChange}  /><br />
                <label>Password: </label>
                <input type="password" id="password" value={password} onChange={passwordChange}  /><br />
                <button type="button" id="signup" onClick={signupfn} >SignUp</button>
            </form>
        </div>
    )


    function signupfn(){
        
        
        if(check==1)
        {
            Axios.get("http://localhost:3001/checkUser/"+username).then((response) => {
            
            //console.log(response.data[0].name);
        
            if(response.data.length>0)
            {
                alert("Username already registered!");

            }
            else{
                
                Axios.post("http://localhost:3001/createUser",{
                    name,
                    username,
                    email,
                    //Encrypted data before sending
                    "password":CryptoJS.AES.encrypt((password), 'MeraDolaniaayaDola').toString(),
                }).then((response) => {
                    //console.log(response.data.password);

                    //Decryption
                    var dec = CryptoJS.AES.decrypt(response.data.password, 'MeraDolaniaayaDola').toString(CryptoJS.enc.Utf8);

                    console.log("Decrypted: "+dec);
                })
                alert("Account created successfully")
                setName("");
                setUsername("");
                setEmail("");
                setPassword("");
            }
            })
        }
        else{
            alert("Enter required details");
        }
    }
}

export default SignUp
