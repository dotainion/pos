export class Permission{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/permission', data);
    }
    
    async list(data){
        return await this.api.post('/list/permission', data);
    }
}
