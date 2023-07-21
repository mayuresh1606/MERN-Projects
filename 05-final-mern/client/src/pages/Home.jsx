import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import axios from "axios";
import { Navbar } from "../components/navbar/Navbar";
import { Container } from "../components/container/Container";

export const Home = () => {
    const navigate = useNavigate()
    // const {token, setToken} = useGlobalContext();

    const [posts, setPosts] = useState([]);
    const [errorMsg, setErrorMsg] = useState({
        flag: false,
        message: ""
    })
    const [userName, setUserName] = useState("");

    // console.log(token);
    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log(token, "CLIENT")
        const fetchPosts = async () => {
            try{
                const { data } = await axios.get("http://localhost:5000/post/home/", {
                    headers:{
                    Authorization: `Bearer ${token}`
                    }
                })
                console.log(data)
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
    }, [])

    return <>
        <Navbar userName={userName} />
        <Container user={userName} posts={posts}></Container>
        
        { errorMsg.flag && errorMsg.message }
    </>
}