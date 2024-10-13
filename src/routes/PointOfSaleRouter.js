import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SearchDiscounts } from "../pages/pointOfSale/components/SearchDiscounts";
import { SearchCustomers } from "../pages/pointOfSale/components/SearchCustomers";
import { SearchItems } from "../pages/pointOfSale/components/SearchItems";
import { PosLayout } from "../layout/PosLayout";
import { CheckoutOrder } from "../pages/pointOfSale/components/CheckoutOrder";
import { CreateCustomer } from "../pages/pointOfSale/components/CreateCustomer";

export const PointOfSaleRouter = () =>{
    return(
        <PosLayout>
            <Routes>
                <Route path={routes.pos().discounts()} element={<SearchDiscounts/>} />
                <Route path={routes.pos().customers()} element={<SearchCustomers/>} />
                <Route path={routes.pos().items()} element={<SearchItems/>} />
                <Route path={routes.pos().createCustomer()} element={<CreateCustomer/>} />
                <Route path={routes.pos().checkout()} element={<CheckoutOrder/>} />
                <Route path={'*'} element={<Navigate to={routes.pos().items()}/>} />
            </Routes>
        </PosLayout>
    )
}