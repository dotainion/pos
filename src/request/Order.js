export class Order{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/order', data);
    }
    
    async list(data){
        return await this.api.get('/list/orders', data);
    }
}
