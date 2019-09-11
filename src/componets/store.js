import {BehaviorSubject} from "rxjs";

export const product$ = new BehaviorSubject(JSON.parse(localStorage.getItem("products")));

export function updateOrder(newOrder){
    
    if(newOrder === null){
        window.localStorage.clear("products");
        product$.next(newOrder);
        console.log("remove");
    }else{
        window.localStorage.setItem("products",JSON.stringify(newOrder));
        product$.next(newOrder);
        
    }
}