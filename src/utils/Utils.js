import { Calculation } from "./Calculation";

class DateTime{
    dbFormat(dateInstance){
        if(!dateInstance) return '';
        dateInstance = new Date(dateInstance);
        
        const year = dateInstance.getFullYear();
        const month = String(dateInstance.getMonth() + 1).padStart(2, '0');
        const day = String(dateInstance.getDate()).padStart(2, '0');
        const hours = String(dateInstance.getHours()).padStart(2, '0');
        const minutes = String(dateInstance.getMinutes()).padStart(2, '0');
        const seconds = String(dateInstance.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    toLocalTime(dateInstance){
        if(!dateInstance) return '';
        return new Date(dateInstance).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    toLocalDate(dateInstance){
        if(!dateInstance) return '';
        return new Date(dateInstance).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    }

    toLocalDateTime(dateInstance){
        if(!dateInstance) return '';
        return `${this.toLocalDate(dateInstance)} ${this.toLocalTime(dateInstance)}`;
    }
}

class Utils{
    constructor(){
        this.date = new DateTime();
        this.calculate = new Calculation();
    }
}

export const utils = new Utils();