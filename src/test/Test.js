import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";

export const Test = () =>{

    const test = () =>{
        api.item.list({limit: 100}).then((response)=>{
            console.log(response.data.data);
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        });
    }

    return(
        <div className="container">
            <h1>Playground</h1>
            <button onClick={test}>Click Me</button>
        </div>
    )
}