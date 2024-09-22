import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SettingsLayout } from "../layout/SettingsLayout";
import { TaxSetting } from "../pages/settings/TaxSetting";
import { TaxOptions } from "../pages/settings/TaxOptions";

export const SettingsRouter = () =>{
    return(
        <SettingsLayout>
            <Routes>
                <Route path={routes.setting().taxSetting()} element={<TaxSetting/>} />
                <Route path={routes.setting().options()} element={<TaxOptions/>} />
                <Route path={'*'} element={<Navigate to={routes.setting().options()}/>} />
            </Routes>
        </SettingsLayout>
    )
}