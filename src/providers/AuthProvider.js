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

    const signIn = (email, password, callback) =>{
        api.auth.signIn(email, password).then((response)=>{
            token.set(response.data.data[0].attributes.token);
            api.reInitializeAuthorizationHeader();
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
            callback({success: response});
        }).catch((error)=>{
            setUser(null);
            setIsAuthenticated(false);
            callback({error});
        });
    }

    const signOut = () =>{
        api.auth.logout().then((response)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        }).catch((error)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        });
    }

    useEffect(()=>{
        api.auth.session().then((response)=>{
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
        }).catch((error)=>{
            setUser(null);
            setIsAuthenticated(false);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const value = {
        user,
        isAuthenticated,
        signIn,
        signOut,
    }

    return(
        <Context.Provider value={value}>
            {loading ? null : children}
            <AuthNotification/>
        </Context.Provider>
    )
}