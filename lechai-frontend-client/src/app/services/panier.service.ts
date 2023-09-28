import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProduitPanier } from 'src/IProduitPanier';




@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private panier_url = "api/produitsPanier"

  constructor(private httpClient: HttpClient) { }

  getProduitsPanier(): Observable<ProduitPanier[]>{
    return this.httpClient.get<ProduitPanier[]>(this.panier_url)
  }




}
