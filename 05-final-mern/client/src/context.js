import React, { useState, useContext } from "react";
import axios from "axios";


const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [search, setSearch] = useState("")
    const [searchedUsers, setSearchedUsers] = useState("")
    const [userName, setUserName] = useState("");
    const [posts, setPosts] = useState([]);
    const [dialogBox, setDialogBox] = useState({
        flag: false,
        comments: [],
        postId: ""
    });

    // function for increasing and decreasing like count:
    const increaseLike = async (id, user) => {
        const { data } = await axios.patch(`http://localhost:5000/post/increaselike/${id}`, {
            userName: user,
            id
        });
        console.log(data);
        setPosts(() => posts.map((post) => {
            if (post._id === id){
                console.log(post)
                if (!post.likedBy.includes(user)){
                    post.likeCount += 1;
                    post.likedBy.push(user);
                }
            }
            return post;
        }));
    }
    const decreaseLike = async (id, user) => {
        const { data } = await axios.patch(`http://localhost:5000/post/decreaselike/${id}`, {
            userName: user,
            id
        });
        console.log(data)
        setPosts(() => posts.map((post) => {
            
            if (post._id === id){
                if (!post.likedBy.includes(user)){
                    return post
                }
                post.likedBy.pop(user)
                post.likeCount--;
            }
            return post;
        }));
    }



    return <AppContext.Provider value={{token, setToken, setSearch, search, searchedUsers, setSearchedUsers, userName, setUserName, posts, setPosts, increaseLike, decreaseLike, dialogBox, setDialogBox}}>{ children }</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}