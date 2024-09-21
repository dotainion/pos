import { useState } from "react"
import { Select } from "./Select"
import { Input } from "./Input";

export const UnitOfMeasure = () =>{
    const [unit, setUnit] = useState();

    const WEIGHT = 'Weight';
    const DIMENSION = 'Dimensions';
    const DEFAULT_OPION = 'Select a unit';

    const onChangeUnit = (e) =>{
        setUnit(e.target.value);
    }

    return(
        <div className="d-block d-sm-flex w-100">
            <div className="w-100">
                <Select onChange={onChangeUnit} title="Weight & Dimensions" defaultValue={DEFAULT_OPION}>
                    <option>{WEIGHT}</option>
                    <option>{DIMENSION}</option>
                    <option hidden>{DEFAULT_OPION}</option>
                </Select>
            </div>
            <div className="d-none d-sm-block px-2"></div>
            <div className="w-100">
                {
                    unit === WEIGHT &&
                    <Select title="Weights">
                        <option>grams (g)</option>
                        <option>kilograms (kg)</option>
                        <option>milligrams (mg)</option>
                        <option>pounds (lbs)</option>
                        <option>ounces (oz)</option>
                    </Select>
                }
                {
                    unit === DIMENSION &&
                    <Select title="Dimensions">
                        <option>Length</option>
                        <option>Width</option>
                        <option>Height</option>
                        <option>Volume</option>
                        <option>centimeters (cm)</option>
                        <option>meters (m)</option>
                        <option>inches (in)</option>
                        <option>feet (ft)</option>
                        <option>centimeters (cm³)</option>
                        <option>meters (m³)</option>
                        <option>inches (in³)</option>
                        <option>feet (ft³)</option>
                    </Select>
                }
            </div>
            <div className="d-none d-sm-block px-2"></div>
            <div className="w-50">
                {
                    [WEIGHT, DIMENSION].includes(unit) &&
                    <Input title="Value" type="number"/>
                }
            </div>
        </div>
    )
}