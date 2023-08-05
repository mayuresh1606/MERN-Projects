import React, { useEffect, useState } from "react";
import { Navbar } from "../components/navbar/Navbar";
import axios from "axios";
import FileBase from "react-file-base64"
import "./styles.css"
import { FcDislike, FcLike } from "react-icons/fc";
import { CgComment } from "react-icons/cg";
// import { MdOutlineModeComment } from "react-icons/md";
import { useGlobalContext } from "../context";
import { DialogBox } from "../components/DialogBox";
import { Post } from "../components/Post";

export const UserHome = () => {
    const { increaseLike, decreaseLike, dialogBox, setDialogBox } = useGlobalContext();

    const user = localStorage.getItem("userName")
    const token = localStorage.getItem("token");

    const [postDetails, setPostDetails] = useState({
        caption: "",
        selectedFile: ""
    });
    const [posts, setPosts] = useState([]);
    
    const [errorMsg, setErrorMsg] = useState({
        flag: true,
        message: ""
    });

    useEffect(() => {
        const fetchUserPosts = async () => {
            const {data} = await axios.get("http://localhost:5000/post/", {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data);
            setPosts(data.posts);
        }

        fetchUserPosts();
    }, []);

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            if (!postDetails.caption){
                setErrorMsg({
                    flag: true,
                    message: "Caption cannot be blank!"
                })
            } else if (!postDetails.selectedFile){
                setErrorMsg({
                    flag: true,
                    message: "You need to upload a photo!"
                })
            }

            console.log(postDetails);
            const {data} = await axios.post("http://localhost:5000/post", {...postDetails, creator: user})
            setErrorMsg({ flag: true, message: data.message })
            setPosts([...posts, data.post]);
            
            if (errorMsg.flag) setTimeout(() => setErrorMsg({ flag: false, message: "" }), 5000) 
        }catch(err){
            console.log(err)
        }
    }


    return <>
        <Navbar userName={user} />
        { dialogBox.flag && <DialogBox comments={dialogBox.comments}></DialogBox>}
        <button className="create-post-btn" onClick={(e) => {
            e.currentTarget.nextElementSibling.className = "display"
        }}>Create a new post.</button>
        <form className="inv-form" onSubmit={handleSubmit} >
            <div className="inputFields">
                <label htmlFor="caption">Caption: </label>
                <input type="text" className="input" name="caption" 
                    onChange={(e) => setPostDetails({...postDetails, caption:e.currentTarget.value})}
                />
            </div>
            <div className="inputFields">
                <label htmlFor="tags">Tags: </label>
                <input type="text" className="input" name="tags" placeholder='No need to put "#" before each tag for multiple tags seperate them by space' 
                    onChange={(e) => setPostDetails({...postDetails, tags:e.currentTarget.value})}
                />
            </div>
            <div className="inputFields">
                <label htmlFor="location">Location: </label>
                <input type="text" className="input" name="location" placeholder='Enter location...' 
                    onChange={(e) => setPostDetails({...postDetails, location:e.currentTarget.value})}
                />
            </div>
            <div className="inputFields">
                <FileBase onDone={({base64}) => {
                    setPostDetails({...postDetails, selectedFile: base64})}
                } ></FileBase>
            </div>
            <button className="btn">Submit</button>
            {errorMsg.flag && <p>{errorMsg.message}</p>}
        </form>
        <div className="home-container">
            { posts && posts.map((post) => {
                const { comments } = post
                let commentsCount = 0;
                if (comments){
                    commentsCount = comments.length;
                }
                return <Post comments={comments} post={post} commentsCount={commentsCount}></Post>
            }) }
        </div>
    </>
}