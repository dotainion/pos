export class Users{
    constructor(API){
        this.api = API;
    }

    async create(data){
        return await this.api.post('/create/user', data);
    }

    async update(data){
        return await this.api.post('/create/user', data);
    }
    
    async fetch(data){
        return await this.api.post('/fetch/user', data);
    }
    
    async list(data){
        return await this.api.post('/list/users', data);
    }
}
