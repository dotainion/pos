export class Calculation {
    taxes = [];

    setTaxRequirements(taxes) {
        this.taxes = taxes;
    }

    tax(products, callback) {
        let totalAmount = 0;
        let totalDiscount = 0;
        let nonTaxableTotalAmount = 0;
        let nonTaxableTotalDiscount = 0;

        products.forEach((orderLine) => {
            if(orderLine.attributes.item?.type !== 'item') return;
            const total = orderLine.attributes.item.attributes.amount * orderLine.attributes.quantity;
            if(orderLine.attributes.item.attributes.isTaxable){
                totalAmount += total;
            }else{
                nonTaxableTotalAmount += total;
            }
            orderLine?.addons?.forEach?.((addon)=>{
                if(addon.attributes.item.attributes.itemLink.attributes.priceIncluded) return;
                const total = orderLine.attributes.item.attributes.amount * addon.attributes.quantity;
                if(addon.attributes.item.attributes.isTaxable){
                    totalAmount += total;
                }else{
                    nonTaxableTotalAmount += total;
                }
            });
        });

        products.forEach((orderLine) => {
            if (orderLine.attributes.discount?.type !== 'discount') return;
            const amount = this.calculateDiscountAmount(orderLine.attributes.discount, totalAmount);
            if (orderLine.attributes.discount.attributes.isTaxable) {
                totalDiscount += amount;
            } else {
                nonTaxableTotalDiscount += amount;
            }
        });

        const taxableAmount = Math.max(totalAmount - totalDiscount, 0);
        totalAmount += nonTaxableTotalAmount;
        totalDiscount += nonTaxableTotalDiscount;

        const totalTax = this.calculateTax(taxableAmount, products);

        callback({
            totalTax: parseFloat(totalTax.toFixed(2)),
            subTotal: parseFloat(totalAmount.toFixed(2)),
            totalDiscount: parseFloat(totalDiscount.toFixed(2)),
            net: parseFloat((totalAmount + totalTax).toFixed(2)),
        });
    }

    calculateDiscountAmount(discount, totalAmount) {
        if (discount.attributes.type === 0) {
            return discount.attributes.value;
        } else if (discount.attributes.type === 1) {
            return totalAmount * (discount.attributes.value / 100);
        }
        return 0;
    }

    calculateTax(taxableAmount, products) {
        let totalTax = 0;

        products.forEach((orderLine) => {
            if(orderLine.attributes.item.type !== 'item' || !orderLine.attributes.item.attributes.isTaxable) return;
            const taxRate = this.findTaxRate(orderLine);
            if(orderLine.attributes.item.attributes.isInclusive){
                totalTax += taxableAmount - (taxableAmount / (1 + taxRate / 100));
            }else{
                totalTax += taxableAmount * (taxRate / 100);
            }
            orderLine.addons.forEach((addon)=>{
                if(!addon.attributes.item.attributes.isTaxable) return;
                const taxRate = this.findTaxRate(addon);
                if(addon.attributes.item.attributes.itemLink.attributes.taxInclusive){
                    totalTax += taxableAmount - (taxableAmount / (1 + taxRate / 100));
                }else{
                    totalTax += taxableAmount * (taxRate / 100);
                }
            });
        });

        return totalTax;
    }

    findTaxRate(orderLine){
        const relatedTax = this.taxes.find((tax)=>tax.attributes.categoryId === orderLine.attributes.item.attributes.categoryId);
        if(relatedTax) return relatedTax.attributes.value;
        const mainTax = this.taxes.find((tax)=>!tax.attributes.categoryId);
        if(mainTax) return mainTax.attributes.value;
        return 0;
    }
}
