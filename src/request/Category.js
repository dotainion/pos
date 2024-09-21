import { token } from "../utils/Token";

export class Category{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/category', data);
    }
    async list(data){
        return await this.api.post('/list/categories', data);
    }
}
