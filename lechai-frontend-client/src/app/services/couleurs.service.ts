import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';
import { Couleur } from 'src/shawnInterface';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouleursService {

  private CouleursSites: Couleur[] = [];
  private couleursSubject = new Subject<void>();

  constructor(private routingService: RoutingService) { }

  getCouleursBD() {
    this.routingService.getCouleur().subscribe({
      next: (data: Couleur[]) => {
        this.CouleursSites = data;


        // Emit a signal to indicate that data is ready
        this.couleursSubject.next();
      }
    });
  }

  getCouleurByName(nom: string) {
    for (let i = 0; i < this.CouleursSites.length; i++) {
      if (this.CouleursSites[i].NomVariable === nom) {
        return this.CouleursSites[i].Value;
      }
    }

    return "000000";
  }

  getAllCouleurs(): Couleur[] {
    return this.CouleursSites;
  }

  // Observable to notify when data is ready
  onDataReady(): Observable<void> {
    return this.couleursSubject.asObservable();
  }
}
