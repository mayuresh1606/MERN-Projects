import React from "react";
import "./styles.css";
import { FcLike, FcDislike } from "react-icons/fc";
import { MdOutlineModeComment } from "react-icons/md";
import { useGlobalContext } from "../../context";
import { Post } from "../Post";

export const Container = ({ posts, setPosts, user }) => {
    const {increaseLike, decreaseLike} = useGlobalContext()
    return <>
        <div className="container">
            <div className="left-container">
                {posts ? <>
                {posts.map((post) => {
                    const { comments } = post
                    let commentsCount = 0;
                    if (comments){
                        commentsCount = comments.length;
                    }
                    return <Post commentsCount={commentsCount} comments={comments} post={post}></Post>
                    // return <article className="post-home" key={_id}>
                    //     <div className="name">
                    //         {/* <img src="" alt="err" /> */}
                    //         <strong>{ creator }</strong>
                    //     </div>
                    //     <div className="post-img">
                    //         <img src={selectedFile ? selectedFile : "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"} alt="" />
                    //     </div>
                    //     <div className="like-comment">
                    //         <div className="like">
                    //             { likedBy.includes(user) ? <FcDislike onClick={() => decreaseLike(_id, user)} className="like-icon" ></FcDislike > : <FcLike onClick={() => increaseLike(_id, user)} className="like-icon"></FcLike> }
                    //             <span>{likeCount}</span>
                    //         </div>
                    //         <MdOutlineModeComment className="comment"></MdOutlineModeComment>
                    //     </div>
                    //     <div className="cap-tags">
                    //         <p className="caption"><strong>{creator}</strong> {caption}</p>
                    //         {tags.length !== 0 && tags.map((tag) => <p key={tag} className="tag">#{tag}</p> )}
                    //     </div>
                    // </article>
                })}
            </> : <p>Login first</p> }
            </div>
            <div className="right-container"></div>
        </div>
    </>
}