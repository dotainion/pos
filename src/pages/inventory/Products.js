import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Products = () =>{
    return(
        <>
            <div className="my-3">
                <Search/>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="td-m"></th>
                            <th scope="col">Item</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock on hand</th>
                            <th scope="col">Available to sell</th>
                            <th scope="col">Price</th>
                            <th className="td-s"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1].map((product, key)=>(
                            <tr className="align-items-center" key={key}>
                                <td className="menu bottom-0 end-0 td-m px-0">
                                    <div className="d-flex align-items-center">
                                        <button className="d-flex align-items-center btn btn-sm"><MdKeyboardArrowRight/></button>
                                        <input className="ms-2" type="checkbox"/>
                                    </div>
                                </td>
                                <td scope="row">
                                    <div className="d-flex">
                                        <div style={{width: '40px', height: '40px'}}>
                                            <img className="img-fluid rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                                        </div>
                                        <div className="mx-2">
                                            <div>Shart Ceramic Mug</div>
                                            <div className="small">Bundle</div>
                                        </div>
                                    </div>
                                </td>
                                <td><strong>Category:</strong>Book</td>
                                <td><strong>Stock on hand:</strong>15</td>
                                <td><strong>Available to sell:</strong>15</td>
                                <td><strong>Price:</strong>$36.21</td>
                                <td className="menu top-0 end-0 td-s px-0">
                                    <button className="btn btn-sm"><FaEllipsis/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}