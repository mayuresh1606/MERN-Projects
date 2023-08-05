import React, { useState } from "react";
import "./dialog.css"
import { AiOutlineClose } from "react-icons/ai"
import { FcLikePlaceholder } from "react-icons/fc"
import { HiArrowRight } from "react-icons/hi"
import axios from "axios";
import { useGlobalContext } from "../context";

export const DialogBox = ({ comments }) => {
    const userName = localStorage.getItem("userName");
    const {dialogBox, setDialogBox} = useGlobalContext();

    const [commentDetails, setCommentDetails] = useState({
        commentBy: userName,
        comment: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComments = [...comments, commentDetails];
        const {data} = await axios.patch(`http://localhost:5000/post/updateComments/${dialogBox.postId}`, newComments);
        if (data.post.acknowledged){
            setDialogBox({
                flag:true,
                comments: newComments
            });
        }
    }

    return <>
        <div className="dialog">
            <div className="top">
                <div className="icon"><AiOutlineClose onClick={() => setDialogBox({
                    flag: false,
                    comments: [],
                    postId: ""
                })} ></AiOutlineClose></div>
            </div>
            <div className="main">
                <div className="comments">
                    {comments.map((commentDict, index) => {
                        const {commentBy, comment} = commentDict
                        return <div key={index} className="comment-box">
                        <div className="name-com">
                            <p className="userName">{commentBy}</p>
                            <p className="comment">{comment}</p>
                        </div>
                        <div className="like">
                            <FcLikePlaceholder></FcLikePlaceholder>
                        </div>
                    </div>
                    })}
                </div>
                <form className="postComment" onSubmit={handleSubmit}>
                    <input onChange={(e) => setCommentDetails({...commentDetails, comment: e.currentTarget.value})} type="text" placeholder="comment" />
                    <button type="submit" className="sub-comment">
                        <HiArrowRight></HiArrowRight>
                    </button>
                </form>
            </div>
        </div>
    </>
}