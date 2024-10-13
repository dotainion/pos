export class Customer{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/customer', data);
    }
    
    async list(data){
        return await this.api.post('/list/customers', data);
    }
}
