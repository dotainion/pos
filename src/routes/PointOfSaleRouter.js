import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SearchDiscounts } from "../pages/pointOfSale/components/SearchDiscounts";
import { SearchCustomers } from "../pages/pointOfSale/components/SearchCustomers";
import { SearchItems } from "../pages/pointOfSale/components/SearchItems";
import { PosLayout } from "../layout/PosLayout";
import { CheckoutOption } from "../pages/pointOfSale/components/CheckoutOption";
import { CreateCustomer } from "../pages/pointOfSale/components/CreateCustomer";

export const PointOfSaleRouter = () =>{
    return(
        <PosLayout>
            <Routes>
                <Route path={routes.pos().discounts()} element={<SearchDiscounts/>} />
                <Route path={routes.pos().customers()} element={<SearchCustomers/>} />
                <Route path={routes.pos().items()} element={<SearchItems/>} />
                <Route path={routes.pos().createCustomer()} element={<CreateCustomer/>} />
                <Route path={'*'} element={<CheckoutOption/>} />
            </Routes>
        </PosLayout>
    )
}