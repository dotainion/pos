import { forwardRef, useEffect, useRef, useState } from "react";
import $ from "jquery";

export const Switch = forwardRef(({label, onLabel, name, offLabel, onChange, defaultChecked}, ref)=>{
    const [title, setTitle] = useState(null);

    const identifier = new Date().getTime();

    const checkboxRef = useRef();

    useEffect(()=>{
        $(ref?.current || checkboxRef.current).off('change').on('change', (e)=>{
            onChange?.(e);
            if(!onLabel || !offLabel) return;
            setTitle(e.target.checked ? onLabel : offLabel);
        });
    }, []);

    return(
        <div className="form-check form-switch my-4">
            <input ref={ref || checkboxRef} className="form-check-input pointer" name={name} type="checkbox" id={identifier} defaultChecked={defaultChecked}/>
            <label className="form-check-label pointer" htmlFor={identifier}>{title !== null ? title : (defaultChecked ? onLabel : offLabel)}{label}</label>
        </div>
    )
});