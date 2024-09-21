import { forwardRef, useEffect, useState } from "react";
import { ChromePicker } from 'react-color';

export const ColarPicker = forwardRef(({onChange}, ref) =>{
    const [color, setColor] = useState();
    const [display, setOpen] = useState('none');

    const DEFAULT_COLOR = '#ffffff';

    const triggerChange = (color) => {
        const hexColor = color?.hex || DEFAULT_COLOR;
        setColor(hexColor);
        onChange?.(hexColor);
        ref.current = {value: hexColor};
    };

    useEffect(()=>{
        if(!ref.current?.value){
            ref.current = {value: DEFAULT_COLOR};
            return;
        }
        setColor(ref.current?.value || DEFAULT_COLOR);
    }, [ref]);

    return (
        <div>
            <button onClick={()=>setOpen('block')} className="btn btn-sm btn-light" type="button">
                <span>Assign Color</span>
                {color ? <span className="ms-2 px-2" style={{backgroundColor: color}}></span> : null}
            </button>
            <div className="position-absolute top-0 start-0 w-100 h-100 backdrop-bg z-index-1" style={{display: display}} onClick={()=>setOpen('none')}>
                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div className="bg-light rounded-3" style={{border: `5px solid ${color}`}} onClick={(e)=>e.stopPropagation()}>
                        <ChromePicker
                            color={color}
                            onChangeComplete={triggerChange}
                        />
                        <div className="d-flex justify-content-between p-1">
                            <button onClick={()=>setOpen('none')} className="btn btn-sm btn-light py-0" type="button">Close</button>
                            <button onClick={triggerChange} className="btn btn-sm btn-light py-0" type="button">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});