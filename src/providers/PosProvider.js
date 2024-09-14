import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
export const usePos = () => useContext(Context);

export const PosProvider = ({children}) =>{
    const [cartItems, setCartItems] = useState([]);
    const [customer, setCustomer] = useState({
        attributes: {
            firstName: 'John',
            lastName: 'Wick'
        }
    });
    const [lastCustomer, setLastCustomer] = useState({
        attributes: {
            firstName: 'John',
            lastName: 'Wick'
        }
    });

    const addCustomer = (cus) =>{
        setCustomer(cus);
    }

    const addToCart = (item) =>{
        setCartItems((items)=>[item, ...items]);
    }

    const saveDraft = () =>{

    }

    const value = {
        customer,
        lastCustomer,
        addCustomer,
        cartItems,
        addToCart,
        saveDraft
    }

    useEffect(()=>{

    }, []);

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}