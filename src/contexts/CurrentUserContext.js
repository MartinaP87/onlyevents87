import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import { useHistory } from "react-router-dom";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)


export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    const handleMount = async () => {
      // It requests the user data to the API endpoint and
      // stores it in the currentUser variable.
      try {
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        //console.log(err);
      }
    };
    
    useEffect(() => {
      handleMount();
    }, []);

    useMemo(() => {
      // It creates the request interceptor
      // attached to axoisReq.
        axiosReq.interceptors.request.use(
            async (config) => {
              // It checks if the token should be refreshed.
              if (shouldRefreshToken()) {
                // It trys to refesh the token
                // before sending the request.
                try {
                    await axios.post("/dj-rest-auth/token/refresh/");
                }catch (err){
                  // If it fails and the was previously logged in,
                  // it redirects to the sign in page, sets the currentUser
                  // to null and removes the token timestamp.
                    setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                            history.push("/signin");
                        }
                        return null;
                    });
                    removeTokenTimestamp();
                    return config;
                }}
                
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        // It creates the response interceptor 
      // attached to axiosRes. If there's no error
      // it will return the response.

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
              // If the error is 401 
              // it will try to refresh the token,
              if (err.response?.status === 401) {
                try {
                  await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                  //  if it fails it redirects to the sign in
                 // page, sets the user data to null and 
                 //removes the token timestamp.
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push("/signin");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    // If there is no error refreshing the token, it 
                    // returns the axios instance with the error.config
                    // to exit the interceptor.
                    return axios(err.config);
                }
                // If the error isn't 401, it rejects the promise with the
                // error to exit the interceptor.
                return Promise.reject(err);
            }
        );
    }, [history]);

    return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
    );
}