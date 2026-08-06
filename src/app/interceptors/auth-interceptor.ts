import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const publicUrls = [
    '/api/auth/login'
  ];

  const isPublicRoute = publicUrls.some(url => req.url.includes(url));

  if (isPublicRoute) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
