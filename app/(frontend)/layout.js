// app/layout.js or app/(frontend)/layout.js (wherever your layout is)

// ❌ DO NOT make this a client component
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';
import { AdminProvider } from '@/context/AdminContext';
import { Toaster } from 'sonner';
import ScriptLoader from '@/components/ScriptLoader';
import FloatingIcons from '@/components/FloatingIcons'; // ✅ New import

import '../../public/css/style.css';
import '../../public/css/newStyle.css';

export const metadata = {
  title: 'DryMate Organic Mushroom Farming',
  description: 'A modern Mushroom Farming website built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Free HTML Templates" />
        <meta name="description" content="Free HTML Templates" />
        <link rel="icon" href="/img/final-logo.png" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rubik&display=swap"
          rel="stylesheet"
        />

        {/* Icon Fonts */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/lib/flaticon/font/flaticon.css" rel="stylesheet" />

        {/* Libraries Stylesheets */}
        <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />

        {/* Bootstrap + Template Styles */}
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
      </head>
      <body>
        <UserProvider>
          <AdminProvider>
            <Toaster position="top-center" richColors />
            <Header />
            {children}
            <Footer />
            <FloatingIcons /> {/* ✅ Safe client-side context access */}
            <ScriptLoader />
          </AdminProvider>
        </UserProvider>
      </body>
    </html>
  );
}
