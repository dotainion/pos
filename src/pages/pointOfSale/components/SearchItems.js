import { Fragment, useEffect, useRef, useState } from "react";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { usePos } from "../../../providers/PosProvider";
import { Search } from "../../../widgets/Search";
import itemImg from "../../../images/item.jpg";
import { api } from "../../../request/Api";
import { MdFavorite } from "react-icons/md";
import { ParseError } from "../../../utils/ParseError";
import { Loader } from "../../../components/Loader";
import { v4 as uuidv4 } from 'uuid';
import { OrderLineChangeOverlay } from "../../../components/OrderLineChangeOverlay";
import { AddonPicker } from "../../../components/AddonPicker";

export const SearchItems = () =>{
    const { addToCart, cartOrderLines } = usePos();

    const [items, setItems] = useState([]);
    const [limit, setLimit] = useState(100);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);
    const [addonPicker, setAddonPicker] = useState(null);
    const [selectorOverlay, setSelectorOverlay] = useState(false);

    const onSearch = (e) =>{
        setLoading(true);
        api.item.list({name: e.target.value}).then((response)=>{
            setItems(response.data.data);
        }).catch((error)=>{
            setItems([]);
            setErrors(new ParseError(error).message());
        }).finally(()=>{
            setLoading(false);
        });
    }

    const addItem = (item) =>{
        const itemFound = cartOrderLines.find((orderLine)=>orderLine.attributes.item.id === item.id);
        if(itemFound && item.attributes.bundleItems.length){
            return setSelectorOverlay(item);
        }
        addToCart(item);
        if(item.attributes.bundleItems.length){
            setAddonPicker(item);
        }
    }

    const createItem = () =>{
        const item = {
            addons: [],
            attributes: {...selectorOverlay.attributes},
            type:  selectorOverlay.type,
            id:  selectorOverlay.id,
        }
        addToCart(item, 'NEW');
        setAddonPicker(item);
    }

    const setFavorite = (e, item) =>{
        e.stopPropagation();
        
        if(item.attributes.favorite) item.attributes.favorite = false;
        else item.attributes.favorite = true;

        const data = {
            id: item?.id || null,
            ...item.attributes
        }
        api.item.set(data).then((response)=>{
            setItems((list)=>[...list.map((t)=>t.id !== item.id ? t : item)]);
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    useEffect(()=>{
        api.item.list({limit: limit}).then((response)=>{
            setItems(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <>
            <div className="mt-4">
                <Search onChange={onSearch}/>
                <PosCategoryBar/>
            </div>
            {
                loading
                ? <div className="my-5 py-4"><Loader/></div>
                : <div className="d-flex overflow-y-auto overflow-x-hidden">
                    {
                        addonPicker !== null
                        ? <AddonPicker show={true} onClose={()=>setAddonPicker(null)} item={addonPicker}/>
                        : <div className="row px-2">
                            {
                                items.length?
                                items.map((item)=>(                                
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 p-1" key={item.id}>
                                        <div onClick={()=>addItem(item)} className="card small position-relative pointer" style={{height: '150px'}}>
                                            <img className="img-fluid darken-image rounded-1 w-100 h-100" src={itemImg} alt=""/>
                                            <div className="position-absolute top-0 end-0">
                                                <button onClick={(e)=>setFavorite(e, item)} className="btn btn-sm m-2 fav-btn">
                                                    <MdFavorite className={`fs-4 ${item.attributes.favorite ? 'text-warning' : 'text-light'}`}/>
                                                </button>
                                            </div>
                                            {
                                                !!item.attributes.bundleItems.length &&
                                                <div className="position-absolute top-0 start-0 m-2">
                                                    <span className="badge bg-primary">Bundle</span>
                                                </div>
                                            }
                                            <div className="position-absolute bottom-0 px-2 mb-1 text-white text-break">
                                                <div>{item.attributes.name}</div>
                                                <div>${item.attributes.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                )):
                                <div className="p-3">
                                    <div className="h4">No Items Available</div>
                                    <div>There are currently no items to display.</div>
                                    <div>If you need items added, please contact your administrator for assistance. They’ll be able to help you get started!</div>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
            <OrderLineChangeOverlay
                item={selectorOverlay}
                show={selectorOverlay}
                onClose={()=>setSelectorOverlay(false)}
                onCreate={()=>createItem()}
                onUpdate={()=>null}
            />
        </>
    )
}
