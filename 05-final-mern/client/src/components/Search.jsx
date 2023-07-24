import React from "react";
import { useGlobalContext } from "../context";
import { Navbar } from "./navbar/Navbar";
import "./container/styles.css"
import "./search.css"
import axios from "axios";

export const Search = () => {
    const {searchedUsers, search, userName, setSearchedUsers} = useGlobalContext();
    const userN = localStorage.getItem("userName")

    const followUser = async (id, userName2) => {
        const { data } = await axios.patch(`http://localhost:5000/user/follow/${id}`, {
            userName: userName,
            userName2: userName2
        })
        if (data.user) setSearchedUsers(() => searchedUsers.map((user) => {
            if (user._id === id){
                if (!user.followersList.includes(userN)) user.followersList.push(userN);
            }
            return user
        }))
    }
    
    const unFollowUser = async (id, userName2) => {
        const { data } = await axios.patch(`http://localhost:5000/user/removeFollower/${id}`, {
            userName: userName,
            userName2: userName2
        })
        if (data.user) setSearchedUsers(() => searchedUsers.map((user) => {
            if (user._id === id){
                if (user.followersList.includes(userN)) user.followersList.pop(userN);
            }
            return user
        }))
    }

    console.log(searchedUsers)
    return <>
        <Navbar userName={userName}></Navbar>
        <div className="container">
            <div className="left-container">
                {searchedUsers && searchedUsers.map((user) => {
                    return <><article className="post" key={user._id}>
                        <div className="img-name">
                            <img className="profile-img" src={user.profileImg !== "string" ? user.profileImg : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="err" />
                            <p>{user.userName}</p>
                        </div>
                        <div className="user-info">
                            <div className="followers-info">
                                <div className="following">
                                    <span className="follow-number">{user.followingList.length}</span>
                                    <p className="follow-number">Following</p>
                                </div>
                                <div className="followers">
                                    <span className="follow-number">{user.followersList.length}</span>
                                    <p className="follow-number">Followers</p>
                                </div>
                            </div>
                            <div className="follow-btn">
                                { user.followersList.includes(userN) ? <button onClick={() => unFollowUser(user._id, user.userName)}>UnFollow</button> : <button onClick={() => followUser(user._id, user.userName)}>Follow</button> }
                            </div>
                        </div>
                    </article> <div className="line" /></>
                })}
            </div>
            <div className="right-container"></div>
        </div>
    </>
}