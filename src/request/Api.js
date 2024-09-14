import axios from "axios";

import $ from "jquery";
import { routes } from "../routes/routes";
import { token } from "../utils/Token";
import { Auth } from "./Auth";
import { Category } from "./Category";
import { Customer } from "./Customer";
import { Discount } from "./Discount";
import { Item } from "./Item";
import { Order } from "./Order";

export class Api{
    baseURL;

    constructor(){
        this.initialize();
        this.axios = axios.create({
            baseURL: this.baseURL,
            headers: {
                Authorization: token.get(),
                Accept: 'application/json',
                AccessPath: window.location.pathname
            }
        });
        this.auth = new Auth(this);
        this.category = new Category(this);
        this.customer = new Customer(this);
        this.discount = new Discount(this);
        this.item = new Item(this);
        this.order = new Order(this);
    }

    initialize(){
        if(process.env.NODE_ENV === 'development'){
            this.baseURL = 'https://www.caribbeancodingacademygrenada.com/susu-service'
        }else if(process.env.NODE_ENV === 'production'){
            this.baseURL = '/susu-service';
        }else{
            console.error('Environment not determined.');
        }
    }

    reInitializeAuthorizationHeader(){
        this.axios.defaults.headers.Authorization = token.get();
    }

    isAuthRoute(){
        /*if(
            window.location.href.includes(routes.signIn()) || 
            window.location.href.includes(routes.register())
        ){
            return true;
        }*/
        return false;
    }

    parseError(error){
        /*const notification = $('#login-notification');
        if(error.status === 401 && !this.isAuthRoute()){
            notification.show('fast');
        }else{
            notification.hide();
        }*/
        throw error;
    }

    async post(route, data){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }

    async get(route, data){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }
}

export const api = new Api();
