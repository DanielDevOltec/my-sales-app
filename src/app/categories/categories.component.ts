import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { Category } from './category.dto';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }

  `]
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource!: MatTableDataSource<Category>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description','actions'];

  showForm:boolean = false;

  category!: Category;

  showLoading : boolean = false;

  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.refreshData();
  }

  ngAfterViewInit(): void {
  }

  onNewCategoryClick(){
    this.showForm = true;
    this.category = {id:0,description:'',name:''};
  }
  onBack(){
    this.showForm = false;
    this.refreshData();
  }

  refreshData() : void{

    this.showLoading = true;

    this.categoryService.getAll().subscribe(categories => {
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.showLoading = false;

    });
  }

  onSave(event : Category){
  
    this.showLoading = true;

    this.categoryService.save(event).subscribe(response => {
      console.log("category was saved");
      this.showForm = false;
      this.refreshData();
      
      this.showLoading = false;

    });
  }

  onEditCategoryClick(category: Category){
    this.category = category;
    this.showForm = true;
  }
  onDeleteCategory(category : Category){

    if( confirm(`Delete category ${category.name} with id ${category.id}?`)){

      this.categoryService.delete(category).subscribe(() => this.refreshData());

    }
  }
}
