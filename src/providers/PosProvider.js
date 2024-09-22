import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../request/Api";
import { v4 as uuidv4 } from 'uuid';

const Context = createContext();
export const usePos = () => useContext(Context);

export const PosProvider = ({children}) =>{
    const [order, setOrder] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [customer, setCustomer] = useState();
    const [lastDraftOrder, setLastDraftOrder] = useState();

    const addCustomer = (cus) =>{
        setCustomer(cus);
    }

    const addToCart = (item) =>{
        let itemFound = cartItems.find((ite)=>ite.id === item.id);
        if(itemFound){
            itemFound.quantity = itemFound.quantity + 1;
            return setCartItems((items)=>[...items.map((cItem)=>cItem.id === item.id ? itemFound : cItem)]);
        }
        item.quantity = 1;
        setCartItems((items)=>[item, ...items]);
    }

    const minusQtyCartItem = (item) =>{
        let itemFound = cartItems.find((ite)=>ite.id === item.id);
        if(itemFound){
            if(item.quantity === 0) return;
            item.quantity = item.quantity - 1;
            return setCartItems((items)=>[...items.map((cItem)=>cItem.id === item.id ? itemFound : cItem)]);
        }
        console.error('Cart item not found: unable to subtract quantity.');
    }

    const setQtyCartItem = (item, quantity) =>{
        let itemFound = cartItems.find((ite)=>ite.id === item.id);
        if(itemFound){
            if(parseInt(quantity) === 0) quantity = 1;
            item.quantity = parseInt(quantity);
            return setCartItems((items)=>[...items.map((cItem)=>cItem.id === item.id ? itemFound : cItem)]);
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
            id: uuidv4(),
            attributes: {
                customerId: null,
                canceled: false,
                completed: false,
                items: [],
                referenceIdArray: []
            }
        });
    }

    const saveOrder = async(option={}) =>{
        const data = {id: order.id, ...order.attributes, customerId: customer?.id || null, ...option};
        data.referenceIdArray = cartItems.map((item)=>({referenceId: item.id, quantity: item.quantity}));
        return await api.order.set(data);
    }

    const saveDraft = () =>{
        saveOrder({draft: true}).then((response)=>{
            setOrder(null);
            setCartItems([]);
            setCustomer(null);
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        api.order.list({limit: 1, desc: true}).then((response)=>{
            setLastDraftOrder(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    useEffect(()=>{
        if(!order) return;
        setCartItems(order.attributes.items.map((item)=>({...item, quantity: item.attributes.cartQuantity})));

        if(!order.attributes.customerId) return;
        api.customer.list({id: order.attributes.customerId}).then((response)=>{
            setCustomer(response.data.data[0]);
        }).catch((error)=>{

        });
    }, [order]);

    useEffect(()=>{
        if(!order) return;
        saveOrder().then((response)=>{
            
        }).catch((error)=>{

        });
    }, [cartItems, customer]);

    const value = {
        order,
        addOrder,
        customer,
        lastDraftOrder,
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