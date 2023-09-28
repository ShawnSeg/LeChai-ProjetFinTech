//src/app/data.services.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    const produitsPanier = [
      { id: 12, nom: 'Dr. Nice' },
      { id: 13, nom: 'Bombasto' },
      { id: 14, nom: 'Celeritas' },
      { id: 15, nom: 'Magneta' },
      { id: 16, nom: 'RubberMan' },
      { id: 17, nom: 'Dynama' },
      { id: 18, nom: 'Dr. IQ' },
      { id: 19, nom: 'Magma' },
      { id: 20, nom: 'Tornado' }
    ];
    return {produitsPanier};
  }
}
