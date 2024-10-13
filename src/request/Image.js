export class Image{
    constructor(API){
        this.api = API;
    }

    async upload(file, itemId){
        return await this.api.post('/upload/image', {file, itemId});
    }
    
    async delete(id){
        return await this.api.post('/delete/image', {id});
    }
}
