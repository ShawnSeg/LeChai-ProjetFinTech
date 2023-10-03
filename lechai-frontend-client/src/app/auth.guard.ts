import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'src/app/services/toast.service';


export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const toast = inject(ToastService);


  console.log('token', token);

  if(token)
  {
    return true;
  }
  else
  {
    toast.showToast("error", "Vous devez vous connecter pour accéder à cette page!", "bottom-center", 4000);
    router.navigate(['connexion']);
    return false;
  }
};
