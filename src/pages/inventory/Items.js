import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { ParseError } from "../../utils/ParseError";
import { Loader } from "../../components/Loader";

export const Items = () =>{
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState();
    const [limit, setLimit] = useState(100);

    const navigate = useNavigate();

    const searchItems = (e) =>{
        setItems([]);
        api.item.list({name: e.target.value}).then((response)=>{
            setItems(response.data.data);
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

    if(loading) return <Loader/>;

    return(
        <>
            <div className="my-3">
                <Search onChange={searchItems}/>
            </div>

            {errors ? <div className="text-danger">{errors}</div> : null}
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock on hand</th>
                            <th scope="col">Price</th>
                            <th className="td-s"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item)=>(
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex">
                                        <div style={{width: '40px', height: '40px'}}>
                                            <img className="img-fluid rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                                        </div>
                                        <div className="mx-2">
                                            <div>{item.attributes.name}</div>
                                            <div className="badge bg-primary small">{item.attributes.bundleItems?.length ? 'Bundle' : ''}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><strong>Category:</strong>{item.attributes.category?.attributes?.name}</td>
                                <td><strong>Stock on hand:</strong>{item.attributes.quantity}</td>
                                <td><strong>Price:</strong>${item.attributes.amount.toFixed(2)}</td>
                                <td className="menu top-0 end-0 td-s px-0">
                                    <div className="dropstart">
                                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsis/></button>
                                        <ul className="dropdown-menu">
                                            <li><button onClick={()=>navigate(routes.inv().nested().updateItem(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Edit</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

