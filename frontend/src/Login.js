import React from 'react'
import './Login.css'
import {useState, useEffect} from 'react'
import Axios from "axios";
import CryptoJS from 'crypto-js';

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [check, setCheck] = useState(0);

    function usernameChange(e){
        setUsername(e.target.value);
    }
    function passwordChange(e){
        setPassword(e.target.value);
    }
    useEffect(() => {
        if(password.length>0 && username.length>0)
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
        <div className="login">
             <h1>Login</h1>
            <form>
                <label>Username/Email: </label>
                <input type="text" id="name" value={username} onChange={usernameChange}  /><br />
                <label>Password: </label>
                <input type="password" id="password" value={password} onChange={passwordChange}  /><br />
                <button type="button" id="signup" onClick={loginfn} >Login</button>
            </form>
        </div>
    )

    function loginfn(){
        if(check==1)
        {
            Axios.get("http://localhost:3001/checkUser/"+username).then((response) => {
                if(response.data.length>0)
                {
                    // console.log(response.data[0].password);
                    var dec = CryptoJS.AES.decrypt(response.data[0].password, 'MeraDolaniaayaDola').toString(CryptoJS.enc.Utf8);

                    if(dec===password){
                        console.log("Logged IN");
                    }
                    else{
                        console.log("Incorrect Credentials");
                    }


                }else{
                    console.log("Incorrect Credentials");
                }
            })
        }
        else{
            alert("Enter required details");
        }
    }
}

export default Login
