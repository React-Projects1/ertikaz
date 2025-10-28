import './globals.css';

export const metadata = {
  title: 'My International App',
  description: 'Application with Arabic and English support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" id="root-html">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}