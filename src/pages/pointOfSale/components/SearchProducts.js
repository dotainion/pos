import { PosCategoryBar } from "../../../layout/PosCategoryBar"
import { Search } from "../../../widgets/Search"

export const SearchProducts = () =>{
    return(
        <>
            <div className="mt-4">
                <Search/>
                <PosCategoryBar/>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <div className="row px-2">
                    {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item, key)=>(
                        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 p-1" key={key}>
                            <div className="card small position-relative" style={{height: '150px'}}>
                                <img className="img-fluid darken-image rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                                <div className="position-absolute bottom-0 px-2 mb-1 text-white">
                                    <div>Some item</div>
                                    <div>$254.25</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}