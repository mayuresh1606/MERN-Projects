import React, { useEffect, useState } from "react";
import { Navbar } from "../components/navbar/Navbar";
import axios from "axios";
import FileBase from "react-file-base64"
import "./styles.css"
import { FcDislike, FcLike } from "react-icons/fc";
import { MdOutlineModeComment } from "react-icons/md";
import { useGlobalContext } from "../context";

export const UserHome = () => {
    const { increaseLike, decreaseLike } = useGlobalContext();

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
            const {data} = await axios.post("http://localhost:5000/post", postDetails)
            setErrorMsg({ flag: true, message: data.message })
            setPosts([...posts, data.post]);
            
            if (errorMsg.flag) setTimeout(() => setErrorMsg({ flag: false, message: "" }), 5000) 
        }catch(err){
            console.log(err)
        }
    }

    return <>
        <Navbar userName={user} />
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
                const { _id, creator, selectedFile, likedBy, likeCount, caption, tags } = post
                return <article className="home-post">
                    <div className="name">
                            {/* <img src="" alt="err" /> */}
                            <strong>{ creator }</strong>
                        </div>
                        <div className="post-img">
                            <img src={selectedFile ? selectedFile : "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"} alt="" />
                        </div>
                        <div className="like-comment">
                            <div className="like">
                                { likedBy.includes(user) ? <FcDislike onClick={() => decreaseLike(_id, user)} className="like-icon" ></FcDislike > : <FcLike onClick={() => increaseLike(_id, user)} className="like-icon"></FcLike> }
                                <span>{likeCount}</span>
                            </div>
                            <MdOutlineModeComment className="comment"></MdOutlineModeComment>
                        </div>
                        <div className="cap-tags">
                            <p className="caption"><strong>{creator}</strong> {caption}</p>
                            {tags.length !== 0 && tags.map((tag) => <p key={tag} className="tag">#{tag}</p> )}
                        </div>
                </article>
            }) }
        </div>
    </>
}