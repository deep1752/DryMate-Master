// context/AdminContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState('');
  const [mobileNumber, setMobileNumber] = useState(process.env.NEXT_PUBLIC_ADMIN_MOBILE || '8504893778');

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_user');
    const storedToken = localStorage.getItem('admin_token');
    if (storedAdmin && storedToken) {
      setAdmin(JSON.parse(storedAdmin));
      setToken(storedToken);
    }

    // Always fetch full admin data from backend
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/1`)
      .then(res => res.json())
      .then(data => {
        if (data?.mobile_number) {
          setMobileNumber(data.mobile_number);
        }
        if (data) {
          setAdmin(data);
          localStorage.setItem('admin_user', JSON.stringify(data));
        }
      })
      .catch(err => console.error('Failed to fetch admin data:', err));
  }, []);

  const login = (adminData, accessToken) => {
    setAdmin(adminData);
    setToken(accessToken);
    localStorage.setItem('admin_user', JSON.stringify(adminData));
    localStorage.setItem('admin_token', accessToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken('');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const isAdminAuthenticated = !!admin;

  return (
    <AdminContext.Provider value={{ admin, token, login, logout, isAdminAuthenticated, mobileNumber }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
