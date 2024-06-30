import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { Products } from "../pages/inventory/Products";
import { InventoryLayout } from "../layout/InventoryLayout";
import { CreateItem } from "../pages/inventory/CreateItem";
import { Categories } from "../pages/inventory/Categories";
import { Discounts } from "../pages/inventory/Discounts";
import { CreateCategory } from "../pages/inventory/CreateCategory";
import { CreateDiscount } from "../pages/inventory/CreateDiscount";

export const InventoryRouter = () =>{
    return(
        <InventoryLayout>
            <Routes>
                <Route path={routes.inv().products()} element={<Products/>} />
                <Route path={routes.inv().createItem()} element={<CreateItem/>} />
                <Route path={routes.inv().categories()} element={<Categories/>} />
                <Route path={routes.inv().discounts()} element={<Discounts/>} />
                <Route path={routes.inv().createCategory()} element={<CreateCategory/>} />
                <Route path={routes.inv().createDiscount()} element={<CreateDiscount/>} />
                <Route path={'*'} element={<Products/>} />
            </Routes>
        </InventoryLayout>
    )
}