import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../request/Api";
import { v4 as uuidv4 } from 'uuid';
import { ItemQuantityOverlay } from "../components/ItemQuantityOverlay";

const Context = createContext();
export const usePos = () => useContext(Context);

export const PosProvider = ({children}) =>{
    const [order, setOrder] = useState();
    const [cartOrderLines, setCartOrderLines] = useState([]);
    const [customer, setCustomer] = useState();
    const [lastDraftOrder, setLastDraftOrder] = useState();
    const [showQtyOverlay, setShowQtyOverlay] = useState(false);
    const [qtyOverlayItem, setQtyOverlayItem] = useState();

    const addCustomer = (cus) =>{
        setCustomer(cus);
    }

    const addToCart = (item, cmd) =>{
        let orderLineFound = cartOrderLines.find((orderLine)=>orderLine.attributes.item.id === item.id);
        if(orderLineFound && cmd !== 'NEW'){
            orderLineFound.attributes.quantity = orderLineFound.attributes.quantity + 1;
            return setCartOrderLines((orderLines)=>[...orderLines.map((cLine)=>cLine.attributes.item.id === item.id ? orderLineFound : cLine)]);
        }
        let orderLine = {attributes: {item, quantity: 1, type: 'item'}, id: uuidv4(), type: 'orderline'};
        const addons = [];
        orderLine.attributes.item.attributes.bundleItems.forEach((prod)=>{
            if(!prod.attributes.itemLink.attributes.optional){
                addons.push({attributes: {item: prod, quantity: 1}, id: uuidv4()});
            }
        });
        if(addons.length) orderLine.addons = addons;
        setCartOrderLines((orderLines)=>[orderLine, ...orderLines]);
    }

    const addAddonToCart = (checked, orderLine, addon) =>{
        if(!addon.attributes.itemLink.attributes.optional) return;
        let orderLineFound = cartOrderLines.find((line)=>line.id === orderLine.id);
        if(checked){
            let addonFound = orderLineFound.addons.find((on)=>on.id === addon.id);
            if(addonFound) return;
            orderLineFound.addons.push({attributes: {item: addon, quantity: 1, type: 'item'}, id: uuidv4()});
            return setCartOrderLines((orderLines)=>[...orderLines.map((line)=>line.id === orderLine.id ? orderLineFound : line)]);
        }
        orderLineFound.addons = orderLineFound.addons.filter((on)=>on.attributes.item.id !== addon.id);
        setCartOrderLines((orderLines)=>[...orderLines.map((line)=>line.id === orderLine.id ? orderLineFound : line)]);
    }

    const minusOrderLineQty = (orderLine) =>{
        let orderLineFound = cartOrderLines.find((line)=>line.id === orderLine.id);
        if(orderLineFound){
            if(orderLine.attributes.quantity === 0) return;
            orderLine.attributes.quantity = orderLine.attributes.quantity - 1;
            return setCartOrderLines((orderLines)=>[...orderLines.map((line)=>line.id === orderLine.id ? orderLineFound : line)]);
        }
        console.error('Cart item not found: unable to subtract quantity.');
    }

    const setOrderLineQty = (orderLine, quantity) =>{
        let orderLineFound = cartOrderLines.find((line)=>line.id === orderLine.id);
        if(orderLineFound){
            if(isNaN(quantity)) quantity = 0;
            if(parseInt(quantity) === 0) quantity = 1;
            orderLine.attributes.quantity = parseInt(quantity);
            return setCartOrderLines((orderLines)=>[...orderLines.map((line)=>line.id === orderLine.id ? orderLineFound : line)]);
        }
        console.error('Cart item not found: unable to subtract quantity.');
    }

    const setOrderLineAddonQty = (orderLine, addon, quantity) =>{
        let addonFound = orderLine.addons.find((on)=>on.attributes.itemId === addon.attributes.itemLink.attributes.itemId);
        if(addonFound){
            if(isNaN(quantity)) quantity = 0;
            if(parseInt(quantity) === 0) quantity = 1;
            addonFound.attributes.quantity = parseInt(quantity);
            orderLine.addons = orderLine.addons.map((on)=>on.id === addonFound.id ? addonFound : on);
            return setCartOrderLines((orderLines)=>[...orderLines.map((line)=>line.id === orderLine.id ? orderLine : line)]);
        }
        console.error('Cart item not found: unable to subtract quantity.');
    }

    const removeFromCart = (orderLine) =>{
        if(!cartOrderLines.find((line)=>line.id === orderLine.id)){
            return console.error('Cart item not found: unable to remove item.');
        }
        setCartOrderLines((orderLines)=>[...orderLines.filter((p)=>p.id !== orderLine.id)]);
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
                orderLineArray: []
            }
        });
    }

    const saveOrder = async(option={}) =>{
        const data = {id: order.id, ...order.attributes, customerId: customer?.id || null, ...option};
        data.orderLineArray = cartOrderLines.map((orderLine)=>({
            id: orderLine.id,
            referenceId: orderLine.attributes.item.id, 
            quantity: orderLine.attributes.quantity,
            addonArray: orderLine.addons?.map?.((addon)=>({
                id: addon.id,
                orderLineId: orderLine.id,
                itemId: addon.attributes.item.id,
                quantity: addon.attributes.quantity,
            }))
        }));
        return await api.order.set(data);
    }

    const saveDraft = () =>{
        saveOrder({canceled: false, completed: false}).then((response)=>{
            setOrder(null);
            setCartOrderLines([]);
            setCustomer(null);
            setLastDraftOrder(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const openQtyOverlay = (item) =>{
        setShowQtyOverlay(true);
        setQtyOverlayItem(item);
    }

    useEffect(()=>{
        api.order.list({limit: 1, desc: true, canceled: false, completed: false}).then((response)=>{
            setLastDraftOrder(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    useEffect(()=>{
        if(!order) return;
        setCartOrderLines(order.attributes.items.map((orderLine)=>{
            orderLine.addons = orderLine.attributes.addons;
            return orderLine;
        }));

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
            console.log(error)
        });
    }, [cartOrderLines, customer]);

    const value = {
        order,
        addOrder,
        customer,
        lastDraftOrder,
        addCustomer,
        cartOrderLines,
        addToCart,
        saveDraft,
        removeFromCart,
        minusOrderLineQty,
        setOrderLineQty,
        setOrderLineAddonQty,
        addAddonToCart,
        openQtyOverlay
    }

    return(
        <Context.Provider value={value}>
            {children}
            <ItemQuantityOverlay
                item={qtyOverlayItem}
                show={showQtyOverlay}
                onClose={()=>setShowQtyOverlay(false)}
            />
        </Context.Provider>
    )
}