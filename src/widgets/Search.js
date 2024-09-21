import { IoSearchOutline } from "react-icons/io5";

export const Search = ({onChange}) =>{
    return(
        <div className="row border rounded-3 py-1 mx-1">
            <div className="d-flex align-items-center">
                <IoSearchOutline className="fs-3"/>
                <input onChange={onChange} className="form-control w-100 border-0 shadow-none ps-1 pe-0" placeholder="Search" />
            </div>
        </div>
    )
}