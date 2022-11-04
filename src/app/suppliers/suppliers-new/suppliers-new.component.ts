import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { Supplier } from '../supplier.dt';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-new',
  templateUrl: './suppliers-new.component.html',
  styleUrls: ['./suppliers-new.component.css']
})
export class SuppliersNewComponent implements OnInit {

  supplierObservable!: Observable<Supplier>;

  supplier!: Supplier;

  constructor(
    private supplierService: SupplierService,
    private router: Router) { }

  ngOnInit(): void {

    this.supplierObservable = this.supplierService.create();
    this.supplierObservable.subscribe(response => {
      this.supplier = response;
    })
  }

  async onSave(supplier: Supplier){
    console.log("call on Save on Suppliers-new component!");

    this.supplierObservable = this.supplierService.save(supplier);

    const result = await lastValueFrom(this.supplierObservable);

    this.router.navigate(["/suppliers/show", result.id]);
  }
}
