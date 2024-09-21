export class ParseError{
    error;

    constructor(error){
        this.error = error;
    }

    message(){
        try{
            if(this.error?.response?.data?.error){
                return this.error.response.data.error.message;
            }
            if(typeof this.error === 'string' || this.error instanceof String){
                return this.error;
            }
            if(this.error instanceof Error){
                return this.error.message;
            }
            if(this.error?.response?.data){
                throw new Error('Response receive with incorrect error format.');
            }
            throw new Error('ErrorResponseHandler receive data and dont know what to do with it.');
        }catch(err){
            return err.message;
        }
    }

    meta(){
        if(this.error?.response?.data?.error?.meta){
            return this.error.response.data.error.meta;
        }
        return null;
    }

    assertResponseHasNoError(response){
        if(response.data?.error){
            throw new Error(response.data.error.message);
        }
        return true;
    }
}