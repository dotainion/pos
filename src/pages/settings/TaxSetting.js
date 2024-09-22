import { Group } from "../../widgets/Group"
import { Input } from "../../widgets/Input"
import { Select } from "../../widgets/Select"

export const TaxSetting = () =>{
    return(
        <div className="tax-settings">
            <div className="fw-bold mt-3">Tax Settings</div>
            <form>
                <Input title="Tax Rate (%)" type="number" placeholder="Enter tax rate" />
                <Select title="Tax Type">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                </Select>
                <Select title="Tax Application">
                    <option value="inclusive">Inclusive</option>
                    <option value="exclusive">Exclusive</option>
                </Select>
                <Input title="Item Assignment" placeholder="Enter item" />
                <Group title="Effective Dates">
                    <Input type="date" placeholder="From date" />
                    <span className="px-2">to</span>
                    <Input type="date" placeholder="To date" />
                </Group>
                <Input title="Exemptions" placeholder="Enter exempt items/questionable might need to change this" />
                <Select title="Rounding Rules">
                    <option value="nearestPenny">Nearest Penny</option>
                    <option value="nearestDollar">Nearest Dollar</option>
                </Select>
                <Select title="Discount Treatment">
                    <option value="beforeTax">Before Tax</option>
                    <option value="afterTax">After Tax</option>
                </Select>

                <button type="submit">Save Tax Settings</button>
            </form>
        </div>
    )
}