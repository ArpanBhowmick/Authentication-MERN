import { useEffect } from "react";
import axios from "@/api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        // attach access token automatically
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },

      (error) => Promise.reject(error),
    );

    // RESPONSE INTERCEPTOR
    // .use() accepts two functions Meaning:
    // If request successful → run first function
    // If request fails → run second function
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,

      // if request fails
      async (error) => {
        const prevRequest = error?.config;

        // access token expired
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            // get new access token
            const response = await axios.post("/refreshToken");

            // updates Context API with NEW token.
            setAuth((prev) => ({
              ...prev,
              accessToken: response.data.accessToken,
            }));

            // attach new token
            prevRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

            // retry original request
            return axios(prevRequest);
          } catch (err) {
            setAuth({});

            navigate("/login");

            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );

    // cleanup
    return () => {
      axios.interceptors.request.eject(requestIntercept);

      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return axios;
};

export default useAxiosPrivate;
