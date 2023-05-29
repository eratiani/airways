import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BackendUserService } from '../services/backend-user.service';
import { HeaderStateService } from '../core/services/header-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogin } from '../modals/confirm-dialog/confirm';
import { map, tap } from 'rxjs';

export const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const headState = inject(HeaderStateService);
  const router = inject(Router);
  if (inject(BackendUserService).loggedIn) {
    return true;
  } else {
    const dialogRef = inject(MatDialog).open<ConfirmLogin, string, boolean>(
      ConfirmLogin,
      { data: 'You must logged to view this page!' }
    );
    return dialogRef.afterClosed().pipe(
      tap((submit) => {
        if (submit) {
          headState.showAuth = true;
        }
      }),
      map((submit) => (submit ? router.createUrlTree(['']) : false))
    );
  }
};
