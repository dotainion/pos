import { useEffect, useRef, useState } from "react";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { usePos } from "../../../providers/PosProvider";
import { Search } from "../../../widgets/Search";
import itemImg from "../../../images/item.jpg";
import { api } from "../../../request/Api";
import { MdFavorite } from "react-icons/md";
import { ParseError } from "../../../utils/ParseError";
import { Loader } from "../../../components/Loader";

export const SearchItems = () =>{
    const { addToCart } = usePos();

    const [items, setItems] = useState([]);
    const [limit, setLimit] = useState(100);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);

    const timeoutRef = useRef();

    const addItem = (item) =>{
        addToCart(item);
    }

    const onSearch = (e) =>{
        setLoading(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.item.list({name: e.target.value}).then((response)=>{
                setItems(response.data.data);
            }).catch((error)=>{
                setItems([]);
                setErrors(new ParseError(error).message());
            }).finally(()=>{
                setLoading(false);
            });
        }, 500);
    }

    const setdFavorite = (e, item) =>{
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
                : <div className="flex-column overflow-y-auto overflow-x-hidden">
                    <div className="row px-2">
                        {
                            items.length?
                            items.map((item)=>(
                                <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 p-1" key={item.id}>
                                    <div onClick={()=>addItem(item)} className="card small position-relative pointer" style={{height: '150px'}}>
                                        <img className="img-fluid darken-image rounded-1 w-100 h-100" src={itemImg} alt=""/>
                                        <div className="position-absolute top-0 end-0">
                                            <button onClick={(e)=>setdFavorite(e, item)} className="btn btn-sm m-2 fav-btn">
                                                <MdFavorite className={`fs-4 ${item.attributes.favorite ? 'text-warning' : 'text-light'}`}/>
                                            </button>
                                        </div>
                                        <div className="position-absolute bottom-0 px-2 mb-1 text-white">
                                            <div>{item.attributes.name}</div>
                                            <div>$254.25</div>
                                        </div>
                                    </div>
                                </div>
                            )):
                            <div>No items</div>
                        }
                    </div>
                </div>
            }
        </>
    )
}