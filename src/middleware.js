// middleware.js
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // القائمة باللغات المدعومة
  locales: ['en', 'ar'],
  
  // اللغة الافتراضية
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};