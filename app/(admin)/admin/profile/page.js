'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function AdminProfile() {
  const router = useRouter();
  const { token, login } = useAdmin();

  const [adminProfile, setAdminProfile] = useState(null);
  const [adminDetails, setAdminDetails] = useState(null);
  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    const localToken = localStorage.getItem('admin_token');
    if (!localToken) {
      return;
    }

    const fetchAllData = async () => {
      // same logic as above
    };

    fetchAllData();
  }, [hasHydrated, router]);


  useEffect(() => {
    const fetchAllData = async () => {
      const localToken = localStorage.getItem('admin_token');

      if (!localToken) {
        return; // Exit early and wait for a re-render or login
      }

      try {
        const profileRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${localToken}` },
        });

        const profile = profileRes.data;
        if (profile.role !== 'admin') {
          toast.error('Access denied. Admins only.');
          localStorage.clear();
          router.push('/admin');
          return;
        }

        const adminRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/1`);

        setAdminProfile(profile);
        setAdminDetails(adminRes.data);
      } catch (err) {
        console.error('Error fetching profile or admin details:', err);
        toast.error('Session expired or fetch failed.');
        localStorage.clear();
        router.push('/admin');
      }
    };

    // Delay until client-side hydration
    if (typeof window !== 'undefined') {
      fetchAllData();
    }
  }, [router]);



  const handleEdit = (field, currentValue) => {
    setEditField(field);
    setFieldValue(currentValue);
  };

  const handleSave = async () => {
    try {
      if (!editField) return;

      const localToken = localStorage.getItem('admin_token');
      if (!localToken) {
        toast.error('Unauthorized. Please login again.');
        router.push('/admin');
        return;
      }

      if (adminProfile && Object.keys(adminProfile).includes(editField)) {
        // Update user profile
        const updated = { ...adminProfile, [editField]: fieldValue };
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update/${adminProfile.id}`, updated, {
          headers: { Authorization: `Bearer ${localToken}` },
        });
        setAdminProfile(updated);
        login(updated, localToken); // Update context
        toast.success('Profile updated');
      } else if (adminDetails && Object.keys(adminDetails).includes(editField)) {
        // Update brand/admin details
        const updated = { ...adminDetails, [editField]: fieldValue };
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/update/${adminDetails.id}`, updated);
        setAdminDetails(updated);
        toast.success('Admin details updated');
      }

      setEditField(null);
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Update failed');
    }
  };


  const handleCancel = () => {
    setEditField(null);
    setFieldValue('');
  };

  if (!adminProfile || !adminDetails) {
    return <div className="admin-profile-loading">Loading...</div>;
  }

  const renderRow = (label, key, value, source = 'profile') => (
    <div className="admin-profile-row" key={key}>
      <strong>{label}:</strong>
      {editField === key ? (
        <>
          <input
            className="admin-profile-input"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </>
      ) : (
        <>
          <span>{value || 'Not specified'}</span>
          <button onClick={() => handleEdit(key, value)} className="edit-btn">Edit</button>
        </>
      )}
    </div>
  );

  return (
    <div className="admin-profile-container">
      <h2>Admin Login Profile</h2>
      {renderRow('First Name', 'first_name', adminProfile.first_name)}
      {renderRow('Last Name', 'last_name', adminProfile.last_name)}
      {renderRow('Email', 'email-admin', adminProfile.email)}
      {renderRow('Mobile', 'mobile', adminProfile.mobile)}
      {renderRow('Age', 'age', adminProfile.age)}
      {renderRow('Gender', 'gender', adminProfile.gender)}

      <h2 className="mt-6">Admin Brand Details</h2>
      {renderRow('Brand Name', 'brand_name', adminDetails.brand_name)}
      {renderRow('Email', 'email-brand', adminDetails.email)}
      {renderRow('Mobile Number', 'mobile_number', adminDetails.mobile_number)}
      {renderRow('Address', 'address', adminDetails.address)}
      {renderRow('Twitter', 'twiter_link', adminDetails.twiter_link)}
      {renderRow('LinkedIn', 'linkedin_link', adminDetails.linkedin_link)}
      {renderRow('Facebook', 'fb_link', adminDetails.fb_link)}
      {renderRow('Instagram', 'insta_link', adminDetails.insta_link)}
      {renderRow('YouTube', 'youtube_link', adminDetails.youtube_link)}
      {renderRow('Experience (Years)', 'expirence_in_year', adminDetails.expirence_in_year)}
      {renderRow('Completed Projects', 'complet_project_numbers', adminDetails.complet_project_numbers)}
      {renderRow('Happy Clients', 'happy_clint_numbers', adminDetails.happy_clint_numbers)}

      <button
        className="admin-profile-logout-btn mt-4"
        onClick={() => {
          localStorage.clear();
          toast.success('Logged out successfully');
          router.push('/admin');
        }}
      >
        Logout
      </button>
    </div>
  );
}
