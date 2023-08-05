import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import axios from "axios";
import { Navbar } from "../components/navbar/Navbar";
import { Container } from "../components/container/Container";
import { DialogBox } from "../components/DialogBox";

export const Home = () => {
    const navigate = useNavigate()
    const {userName, setUserName, setPosts, posts, dialogBox} = useGlobalContext();

    
    const [errorMsg, setErrorMsg] = useState({
        flag: false,
        message: ""
    })
    

    // console.log(token);
    useEffect(() => {
        const token = localStorage.getItem("token")
        const fetchPosts = async () => {
            try{
                const { data } = await axios.get("http://localhost:5000/post/home/", {
                    headers:{
                    Authorization: `Bearer ${token}`
                    }
                })
                localStorage.setItem("userName", data.userName);
                setUserName(data.userName);
                setPosts(data.posts);
            }catch(err){
                if (err.response.status === 403){
                    setErrorMsg({
                        flag:true,
                        message: "Session Expired! Login again."
                    })
                    // alert("Session Expired! Login Again.")
                    // navigate("/login", {replace: true})
                }
            }
        }
        if (token) fetchPosts()
        else navigate("/login", {replace: true});
    }, [navigate])

    return <>
        <Navbar userName={userName} />
        <Container user={userName} setPosts={setPosts} posts={posts}></Container>
        { dialogBox.flag && <DialogBox comments={dialogBox.comments}></DialogBox>}
        { errorMsg.flag && errorMsg.message }
    </>
}