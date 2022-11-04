import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { Supplier } from '../supplier.dt';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styleUrls: ['./suppliers-form.component.css']
})
export class SuppliersFormComponent implements OnInit {

  @Input() supplier!: Supplier;

  @Output() save = new EventEmitter<Supplier>();

  supplierForm!: FormGroup;

  constructor(
    private fb: FormBuilder
    ) {

    }

  ngOnInit() {

    this.supplierForm = this.fb.group({
      id: [this.supplier.id],
      companyName : [this.supplier.companyName, [Validators.required, Validators.minLength(3)]],
      contactName : [this.supplier.contactName, [Validators.required, Validators.minLength(3)]],
      contactTitle: [this.supplier.contactTitle, [Validators.required]],
      address:this.fb.group({
        street: [this.supplier.address.street],
        city: [this.supplier.address.city],
        country: [this.supplier.address.country],
        phone: [this.supplier.address.phone],
        postalCode: [this.supplier.address.postalCode],
        region: [this.supplier.address.region]
      })
    });
  }


  onSubmit(){
    this.save.emit(this.supplierForm.value);
    return false;
  }

}
