export class Address{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/address', data);
    }
    
    async fetch(data){
        return await this.api.post('/fetch/address', data);
    }
}
