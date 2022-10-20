import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Category } from './category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  public getAll(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(`${environment.api}/categories`);
  }

  public save(category: Category) : Observable<Category>{

    if(category.id){
      return this.http.put<Category>(`${environment.api}/categories/${category.id}`,category);
    }

    return this.http.post<Category>(`${environment.api}/categories/`,category);

  }

  public delete(category : Category){
    return this.http.delete(`${environment.api}/categories/${category.id}`);
  }
}
