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
import { openAuthNotification, closeAuthNotification } from "../information/AuthNotification";
import { Tax } from "./Tax";
import { Image } from "./Image";

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
        this.tax = new Tax(this);
        this.image = new Image(this);
    }

    initialize(){
        if(process.env.NODE_ENV === 'development'){
            this.baseURL = 'https://www.caribbeancodingacademygrenada.com/pos-service'
        }else if(process.env.NODE_ENV === 'production'){
            this.baseURL = '/pos-service';
        }else{
            console.error('Environment not determined.');
        }
    }

    reInitializeAuthorizationHeader(){
        this.axios.defaults.headers.Authorization = token.get();
    }

    isAuthRoute(){
        const href = window.location.href;
        return href.includes(routes.signin()) || href.includes(routes.signup());
    }

    parseError(error){
        if(error.status === 401 && !this.isAuthRoute()) openAuthNotification();
        else closeAuthNotification();
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
