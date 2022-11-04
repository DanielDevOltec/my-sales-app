import { Injectable } from '@angular/core';
import { CartItem } from './cart.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly Cart : string = "cart";
  readonly CartQuantity: string = "cart_quantity";

  constructor() { }

  public getItems() : Array<CartItem>{

    const cartItems:string = localStorage.getItem(this.Cart) || "";

    if(cartItems){
      return JSON.parse(cartItems);
    }

    return [];

  }

  public addItem(item: CartItem): void {
    let found = false;

    const items = this.getItems();

    items.forEach(element => {
      if(element.idProduct === item.idProduct){
        element.quantity++;
        found = true;
      }
    });

    if(!found){
      items.push(item);
    }

    localStorage.setItem(this.Cart, JSON.stringify(items));

    localStorage.setItem(this.CartQuantity, items.length.toString());

  }

  public removeItem(item: CartItem): void {
    let found = false;

    const items = this.getItems();

    items.forEach(element => {
      if(element.idProduct === item.idProduct){
        element.quantity--;
        found = true;
      }

    });

    const newItems = items.filter(element => element.quantity>0);
    localStorage.setItem(this.Cart, JSON.stringify(newItems));
    localStorage.setItem(this.CartQuantity, newItems.length.toString());

  }

  get itemsInCart(){
    return this.getItems().length;
  }

  get total(){
    let total = 0;

    const items = this.getItems();

    items.forEach(element => {
      total += (element.unitPrice * element.quantity);
    });

    return total;

  }
}
