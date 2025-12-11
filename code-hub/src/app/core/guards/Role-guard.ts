import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';


export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('accessToken');
  const roleId = localStorage.getItem('roleId');

  if (!token || !roleId) {
    router.navigate(['']);
    return false;
  }

  const allowedRoles = route.data['roles'] as number[];
  if (allowedRoles && allowedRoles.includes(Number(roleId))) {
    return true;
  }

  router.navigate(['']);
  return false;
};
