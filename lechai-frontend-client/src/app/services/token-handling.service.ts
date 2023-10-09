import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenHandlingService {

  constructor() { }

  expirationToken(){
    const eightHoursInMilliseconds = 5*1000;

    setTimeout(() => {
      // This code will run after 8 hours
      alert('8 hours have passed!');
    }, eightHoursInMilliseconds);
  }

}
