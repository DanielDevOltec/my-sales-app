import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { Supplier } from '../supplier.dt';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-delete',
  templateUrl: './suppliers-delete.component.html',
  styleUrls: ['./suppliers-delete.component.css']
})
export class SuppliersDeleteComponent implements OnInit {

  supplierObservable!: Observable<Supplier>;
  supplier!: Supplier;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(){
    const id : number = +(this.route.snapshot.paramMap.get("id")|| 0);

    this.supplierObservable = this.supplierService.getById(id);

    this.supplier = await lastValueFrom(this.supplierObservable);
  }

  async confirmDelete(){

    this.supplierObservable = this.supplierService.delete(this.supplier.id);

    this.supplier = await lastValueFrom(this.supplierObservable);

    this.router.navigate(["/suppliers"]);


  }
}
