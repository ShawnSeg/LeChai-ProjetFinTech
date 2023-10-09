import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private isConnected = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnected.asObservable();

  constructor() { }

  getIsAbsolute() {
    return this.isConnected.value;
  }

  setIsAbsolute(value: boolean) {
    this.isConnected.next(value);
  }
}
