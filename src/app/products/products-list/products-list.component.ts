import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';
import { CartItem } from 'src/app/cart.dto';
import { CartService } from 'src/app/cart.service';
import { Product } from '../product.dto';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products! : Product[];

  productsObservable! : Promise<Product[]>;

  searchForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder) {

    console.log("constructor");

  }

  ngOnInit(): void {
    console.log("ngOnInit call");

    this.searchForm = this.fb.group({
      searchTerm: ['']
    });

    this.getAllProducts();

  }

  async getAllProducts(searchTerm: string = ""){

    console.log("http request");

    this.productsObservable = lastValueFrom(this.productService.getAll(searchTerm));

    this.products = await this.productsObservable;

  }

  onSubmit(){

    console.log("on submit event");

    this.getAllProducts(this.searchForm.value.searchTerm);
  }

  addToCart(product: Product){

    const cartItem : CartItem ={
      idProduct: product.id ||0,
      name : product.name,
      quantity : 1,
      unitPrice: product.unitPrice
    }

    this.cartService.addItem(cartItem);

  }


}
