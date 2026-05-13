import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/guest'];

const ROLE_BASED_PATHS: Record<string, string[]> = {
  '/super-admin': ['super-admin', 'superadmin'],
  '/payment-ledger': ['academy', 'accountant', 'director', 'super-admin', 'superadmin'],
  '/bank-brief': ['academy', 'accountant', 'director', 'super-admin', 'superadmin'],
  '/reports': ['academy', 'accountant', 'director', 'super-admin', 'superadmin'],
  '/workers': ['agency', 'worker', 'director', 'super-admin', 'superadmin', 'office-team'],
  '/tasks': ['agency', 'worker', 'director', 'super-admin', 'superadmin', 'office-team'],
  '/clients': ['office-team', 'director', 'super-admin', 'superadmin', 'academy'],
  '/projects': ['director', 'super-admin', 'superadmin', 'office-team', 'academy', 'agency', 'clients'],
  '/settings': ['director', 'super-admin', 'superadmin'],
  '/system-users': ['director', 'super-admin', 'superadmin'],
  '/permissions': ['director', 'super-admin', 'superadmin'],
  '/tenants': ['director', 'super-admin', 'superadmin'],
  '/plans': ['director', 'super-admin', 'superadmin'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }
  
  const authUser = request.cookies.get('auth_user');
  const authToken = request.cookies.get('auth_token');
  
  if (!authToken?.value && !authUser?.value) {
    if (pathname === '/') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  if (authUser?.value) {
    try {
      const user = JSON.parse(authUser.value);
      const role = typeof user.role === 'string' ? user.role.toLowerCase() : user.role?.roleName?.toLowerCase() || '';
      
      if (user.isGuest && !pathname.startsWith('/guest')) {
        const guestUrl = new URL('/guest', request.url);
        return NextResponse.redirect(guestUrl);
      }
      
      for (const [path, allowedRoles] of Object.entries(ROLE_BASED_PATHS)) {
        if (pathname.startsWith(path)) {
          const hasAccess = allowedRoles.some(allowedRole => 
            role === allowedRole || 
            role.includes(allowedRole) || 
            allowedRole.includes(role)
          );
          
          if (!hasAccess) {
            const dashboardUrl = new URL('/', request.url);
            return NextResponse.redirect(dashboardUrl);
          }
          break;
        }
      }
    } catch (e) {
      // If parsing fails, let the request through and let client-side auth handle it
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
