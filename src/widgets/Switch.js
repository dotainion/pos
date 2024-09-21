import { forwardRef, useEffect, useRef, useState } from "react";
import $ from "jquery";

export const Switch = forwardRef(({label, onLabel, offLabel, defaultChecked}, ref) =>{
    const [title, setTitle] = useState();

    const identifier = new Date().getTime();

    const checkboxRef = useRef();

    useEffect(()=>{
        if(!onLabel || !offLabel) return;
        $(ref?.current || checkboxRef.current).on('change', (e)=>{
            setTitle(e.target.checked ? onLabel : offLabel);
        }).trigger('change');
    }, []);

    return(
        <div className="form-check form-switch">
            <input ref={ref || checkboxRef} className="form-check-input pointer" type="checkbox" id={identifier} defaultChecked={defaultChecked}/>
            <label className="form-check-label pointer" htmlFor={identifier}>{title}{label}</label>
        </div>
    )
});