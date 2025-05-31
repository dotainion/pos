import { FaEllipsis } from "react-icons/fa6"
import { IoMdAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Loader } from "../../components/Loader";

export const Categories = () =>{
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        api.category.list({limit: limit}).then((response)=>{
            setCategories(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading) return <Loader center/>;

    return(
        <>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Categories</div>
                <button onClick={()=>navigate(routes.inv().nested().createCategory())} className="d-flex align-items-center btn btn-sm btn-light text-primary">Create Category<IoMdAdd className="ms-2"/></button>
            </div>
            <hr></hr>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table">
                    <tbody>
                        {categories.map((category)=>(
                            <tr className="align-items-center" key={category.id}>
                                <td className="w-100">{category.attributes.name}</td>
                                <td className="text-nowrap">Assign Items</td>
                                <td>
                                    <div className="dropstart">
                                        <button className="d-flex align-items-center btn" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsis/></button>
                                        <ul className="dropdown-menu">
                                            <li><button onClick={()=>navigate(routes.inv().nested().updateCategory(category.id))} className="btn btn-sm btn-light w-100 rounded-0">Edit</button></li>
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