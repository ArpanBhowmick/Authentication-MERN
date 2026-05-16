import axios from "@/api/axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
  console.log(auth);
  }, [auth]);

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
