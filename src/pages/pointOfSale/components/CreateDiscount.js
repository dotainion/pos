export const CreateDiscount = () =>{
    return(
        <div>
            <input className="form-control my-2" placeholder="Discount name" type="text"/>
            <select className="form-control my-2">
                <option>Percentage(%)</option>
                <option>Dollar Amount($)</option>
            </select>
            <input className="form-control my-2" placeholder="Amount" type="number"/>
        </div>
    )
}