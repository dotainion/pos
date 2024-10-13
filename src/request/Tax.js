export class Tax{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/tax', data);
    }

    async list(data){
        return await this.api.post('/list/taxes', data);
    }
}
