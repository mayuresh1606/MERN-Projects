import React from "react";
import { IoLogoInstagram } from "react-icons/io"
import "./styles.css"

export const Navbar = ({userName}) => {
    return <>
        <nav className="navbar">
            <div className="logo">
                <IoLogoInstagram className="site-logo" />
            </div>
            <div className="search">
                <input type="text" className="search-input" />
            </div>
            <ul className="list">
                <li>{userName}</li>
                <li><img className="userImg" src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="err" /></li>
            </ul>
        </nav>
    </>
}