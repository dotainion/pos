import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from "../layout/Layout";
import { routes } from "./routes";
import { PointOfSale } from "../pages/pointOfSale/PointOfSale";
import { InventoryRouter } from "./InventoryRouter";
import { NavGrid } from "../pages/nav/NavGrid";
import { Orders } from "../pages/pointOfSale/Orders";
import { PosProvider } from "../providers/PosProvider";

export const AccessRouter = () =>{
    if(false){
        return <Navigate to={routes.signin()} />
    }

    return(
        <PosProvider>
            <Layout>
                <Routes>
                    <Route path={routes.inv().default()} element={<InventoryRouter/>} />
                    <Route path={routes.nav().grid()} element={<NavGrid/>} />
                    <Route path={routes.order().orders()} element={<Orders/>} />
                    <Route path={routes.pos().default()} element={<PointOfSale/>} />
                    <Route path={'*'} element={<Navigate to={routes.pos().default()}/>} />
                </Routes>
            </Layout>
        </PosProvider>
    )
}