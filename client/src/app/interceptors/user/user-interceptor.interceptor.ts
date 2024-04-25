import { HttpInterceptorFn } from '@angular/common/http';

export const userInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  if (localStorage.getItem('token') !== null)
    token = localStorage.getItem('token');

  // Check if token exists and add it as an Authorization header if so
  const modifiedReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  // Log the request URL for debugging purposes
  console.log('Request intercepted:', req.url);

  // Continue with the modified request
  return next(modifiedReq);
};
