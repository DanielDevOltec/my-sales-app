import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category.dto';

@Component({
  selector: 'category-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public categoryForm! : FormGroup;

  @Output() back = new EventEmitter();

  @Output() save = new EventEmitter<Category>();

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.save.emit(this.categoryForm.value  as Category);
  }

  onBack(){
    this.back.emit();
  }

  @Input()
  set category(category: Category){
    this.initForm();
    this.categoryForm.patchValue(category);
  }

  private initForm(){
    this.categoryForm = new FormGroup({
      id : new FormControl(""),
      name : new FormControl("", [Validators.required, Validators.minLength(3)]),
      description : new FormControl("")
    });
  }

}
