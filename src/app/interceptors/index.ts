import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Auth } from './auth-interceptor';

export const interceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true },
];
