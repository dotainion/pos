import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SearchDiscounts } from "../pages/pointOfSale/components/SearchDiscounts";
import { SearchCustomers } from "../pages/pointOfSale/components/SearchCustomers";
import { SearchProducts } from "../pages/pointOfSale/components/SearchProducts";
import { PosLayout } from "../layout/PosLayout";
import { CheckoutOption } from "../pages/pointOfSale/components/CheckoutOption";

export const PointOfSaleRouter = () =>{
    return(
        <PosLayout>
            <Routes>
                <Route path={routes.pos().discounts()} element={<SearchDiscounts/>} />
                <Route path={routes.pos().customers()} element={<SearchCustomers/>} />
                <Route path={routes.pos().products()} element={<SearchProducts/>} />
                <Route path={'*'} element={<CheckoutOption/>} />
            </Routes>
        </PosLayout>
    )
}