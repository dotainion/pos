import { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md"
import { api } from "../request/Api";
import $ from "jquery";
import { usePos } from "../providers/PosProvider";
import { Loader } from "./Loader";

export const Favorites = () =>{
    const { addToCart } = usePos();

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const addItem = (item) =>{
        addToCart(item);
    }

    useEffect(()=>{
        api.item.list({favorite: true}).then((response)=>{
            setOptions(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading){
        return(
            <div className="bg-light position-absolute rounded-3 shadow-sm border overflow-auto z-index-1 w-100 px-3 py-2">
                <Loader/>
            </div>
        )
    }

    return(
        <div className="bg-light position-absolute rounded-3 shadow-sm border overflow-auto z-index-1 w-100 px-3 py-2" style={{maxHeight: '75vh'}}>
            <div className="row">
                {
                    options.length?
                    options.map((item)=>(
                        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 p-1" key={item.id}>
                            <div onClick={()=>addItem(item)} className="card small position-relative pointer" style={{height: '130px'}}>
                                <img className="img-fluid rounded-1 w-100 h-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc8ZxDL8v2-qx_dw8wbLMoQaT0GNuXn-OfmA&s" alt=""/>
                                <div className="position-absolute top-0 end-0 px-2 fs-3 text-warning"><MdFavorite/></div>
                                <div className="position-absolute bottom-0 px-2 mb-1 text-dark">
                                    <div>{item.attributes.name}</div>
                                    <div>$254.25</div>
                                </div>
                            </div>
                        </div>
                    )):
                    <div className="p-3">
                        <div className="h4">No Favorites Yet!</div>
                        <div>It looks like you haven't added any favorites.</div>
                        <div>To start building your collection, simply tap the heart icon next to an item in the item search section. Your favorite items will appear here for easy access!</div>
                    </div>
                }
            </div>
        </div>
    )
}