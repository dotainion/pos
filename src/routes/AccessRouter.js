import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from "../layout/Layout";
import { routes } from "./routes";
import { PointOfSale } from "../pages/pointOfSale/PointOfSale";
import { InventoryRouter } from "./InventoryRouter";

export const AccessRouter = () =>{
    if(false){
        return <Navigate to={routes.signin()} />
    }

    return(
        <Layout>
            <Routes>
                <Route path={routes.inv().default()} element={<InventoryRouter/>} />
                <Route path={routes.pos().default()} element={<PointOfSale/>} />
                <Route path={'*'} element={<PointOfSale/>} />
            </Routes>
        </Layout>
    )
}