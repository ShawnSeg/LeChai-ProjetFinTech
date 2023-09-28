import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProduitPanier } from 'src/IProduitPanier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsServiceService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<ProduitPanier[]>{
    return this.http.get<ProduitPanier[]>("https://localhost:7247/testProduit");
  }
}
