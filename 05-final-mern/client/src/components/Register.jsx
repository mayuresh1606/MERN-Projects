import React, { useState } from "react";
import FileBase from "react-file-base64"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState({
        flag: false,
        message: ""
    })

    const [formDetails, setFormDetails] = useState({
        firstName:"",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImg: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formDetails);
        console.log(formDetails, "FORM")
        if(!formDetails.firstName){
            setErrorMsg({
                flag: true,
                message: "First Name is required"
            })
        }
        else if(!formDetails.lastName){
            setErrorMsg({
                flag: true,
                message: "Last Name is required"
            })
        }
        else if(!formDetails.email){
            setErrorMsg({
                flag: true,
                message: "Email is required"
            })
        }
        else if(!formDetails.userName){
            setErrorMsg({
                flag: true,
                message: "UserName is required"
            })
        }
        else if (formDetails.password.length < 8){
            setErrorMsg({
                flag: true,
                message: "Password must be atleast 8 characters!"
            })
        }
        else if (formDetails.confirmPassword !== formDetails.password){
            setErrorMsg({
                flag: true,
                message: "Both passwords do not match..."
            })
        }else{
            try{
                const {data} = await axios.post("http://localhost:5000/user/register", formDetails)
                if (data.user){
                    setErrorMsg({
                        flag: true,
                        message: data.message
                    })
                }
                navigate("/login", {replace: true})
            }catch(err){
                console.log(err);
                setErrorMsg({
                    flag: true,
                    message: err.response.data.message
                })
            }
        }
        setTimeout(() => {
            setErrorMsg({
                flag:false,
                message: ""
            })
        }, 6000)
        }

    return <>
        <form onSubmit={handleSubmit} className="form">
            <div className="content">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" placeholder="firstName" name="firstName" onChange={(e) => setFormDetails({...formDetails, firstName: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" placeholder="lastName" name="lastName" onChange={(e) => setFormDetails({...formDetails, lastName: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="userName">UserName: </label>
                <input type="text" placeholder="username" name="userName" onChange={(e) => setFormDetails({...formDetails, userName: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="email">E-mail: </label>
                <input type="text" placeholder="email" name="email" onChange={(e) => setFormDetails({...formDetails, email: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="Enter your password here..." name="password" onChange={(e) => setFormDetails({...formDetails, password: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" placeholder="Enter your password here..." name="password" onChange={(e) => setFormDetails({...formDetails, confirmPassword: e.currentTarget.value})} />
            </div>
            <div className="content">
                <label htmlFor="profileImg">Profile Picture: </label>
                <FileBase onDone={({base64}) => setFormDetails({...formDetails, profileImg: base64})}></FileBase>
                {/* <input type="file" placeholder="Enter your password here..." name="profileImg" onChange={(e) => setFormDetails({...formDetails, profileImg: e.currentTarget.value})} /> */}
            </div>
            <button type="submit">Submit</button>
            <p>Already a user? <a href="/login"> Log in</a></p>
            { errorMsg.flag && errorMsg.message }
        </form>
    </>
}