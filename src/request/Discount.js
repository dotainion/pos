import { token } from "../utils/Token";

export class Discount{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/discount', data);
    }
    async list(data){
        return await this.api.post('/list/discounts', data);
    }
}
