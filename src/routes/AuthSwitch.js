import React from "react";
import { AccessRouter } from "./AccessRouter";
import { AuthRouter } from "./AuthRouter";

export const AuthSwitch = () =>{
    if(true){
        return <AccessRouter/>
    }
    return <AuthRouter/>
}