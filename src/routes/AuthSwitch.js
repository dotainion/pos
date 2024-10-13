import React from "react";
import { AccessRouter } from "./AccessRouter";
import { AuthRouter } from "./AuthRouter";
import { useAuth } from "../providers/AuthProvider";
import { closeAuthNotification } from "../information/AuthNotification";

export const AuthSwitch = () =>{
    const { isAuthenticated } = useAuth();

    if(isAuthenticated){
        return <AccessRouter/>
    }
    closeAuthNotification();
    return <AuthRouter/>
}