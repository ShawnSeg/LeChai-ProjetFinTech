import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { IProduitPanier } from 'src/IProduitPanier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsServiceService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<IProduitPanier[]>{
    return this.http.get<IProduitPanier[]>("https://localhost:7247/testProduit");
  }
}
