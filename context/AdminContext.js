// context/AdminContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState('');
  const [mobileNumber, setMobileNumber] = useState(
    process.env.NEXT_PUBLIC_ADMIN_MOBILE || ''
  );

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_user');
    const storedToken = localStorage.getItem('admin_token');
    if (storedAdmin && storedToken) {
      setAdmin(JSON.parse(storedAdmin));
      setToken(storedToken);
    }

    const fetchAdminData = async () => {
      try {
        const localToken = storedToken || localStorage.getItem('admin_token');

        if (!localToken) return;

        // Fetch admin profile from users endpoint (where role is admin)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          console.error('Failed to fetch admin profile:', res.status);
          return;
        }

        const data = await res.json();
        const adminProfile = data.user || data;

        // Verify this is an admin user
        if (adminProfile.role !== 'admin') {
          console.error('User is not an admin');
          return;
        }

        // Fetch company data from company routes
        try {
          const companyRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/info`,
            {
              headers: {
                Authorization: `Bearer ${localToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (companyRes.ok) {
            const companyData = await companyRes.json();

            // Merge admin profile with company data
            const completeAdminData = {
              ...adminProfile,
              // Company info
              companyName: companyData.brand_name,
              companyEmail: companyData.email,
              companyMobile: companyData.mobile_number,
              companyAddress: companyData.address,
              // Social links from company
              twitterLink: companyData.twitter_link,
              linkedinLink: companyData.linkedin_link,
              fbLink: companyData.fb_link,
              instaLink: companyData.insta_link,
              youtubeLink: companyData.youtube_link,
              // Business stats
              experienceInYear: companyData.experience_in_year,
              completeProjectNumbers: companyData.complete_project_numbers,
              happyClientNumbers: companyData.happy_client_numbers,
            };

            setAdmin(completeAdminData);
            localStorage.setItem('admin_user', JSON.stringify(completeAdminData));

            if (companyData.mobile_number) {
              setMobileNumber(companyData.mobile_number);
            }
          } else {
            // If company data fetch fails, use admin profile only
            setAdmin(adminProfile);
            localStorage.setItem('admin_user', JSON.stringify(adminProfile));
          }
        } catch (companyError) {
          console.warn('Failed to fetch company data:', companyError);
          setAdmin(adminProfile);
          localStorage.setItem('admin_user', JSON.stringify(adminProfile));
        }
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      }
    };

    fetchAdminData();
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

  const isAdminAuthenticated = !!admin && !!token;

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isAdminAuthenticated,
        mobileNumber,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
