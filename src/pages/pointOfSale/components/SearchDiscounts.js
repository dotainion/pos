import { IoMdAdd } from "react-icons/io";
import { Search } from "../../../widgets/Search";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";

export const SearchDiscounts = () =>{
    return(
        <>
            <div className="mt-4">
                <Search/>
                <PosCategoryBar/>
            </div>
            <div className="my-3">
                <button className="d-flex align-items-center btn btn-sm btn-light text-primary">Add Discount <IoMdAdd/></button>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                {[1,2,3,5,4,6,9,8,7,7,4,2,3,5,4,6,9,8,7,7,4,2,3,5,4,6,9,8,7,7,4,2,3,5,4,6,9,8,7,7,4,2,3,5,4,6,9,8,7,7,4].map((disc, key)=>(
                    <label className="d-flex align-items-center border-bottom pointer py-3" key={key}>
                        <div className="d-flex align-items-center"><input className="round" type="checkbox"/></div>
                        <div className="px-2 w-100 text-truncate">title hdf sitle sahgasdf asg</div>
                        <div>$254.25</div>
                    </label>
                ))}
            </div>
        </>
    )
}