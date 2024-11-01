import React from "react";
import { AccessRouter } from "./AccessRouter";
import { AuthRouter } from "./AuthRouter";
import { useAuth } from "../providers/AuthProvider";

export const AuthSwitch = () =>{
    const { isAuthenticated } = useAuth();

    if(isAuthenticated){
        return <AccessRouter/>
    }
    return <AuthRouter/>
}