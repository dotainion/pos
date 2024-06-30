import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SignIn } from "../pages/accounts/SignIn";
import { SignUp } from "../pages/accounts/SignUp";

export const AuthRouter = () =>{
    return(
        <Routes>
            <Route path={routes.signin()} element={<SignIn/>} />
            <Route path={routes.signup()} element={<SignUp/>} />
            <Route path={'*'} element={<Navigate to={routes.signin()}/>} />
        </Routes>
    )
}