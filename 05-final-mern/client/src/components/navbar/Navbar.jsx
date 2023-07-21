import React, { useState } from "react";
import { IoLogoInstagram } from "react-icons/io"
import "./styles.css"
import axios from "axios";
import { FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom";

export const Navbar = ({userName}) => {
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState("")
    console.log(userName, "NAVBAR")
    const fetchProfileImg = async () => {
        const {data: {user: { profileImg }}} = await axios.get(`http://localhost:5000/user/username/${userName}`)
        setProfileImg(profileImg)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", {replace: true});
    }

    if (userName) fetchProfileImg()

    return <>
        <nav className="navbar">
            <div className="logo">
                <IoLogoInstagram className="site-logo" />
            </div>
            <form className="search">
                <input type="text" className="search-input" />
                <button type="submit">Search</button>
            </form>
            <ul className="list">
                <li>{userName}</li>
                <li><img className="userImg" src={profileImg !== "string" ? profileImg :"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="err" /></li>
                <li><FiLogOut onClick={handleLogout} className="logout" /></li>
            </ul>
        </nav>
    </>
}