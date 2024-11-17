export class Payment{
    constructor(API){
        this.api = API;
    }

    async createIntent(data){
        return await this.api.post('/create/payment/intent', data);
    }
}
