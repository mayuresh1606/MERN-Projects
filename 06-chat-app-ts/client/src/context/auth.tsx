import React, { useState } from "react";
// import { useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// type UserType = {
//     email: string;
//     password: string;
// }

// type TokenUserType = {
//     email: string;
//     name: string;
// }

// type AuthContextType = {
//     login: (userData: UserType) => Promise<void>;
//     logout: () => void;
//     user: TokenUserType | null;
//     setUser: () => void;
// }

// const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = async ({children}) => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState<TokenUserType | null>(null);

//     const login = async (values: object) => {
//       console.log(values)
//       // const payload = JSON.stringify(values)
//       const config = {
//         url: `${process.env.REACT_APP_BACKEND_API_URL}user/login`,
//         method: "POST",
//         headers:{
//           "Content-Type": "application/json"
//         },
//         data: {
//           ...values
//         }
//       }
//       const { data } = await axios(config)
//       if (data?.token){
//         localStorage.setItem("token", data.token)
//         navigate("/")
//       }
//       if (data?.user) setUser(data.user);
//     }

//     return <AuthContext.Provider value={{user, setUser, login}}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//     return useContext(AuthContext)
// }