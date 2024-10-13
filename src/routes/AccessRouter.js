import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from "../layout/Layout";
import { routes } from "./routes";
import { PointOfSale } from "../pages/pointOfSale/PointOfSale";
import { InventoryRouter } from "./InventoryRouter";
import { NavGrid } from "../pages/nav/NavGrid";
import { Orders } from "../pages/pointOfSale/Orders";
import { PosProvider } from "../providers/PosProvider";
import { useAuth } from "../providers/AuthProvider";
import { SettingsRouter } from "./SettingsRouter";
import { Test } from "../test/Test";

export const AccessRouter = () =>{
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to={routes.signin()} />
    }

    return(
        <PosProvider>
            <Layout>
                <Routes>
                    <Route path={routes.inv().default()} element={<InventoryRouter/>} />
                    <Route path={routes.nav().default()} element={<NavGrid/>} />
                    <Route path={routes.order().orders()} element={<Orders/>} />
                    <Route path={routes.pos().default()} element={<PointOfSale/>} />
                    <Route path={routes.setting().default()} element={<SettingsRouter/>} />
                    <Route path={'/test'} element={<Test/>} />
                    <Route path={'*'} element={<Navigate to={routes.pos().default()}/>} />
                </Routes>
            </Layout>
        </PosProvider>
    )
}