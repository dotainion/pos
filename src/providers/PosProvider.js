import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../request/Api";

const Context = createContext();
export const usePos = () => useContext(Context);

export const PosProvider = ({children}) =>{
    const [order, setOrder] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [customer, setCustomer] = useState();
    const [lastCustomer, setLastCustomer] = useState();

    const addCustomer = (cus) =>{
        setCustomer(cus);
    }

    const addToCart = (item) =>{
        if(cartItems.find((ite)=>ite.id === item.id)){
            item.quantity = item.quantity + 1;
            return setCartItems((items)=>[...items.map((cItem)=>cItem.id === item.id ? item : cItem)]);
        }
        item.quantity = 1;
        setCartItems((items)=>[item, ...items]);
    }

    const minusQtyCartItem = (item) =>{
        if(cartItems.find((ite)=>ite.id === item.id)){
            if(item.quantity === 0) return;
            item.quantity = item.quantity - 1;
            return setCartItems((items)=>[...items.map((cItem)=>cItem.id === item.id ? item : cItem)]);
        }
        console.error('Cart item not found: unable to subtract quantity.');
    }

    const setQtyCartItem = (item, quantity) =>{
        if(cartItems.find((ite)=>ite.id === item.id)){
            if(parseInt(quantity) === 0) quantity = 1;
            item.quantity = parseInt(quantity);
            return setCartItems((items)=>[...items.map((cItem)=>cItem.id === item.id ? item : cItem)]);
        }
        console.error('Cart item not found: unable to subtract quantity.');
    }

    const removeFromCart = (item) =>{
        if(!cartItems.find((ite)=>ite.id === item.id)){
            return console.error('Cart item not found: unable to remove item.');
        }
        setCartItems((items)=>[...items.filter((p)=>p.id !== item.id)]);
    }

    const addOrder = (ord=null) =>{
        if(ord) return setOrder(ord);
        setOrder({
            id: null,
            attributes: {
                customerId: null, 
                canceled: false,
                completed: false,
                referenceIdArray: []
            }
        });
    }

    const saveDraft = () =>{

    }

    useEffect(()=>{
        if(!order || !order.attributes.customerId) return;
        api.customer.list({id: order.attributes.customerId}).then((response)=>{
            setCustomer(response.data.data[0]);
        }).catch((error)=>{

        });
    }, [order]);

    useEffect(()=>{
        if(!cartItems.length) return;

        let data;
        if(order) data = {id: order.id, ...order.attributes};
        else data = {id: null, customerId: null, canceled: false, completed: false};

        data.referenceIdArray = cartItems.map((item)=>item.id);

        api.order.set(data).then((response)=>{
            setOrder(response.data.data[0]);
        }).catch((error)=>{

        });
    }, [cartItems]);

    const value = {
        order,
        addOrder,
        customer,
        lastCustomer,
        addCustomer,
        cartItems,
        addToCart,
        saveDraft,
        removeFromCart,
        minusQtyCartItem,
        setQtyCartItem
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}