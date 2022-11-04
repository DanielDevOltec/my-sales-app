import { Component, OnInit } from '@angular/core';
import { CartItem } from '../cart.dto';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items: CartItem[] = [];

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  onRemoveItem(cartItem: CartItem){

    this.cartService.removeItem(cartItem);

    this.items = this.cartService.getItems();

  }

}
