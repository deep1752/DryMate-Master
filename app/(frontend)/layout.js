// ❌ Do NOT add 'use client' — this must remain a server component

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from 'sonner';
import ScriptLoader from '@/components/ScriptLoader'; // 👉 handles all external scripts client-side
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
        <link rel="icon" href="/img/new-logo-2.jpg" />

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
          <Toaster position="top-center" richColors />
          <Header />
          {children}
          <Footer />

          {/* Floating WhatsApp and Call Icons */}
          <div className="floating-contact-icons">
            <a
              href="https://wa.me/8504893778"
              className="whatsapp-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              href="tel:8504893778"
              className="call-icon"
              aria-label="Call Us"
            >
              <i className="bi bi-telephone-fill"></i>
            </a>
            <a href="#" className="custom-back-to-top">
              <i className="bi bi-arrow-up"></i>
            </a>
          </div>

          <ScriptLoader /> {/* Loads jQuery, Bootstrap, and other JS on client side */}
        </UserProvider>
      </body>
    </html>
  );
}
