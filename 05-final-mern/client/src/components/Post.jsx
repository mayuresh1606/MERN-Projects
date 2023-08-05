import React from "react";
import { FcLike, FcDislike } from "react-icons/fc";
import { CgComment } from "react-icons/cg";
import { useGlobalContext } from "../context";

export const Post = ({post, commentsCount, comments}) => {
    const {setDialogBox, increaseLike, decreaseLike} = useGlobalContext();
    const user = localStorage.getItem("userName");
    const { _id, creator, selectedFile, likedBy, likeCount, caption, tags, } = post
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
                            <div className="like">
                                <CgComment onClick={() => setDialogBox({
                                    flag: true,
                                    comments: comments,
                                    postId: _id
                                })} className="comment"></CgComment>
                                {/* { likedBy.includes(user) ? <FcDislike onClick={() => decreaseLike(_id, user)} className="like-icon" ></FcDislike > : <FcLike onClick={() => increaseLike(_id, user)} className="like-icon"></FcLike> } */}
                                { commentsCount && <span>{commentsCount}</span> }
                            </div>
                        </div>
                        <div className="cap-tags">
                            <p className="caption"><strong>{creator}</strong> {caption}</p>
                            {tags.length !== 0 && tags.map((tag) => <p key={tag} className="tag">#{tag}</p> )}
                        </div>
                </article>
}