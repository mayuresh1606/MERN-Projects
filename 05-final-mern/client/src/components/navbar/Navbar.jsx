import React, { useState } from "react";
import { IoLogoInstagram } from "react-icons/io"
import "./styles.css"
import axios from "axios";
import { FiLogOut } from "react-icons/fi"
import { useNavigate, NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context";

export const Navbar = ({userName}) => {
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState("")
    const {setSearch, search, searchedUsers, setSearchedUsers} = useGlobalContext()    

    console.log(userName, "NAVBAR")
    const userN = localStorage.getItem("userName")
    const fetchProfileImg = async () => {
        const {data: {user: { profileImg }}} = await axios.get(`http://localhost:5000/user/username/${userN}`)
        setProfileImg(profileImg)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", {replace: true});
    }

    if (userN) fetchProfileImg()


    const handleSearch = async (e) => {
        e.preventDefault();
        if (search)
        try{
            const {data} = await axios.get(`http://localhost:5000/user/search?search=${search}`)
            setSearchedUsers(data.users);
            navigate("/search", {replace: true})
        }catch(err){
            console.log(err)
        }
    }

    return <>
        <nav className="navbar">
            <div className="logo">
                <IoLogoInstagram className="site-logo" />
            </div>
            <form className="search" onSubmit={handleSearch}>
                <input type="text" className="search-input" onChange={(e) => setSearch(e.currentTarget.value)}  />
                <button type="submit">Search</button>
            </form>
            <ul className="list">
                <li>{userN}</li>
                <li><NavLink to={"/user"}><img className="userImg" src={profileImg !== "string" ? profileImg :"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="err" /></NavLink></li>
                <li><FiLogOut onClick={handleLogout} className="logout" /></li>
            </ul>
        </nav>
    </>
}