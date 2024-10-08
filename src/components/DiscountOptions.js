import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import $ from "jquery";

export const DiscountOptions = forwardRef(({}, ref) =>{
    const [type, setType] = useState(null);
    const [value, setValue] = useState(null);

    const optionRef = useRef();

    useImperativeHandle(ref, () => ({
        type, value,
        update: ({type, value})=>{
            $(optionRef.current).find('select').val(type).trigger('change');
            $(optionRef.current).find('input').val(value).trigger('change');
        }
    }), [type, value]);
    
    const PERCENTAGE = {title: 'Percentage(%)', value: 1};
    const DOLLAR_AMOUNT = {title: 'Dollar Amount($)', value: 0};
    const DEFAULT_DISPLAY = 'Select a discount type';

    const change = (e) =>{
        if(e.target.value === DEFAULT_DISPLAY) return setType(null);
        setType(e.target.value);
    }

    /**
     *  1. Percentage Discounts
        Flat Percentage: A discount is applied as a percentage off the total amount or specific items. For example, a 10% discount on the total purchase.
        Tiered Percentage: Different discount percentages based on the purchase amount or quantity. For example, 5% off for purchases over $50, and 10% off for purchases over $100.
        
        2. Fixed Amount Discounts
        Flat Amount Off: A specific amount is deducted from the total bill or specific items. For example, $10 off the total purchase.
        Buy One Get One (BOGO): Get a free item or discount on a second item when purchasing the first item. For example, buy one get one 50% off.
        
        3. Coupon Discounts
        Coupon Codes: Discounts applied by entering a coupon code at checkout. Codes can offer a percentage off, a fixed amount off, or special promotions.
        Digital Coupons: Coupons sent via email, SMS, or app notifications that can be redeemed at checkout.
        
        4. Discounts by Item or Category
        Item-Specific Discounts: Discounts applied only to selected items. For example, 20% off a particular product.
        Category Discounts: Discounts applied to all items within a specific category. For example, 15% off all electronics.
        
        5. Time-Based Discounts
        Flash Sales: Discounts available only for a limited time, such as a 24-hour sale.
        Seasonal or Holiday Discounts: Special discounts available during specific times of the year, like Black Friday or Christmas.
        
        6. Customer-Based Discounts
        Loyalty Discounts: Discounts for returning customers or members of a loyalty program.
        VIP or Membership Discounts: Special discounts for VIP customers or members of a subscription or membership program.
        
        7. Quantity Discounts
        Bulk Discounts: Discounts given for purchasing large quantities of an item. For example, buy 10, get 20% off.
        Volume Pricing: Discount structures that offer lower prices for higher volumes.
        
        8. Promotional Discounts
        Bundle Discounts: Discounts applied when purchasing a bundle of products together. For example, buy a laptop and get a discount on a laptop bag.
        Referral Discounts: Discounts given when a customer refers a new customer.
        
        9. Payment Method Discounts
        Cash Discounts: Discounts offered for paying with cash instead of credit/debit cards.
        Financing Discounts: Discounts applied when purchasing with specific financing options or credit.
        
        10. Employee Discounts
        Staff Discounts: Special discounts for employees of the store or company.
     */

    return(
        <div ref={optionRef} className="form-control my-3 p-0">
            <select onChange={change} className="form-control form-select border-0 position-relative z-index-1" defaultValue={DEFAULT_DISPLAY}>
                <option value={PERCENTAGE.value}>{PERCENTAGE.title}</option>
                <option value={DOLLAR_AMOUNT.value}>{DOLLAR_AMOUNT.title}</option>
                <option hidden>{DEFAULT_DISPLAY}</option>
            </select>
            <div className="px-2"><div className="border-top"/></div>
            <div className="input-group">
                {type === DOLLAR_AMOUNT.value ? <span className="input-group-text bg-transparent border-0">$</span> : null}
                <input onChange={(e)=>setValue(e.target.value)} type="number" className={`form-control border-0 shadow-none ${type === DOLLAR_AMOUNT.value ? 'ps-0' : ''}`} placeholder={type === PERCENTAGE.value ? 'Percentage amount 0.00%' : 'Price $0.00'}/>
                {type === PERCENTAGE.value ? <span className="input-group-text bg-transparent border-0">%</span> : null}
            </div>
        </div>
    )
});