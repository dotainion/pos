import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { Items } from "../pages/inventory/Items";
import { InventoryLayout } from "../layout/InventoryLayout";
import { SetItem } from "../pages/inventory/SetItem";
import { Categories } from "../pages/inventory/Categories";
import { Discounts } from "../pages/inventory/Discounts";
import { SetCategory } from "../pages/inventory/SetCategory";
import { SetDiscount } from "../pages/inventory/SetDiscount";
import { Customers } from "../pages/inventory/Customers";
import { SetCustomer } from "../pages/inventory/SetCustomer";
import { ItemSettingsAndAlert } from "../pages/inventory/ItemSettingsAndAlert";
import { ItemSupplierAndInformation } from "../pages/inventory/ItemSupplierAndInformation";
import { BundleItems } from "../pages/inventory/BundleItems";

export const InventoryRouter = () =>{
    return(
        <InventoryLayout>
            <Routes>
                <Route path={routes.inv().items()} element={<Items/>} />
                <Route path={routes.inv().bundleItems()} element={<BundleItems/>} />
                <Route path={routes.inv().createItem()} element={<SetItem/>} />
                <Route path={routes.inv().updateItem()} element={<SetItem/>} />
                <Route path={routes.inv().itemSettings()} element={<ItemSettingsAndAlert/>} />
                <Route path={routes.inv().itemInformation()} element={<ItemSupplierAndInformation/>} />
                <Route path={routes.inv().categories()} element={<Categories/>} />
                <Route path={routes.inv().discounts()} element={<Discounts/>} />
                <Route path={routes.inv().customers()} element={<Customers/>} />
                <Route path={routes.inv().createCategory()} element={<SetCategory/>} />
                <Route path={routes.inv().updateCategory()} element={<SetCategory/>} />
                <Route path={routes.inv().createDiscount()} element={<SetDiscount/>} />
                <Route path={routes.inv().updateDiscount()} element={<SetDiscount/>} />
                <Route path={routes.inv().createCustomer()} element={<SetCustomer/>} />
                <Route path={routes.inv().updateCustomer()} element={<SetCustomer/>} />
                <Route path={'*'} element={<Navigate to={routes.inv().items()}/>} />
            </Routes>
        </InventoryLayout>
    )
}