import axios from "@/api/axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const verifyUser = async () => {

      try {
        const response = await axios.post("/refreshToken", {
          withCredentials: true,
        });

        setAuth({
          user: response?.data?.user,
          accessToken: response?.data?.accessToken,
        });      

        // console.log(auth)
        // console.log(auth) shows {} because setAuth() updates state asynchronously, not immediately.
      } catch (error) {
        console.error("Error verifying user:", error);
      } finally {
         setLoading(false);
      }
    };
    
    verifyUser();

  }, []);

  // useEffect(() => {
  // console.log(auth);
  // }, [auth]);

  useEffect(() => {

  if (!auth?.accessToken) return;

  // Token expires at "time"
  const decoded = jwtDecode(auth.accessToken);

  // "At what time does the token expire?" in milliseconds
  const expirationTime = decoded.exp * 1000;

  // "What time is it RIGHT NOW?"
  const currentTime = Date.now();

  const timeout = expirationTime - currentTime;

  const timer = setTimeout(() => {

    setAuth({});

    navigate("/login");

  }, timeout);

  return () => clearTimeout(timer);

}, [auth?.accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
