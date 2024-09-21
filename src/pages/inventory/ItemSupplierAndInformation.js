import { FaEllipsisV, FaSitemap } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { useEffect, useRef, useState } from "react";
import { ParseError } from "../../utils/ParseError";
import { Texarea } from "../../widgets/Textarea";
import { Select } from "../../widgets/Select";
import { Input } from "../../widgets/Input";
import { Switch } from "../../widgets/Switch";
import { IoMdSettings } from "react-icons/io";
import { UnitOfMeasure } from "../../widgets/UnitOfMeasure";
import { Loader } from "../../components/Loader";

export const ItemSupplierAndInformation = () =>{
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        api.item.list({id: params.itemId}).then((response)=>{
            setItem(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading) return <Loader/>;
    
    return(
        <form>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Item Settings</div>
                <button onClick={()=>navigate(routes.inv().nested().items())} className="d-flex align-items-center btn btn-sm btn-light text-primary ms-2" type="button">Items<FaSitemap className="ms-2"/></button>
                {
                    !!params?.itemId &&
                    <div className="dropstart">
                        <button className="btn btn-sm btn-light p-0 pb-1 ms-2" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                        <ul className="dropdown-menu">
                            <li><button onClick={()=>navigate(routes.inv().nested().selectItems(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Add bundle items<FaSitemap/></button></li>
                            <li><button onClick={()=>navigate(routes.inv().nested().itemSettings(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Settings<IoMdSettings/></button></li>
                            <li><button onClick={()=>navigate(routes.inv().nested().updateItem(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Update item<IoMdSettings/></button></li>
                            <li><button onClick={()=>navigate(routes.inv().nested().items())} className="btn btn-sm btn-light w-100 rounded-0">Items<FaSitemap/></button></li>
                        </ul>
                    </div>
                }
            </div>
            <hr className="mb-0"></hr>
            <div className="small fw-bold">Supplier Information</div>
            <Input title="Organization" />
            <Input title="Contact Person" />
            <Input title="Phone" type="tel" />
            <Input title="Email" type="email" />

            <hr className="mt-5 mb-0"></hr>
            <div className="small fw-bold">Location</div>
            <Input title="Street Address"/>
            <Input title="City" />
            <Input title="State/Province" />
            <Input title="Postal/ZIP Code" />
            <Input title="Country" />
            <Select title="Location Type">
                <option title="A large storage area">Warehouse</option>
                <option title="A physical store location">Retail Store</option>
                <option title="A storage area within a store">Backroom</option>
                <option title="Specific shelving units within a warehouse or store">Shelf</option>
                <option title="Individual bins or containers within shelves">Bin</option>
            </Select>

            <div className="d-flex justify-content-end py-3">
                <button type="submit" className="btn btn-sm btn-dark px-4">Save</button>
            </div>
        </form>
    )
}