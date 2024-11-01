import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SettingsLayout } from "../layout/SettingsLayout";
import { TaxSetting } from "../pages/settings/TaxSetting";
import { Permissions } from "../pages/settings/Permissions";
import { Users } from "../pages/settings/Users";
import { SetUser } from "../pages/settings/SetUser";

export const SettingsRouter = () =>{
    return(
        <SettingsLayout>
            <Routes>
                <Route path={routes.setting().taxSetting()} element={<TaxSetting/>} />
                <Route path={routes.setting().users()} element={<Users/>} />
                <Route path={routes.setting().createUser()} element={<SetUser/>} />
                <Route path={routes.setting().updateUser()} element={<SetUser/>} />
                <Route path={routes.setting().permission()} element={<Permissions/>} />
                <Route path={'*'} element={<Navigate to={routes.setting().users()}/>} />
            </Routes>
        </SettingsLayout>
    )
}