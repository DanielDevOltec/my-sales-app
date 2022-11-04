import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from './supplier.dt';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Supplier[]>{
    return this.http.get<Supplier[]> (`${environment.api}/suppliers`);
  }

  public getById(id: number) : Observable<Supplier>{
    return this.http.get<Supplier>(`${environment.api}/suppliers/${id}`);
  }

  public save(supplier: Supplier): Observable<Supplier>{

    if(supplier.id >0){

      return this.http.put<Supplier>(`${environment.api}/suppliers/${supplier.id}`, supplier);

    }
    console.log("send post request");

    return this.http.post<Supplier>(`${environment.api}/suppliers`, supplier);

  }

  public delete(id : number): Observable<Supplier>{

    return this.http.delete<Supplier>(`${environment.api}/suppliers/${id}`)

  }

  public create(): Observable<Supplier>{
    return of<Supplier>({
      id: 0,
      companyName: "",
      contactName: "",
      contactTitle: "",
      address: {
        street: "",
        city: "",
        region: "",
        postalCode: 0,
        country: "",
        phone: "",
      }
    });

  }
}

