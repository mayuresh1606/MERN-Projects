import React from "react";
import "./styles.css";
import { FcLike, FcDislike } from "react-icons/fc";
import { MdOutlineModeComment } from "react-icons/md";
import axios from "axios";

export const Container = ({ posts, user }) => {
    const increaseLike = async (id, user) => {
        const { data } = await axios.patch(`http://localhost:5000/post/increaselike/${id}`, {
            userName: user,
            id
        });
        console.log(data)
    }
    const decreaseLike = async (id, user) => {
        const { data } = await axios.patch(`http://localhost:5000/post/decreaselike/${id}`, {
            userName: user,
            id
        });
        console.log(data)
    }
    return <>
        <div className="container">
            <div className="left-container">
                {posts ? <>
                {posts.map((post) => {
                    const { _id, creator, selectedFile, likedBy, likeCount, caption, tags } = post
                    return <article className="post" key={_id}>
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
                })}
            </> : <p>Login first</p> }
            </div>
            <div className="right-container"></div>
        </div>
    </>
}