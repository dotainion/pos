export class Calculation{
    taxRate;
    isInclusive;

    setTaxRequirements(taxRate, isInclusive){
        this.taxRate = taxRate
        this.isInclusive = isInclusive
    }

    tax(products, callback) {
        let totalAmount = 0;
        let totalDiscount = 0;
    
        products.forEach((product) =>{
            if(product.type === 'item'){    
                // Calculate total for the item only if it's taxable
                if (product.attributes.isTaxable) {
                    totalAmount += (product.attributes.amount * product.quantity);
                }
            }else if(product.type === 'discount') {    
                // Apply discounts only if they are taxable
                if(product.attributes.isTaxable){
                    if(product.attributes.type === 0){ // Dollar amount discount
                        totalDiscount += product.attributes.value;
                    }else if(product.attributes.type === 1) { // Percentage discount
                        totalDiscount += (totalAmount * (product.attributes.value / 100));
                    }
                }
            }
        });
    
        // Calculate taxable amount after discounts
        const taxableAmount = Math.max(totalAmount - totalDiscount, 0);
    
        // Calculate total tax based on whether the tax is inclusive or exclusive
        let totalTax = 0;
        if (this.isInclusive) {
            totalTax = taxableAmount - (taxableAmount / (1 + this.taxRate / 100));
        } else {
            totalTax = taxableAmount * (this.taxRate / 100);
        }
    
        callback({
            totalTax: parseFloat(totalTax.toFixed(2)), // Round the total tax to 2 decimal points
            subTotal: parseFloat(totalAmount.toFixed(2)), // Round the total amount to 2 decimal points
            net: parseFloat((totalAmount + totalTax).toFixed(2)), // Round the total amount to pay to 2 decimal points
            totalDiscount: parseFloat(totalDiscount.toFixed(2)) // Round the total amount to pay to 2 decimal points
        });
    }
}