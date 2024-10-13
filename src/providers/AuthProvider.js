import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { token } from "../utils/Token";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthNotification } from "../information/AuthNotification";

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const resetAuth = () =>{
        setUser(null);
        setIsAuthenticated(false);
    }

    const signIn = (email, password, callback) =>{
        api.auth.signIn(email, password).then((response)=>{
            token.set(response.data.data[0].attributes.token);
            api.reInitializeAuthorizationHeader();
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
            callback({success: response});
        }).catch((error)=>{
            resetAuth();
            callback({error});
        });
    }

    const signOut = () =>{
        api.auth.logout().then((response)=>{
            token.set(null);
            resetAuth();
        }).catch((error)=>{
            token.set(null);
            resetAuth();
        });
    }

    useEffect(()=>{
        api.auth.session().then((response)=>{
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
        }).catch((error)=>{
            resetAuth();
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const value = {
        user,
        isAuthenticated,
        signIn,
        signOut,
        resetAuth
    }

    return(
        <Context.Provider value={value}>
            {
                loading 
                ? null 
                : <>
                    {children}
                    <AuthNotification/>
                </>
            }
        </Context.Provider>
    )
}