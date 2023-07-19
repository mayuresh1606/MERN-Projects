import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [errorMsg, setErrorMsg] = useState({
        flag: false,
        message: ""
    })
    const navigate = useNavigate();
    // const {token, setToken} = useGlobalContext();
    // console.log(token)
    const [formDetails, setFormDetails] = useState({
        userName: "",
        password: ""
    })

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/", {replace: true})
    }, [])

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const {data: {token}} = await axios.post('http://localhost:5000/user/login/', formDetails);
            localStorage.setItem("token", token);
            // setToken(data.token);
            navigate("/", {replace: true})
        }catch(err){
            console.log(err)
            if (err.response.status === 401){
                setErrorMsg({flag: true, message: err.response.data.message})
                setTimeout(() => {
                    setErrorMsg({flag: false, message: ""})
                }, 5000)
            }else if(err.response.status === 404){
                setErrorMsg({flag: true, message: err.response.data.message})
                setTimeout(() => {
                    setErrorMsg({flag: false, message: ""})
                }, 5000)
            }else if (err.response.status === 500){
                setErrorMsg({flag: true, message: err.response.data.message})
                setTimeout(() => {
                    setErrorMsg({flag: false, message: ""})
                }, 5000)
            }
        }
    }

    return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form">
            <div className="content">
                <label htmlFor="userName">UserName: </label>
                <input type="text" placeholder="username/email" name="userName" onChange={(e) => setFormDetails({...formDetails, userName: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="Enter your password here..." name="password" onChange={(e) => setFormDetails({...formDetails, password: e.currentTarget.value})} />
            </div>
            <button type="submit">Submit</button>
            { errorMsg.flag && errorMsg.message }
            <p>Not a user? register <a href="/register"> here </a> </p>
        </form>
    </>
}