import { PosCategoryBar } from "../../../layout/PosCategoryBar"
import { Search } from "../../../widgets/Search"

export const CheckoutOption = () =>{
    return(
        <>
            <div className="mt-4">
                <Search/>
                <PosCategoryBar/>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                
            </div>
        </>
    )
}