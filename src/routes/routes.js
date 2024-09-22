import { SettingsRouter } from "./SettingsRouter";

class Settings{
    _nested = '';
    default = () => '/setting/*';
    options = () => this._nested + 'options';
    taxSetting = () => this._nested + 'tax';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class PointOfSale{
    _nested = '';
    default = () => '/pos/*';
    customers = () => this._nested + 'search/customers';
    createCustomer = () => this._nested + 'create/customer';
    discounts = () => this._nested + 'search/discounts';
    items = () => this._nested + 'search/items';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Inventory{
    _nested = '';
    default = () => '/inventory/*';
    items = () => this._nested + 'items';
    selectItems = (itemId=':itemId') => this._nested + 'items/' + itemId;
    createItem = () => this._nested + 'create/item';
    updateItem = (itemId=':itemId') => this._nested + 'update/item/' + itemId;
    itemSettings = (itemId=':itemId') => this._nested + 'item/settings/' + itemId;
    itemInformation = (itemId=':itemId') => this._nested + 'item/information/' + itemId;
    createCategory = () => this._nested + 'create/category';
    updateCategory = (categoryId=':categoryId') => this._nested + 'update/category/' + categoryId;
    categories = () => this._nested + 'item/category';
    discounts = () => this._nested + 'item/discount';
    createDiscount = () => this._nested + 'create/discount';
    updateDiscount = (discountId=':discountId') => this._nested + 'update/discount/' + discountId;
    customers = () => this._nested + 'customers';
    createCustomer = () => this._nested + 'create/customer';
    updateCustomer = (customerId=':customerId') => this._nested + 'update/customer/' + customerId;
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Grid{
    _nested = '';
    default = () => '/nav/*';
    grid = () => this._nested + 'grid';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Order{
    _nested = '';
    default = () => '/';
    orders = () => this._nested + 'orders';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Routes{
    _nested = '';
    default = () => '/';
    signin = () => this._nested + '/signin';
    signup = () => this._nested + '/signup';
    inv = () => new Inventory();
    pos = () => new PointOfSale();
    nav = () => new Grid();
    order = () => new Order();
    setting = () => new Settings();
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

export const routes = new Routes();