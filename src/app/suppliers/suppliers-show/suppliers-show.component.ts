import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { Supplier } from '../supplier.dt';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-show',
  templateUrl: './suppliers-show.component.html',
  styleUrls: ['./suppliers-show.component.css']
})
export class SuppliersShowComponent implements OnInit {

  id!: number;
  supplier!: Supplier;

  supplierObservable!: Observable<Supplier>;

  constructor(private route: ActivatedRoute,
    private supplierService: SupplierService) {


    }


    async ngOnInit() {

      this.id = +(this.route.snapshot.paramMap.get('id') || 0);

      this.supplierObservable = this.supplierService.getById(this.id);

      this.supplier = await lastValueFrom(this.supplierObservable);

    }

}
