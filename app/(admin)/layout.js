'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { AdminProvider } from '@/context/AdminContext';
import './globals.css';
import AdminHeader from '@/components/AdminHeader';
import AdminFooter from '@/components/AdminFooter';
import { Toaster } from 'sonner';
import { useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={!isLoginPage ? "admin-layout" : ""}>
        <AdminProvider>
          <Toaster richColors position="top-center" />
          {isLoginPage ? (
            children
          ) : (
            <div className="admin-dashboard-container">
              <div className="sidebar">
                <div className="mobile-header">
                  <div className="logo">Admin Panel</div>
                  <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    ☰
                  </button>
                </div>

                <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                  <ul>
                    <li><Link href="/admin/dashbord" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                    <li><Link href="/admin/user" onClick={() => setMenuOpen(false)}>Customers</Link></li>
                    <li><Link href="/admin/product" onClick={() => setMenuOpen(false)}>Products</Link></li>
                    <li><Link href="/admin/trainers" onClick={() => setMenuOpen(false)}>Team</Link></li>
                    <li><Link href="/admin/sliders" onClick={() => setMenuOpen(false)}>Sliders</Link></li>
                  </ul>
                </nav>

                {/* Desktop Nav */}
                <nav className="desktop-menu">
                  <ul>
                    <li><Link href="/admin/dashbord">Dashboard</Link></li>
                    <li><Link href="/admin/user">Customers</Link></li>
                    <li><Link href="/admin/product">Products</Link></li>
                    <li><Link href="/admin/trainers">Team</Link></li>
                    <li><Link href="/admin/sliders">Sliders</Link></li>
                  </ul>
                </nav>
              </div>

              <div className="main-content-wrapper">
                <AdminHeader />
                <main className="admin-main-content">
                  {children}
                </main>
                <AdminFooter />
              </div>
            </div>
          )}
        </AdminProvider>
      </body>
    </html>
  );
}
