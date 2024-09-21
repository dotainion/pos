import { token } from "../utils/Token";

export class Item{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/item', data);
    }
    async list(data){
        return await this.api.post('/list/items', data);
    }
}
