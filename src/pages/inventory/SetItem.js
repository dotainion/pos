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
import { Loader } from "../../components/Loader";
import { ReRenderer } from "../../components/ReRenderer";

export const SetItem = () =>{
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState();
    const [categories, setCategories] = useState([]);
    const [rerender, setRerender] = useState();
    const [limit, setLimit] = useState(100);

    const navigate = useNavigate();
    const params = useParams();

    const categoryIdRef = useRef();
    const nameRef = useRef();
    const amountRef = useRef();
    const costRef = useRef();
    const isTaxableRef = useRef();
    const quantityRef = useRef();
    const descriptionRef = useRef();
    const activeRef = useRef();
    const inclusiveRef = useRef();

    const saveItem = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setErrors(null);

        const data = {
            id: item?.id || null,
            categoryId: categoryIdRef.current.value,
            name: nameRef.current.value,
            amount: amountRef.current.value,
            cost: costRef.current.value,
            isTaxable: isTaxableRef.current.value,
            quantity: quantityRef.current.value,
            description: descriptionRef.current.value,
            active: activeRef.current.checked,
            inclusive: inclusiveRef.current.checked,
        }

        api.item.set(data).then((response)=>{
            navigate(routes.inv().nested().updateItem(response.data.data[0].id));
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    const renderer = (state) =>{
        setItem(null);
        setRerender(state);
    }

    useEffect(()=>{
        api.category.list({limit: limit}).then((response)=>{
            setCategories(response.data.data);
        }).catch((error)=>{

        });

        if(!params?.itemId){
            setLoading(false);
            return;
        }

        api.item.list({id: params.itemId}).then((response)=>{
            setItem(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [rerender]);

    useEffect(()=>{
        if(!item) return;
        categoryIdRef.current.value = item.attributes.categoryId;
        nameRef.current.value = item.attributes.name;
        amountRef.current.value = item.attributes.amount;
        costRef.current.value = item.attributes.cost;
        isTaxableRef.current.value = item.attributes.isTaxable ? 1 : '';
        quantityRef.current.value = item.attributes.quantity;
        descriptionRef.current.value = item.attributes.description;
    }, [item]);

    if(loading) return <Loader/>;

    /**
     * this an others should listen for tax and throw error if tax not yet setup
     * if tax is set up and is inclusive then calculate tax automaticaly by another input that displays it
     */

    return(
        <ReRenderer rerender={renderer}>
            <form onSubmit={saveItem}>
                <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                    <div className="fw-bold w-100">{!!params?.itemId ? 'Update Item' : 'Create Item'}</div>
                    <button onClick={()=>navigate(routes.inv().nested().items())} className="d-flex align-items-center btn btn-sm btn-light text-primary ms-2" type="button">Items<FaSitemap className="ms-2"/></button>
                    {
                        !!params?.itemId &&
                        <div className="dropstart">
                            <button className="btn btn-sm btn-light p-0 pb-1 ms-2" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                            <ul className="dropdown-menu">
                                <li><button onClick={()=>navigate(routes.inv().nested().bundleItems(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Add add-on<FaSitemap/></button></li>
                                <li><button onClick={()=>navigate(routes.inv().nested().itemSettings(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Settings<IoMdSettings/></button></li>
                                <li><button onClick={()=>navigate(routes.inv().nested().itemInformation(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Information<IoMdSettings/></button></li>
                                <li><button onClick={()=>navigate(routes.inv().nested().items())} className="btn btn-sm btn-light w-100 rounded-0">Items<FaSitemap/></button></li>
                            </ul>
                        </div>
                    }
                </div>
                <hr></hr>

                {errors ? <div className="text-danger">{errors}</div> : null}

                <Input ref={nameRef} title={<div><span className="badge bg-primary">Bundle</span> Name</div>} placeholder="Name" />
                <Select ref={categoryIdRef} title="Category" defaultValue={'Select category'}>
                    {categories.map((category)=>(
                        <option value={category.id} key={category.id}>{category.attributes.name}</option>
                    ))}
                    <option hidden>Select category</option>
                </Select>
                <Input ref={amountRef} title="Sales Price" type="number" />
                <Input ref={costRef} title="Cost Price" type="number" />
                <Input ref={quantityRef} title="Quantity" type="number" />
                <Select ref={isTaxableRef} title="Taxable">
                    <option value={1}>Set this item as taxable</option>
                    <option value={''}>Set this item as nonetaxable</option>
                </Select>
                <Texarea ref={descriptionRef} title="Item Description"/>
                <Switch ref={activeRef} onLabel="Active" offLabel="Inactive" defaultChecked={true}/>
                <Switch ref={inclusiveRef} onLabel="Exclusive tax" offLabel="Inclusive tax"/>

                <hr></hr>
                <div className="d-flex justify-content-end py-3">
                    <button type="submit" className="btn btn-sm btn-dark px-4">Save</button>
                </div>
            </form>
        </ReRenderer>
    )
}