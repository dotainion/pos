class PointOfSale{
    _nested = '';
    default = () => '/pos/*';
    customers = () => this._nested + 'search/customers';
    discounts = () => this._nested + 'search/discounts';
    products = () => this._nested + 'search/products';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Inventory{
    _nested = '';
    default = () => '/inventory/*';
    products = () => this._nested + 'products';
    createItem = () => this._nested + 'create/item';
    createCategory = () => this._nested + 'create/category';
    createDiscount = () => this._nested + 'create/discount';
    categories = () => this._nested + 'item/category';
    discounts = () => this._nested + 'item/discount';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Grid{
    _nested = '';
    default = () => '';
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
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

export const routes = new Routes();