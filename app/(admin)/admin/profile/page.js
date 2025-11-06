'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { handleApiError } from '@/lib/api';

export default function AdminProfile() {
  const router = useRouter();
  const { admin, login } = useAdmin();

  const [adminProfile, setAdminProfile] = useState(null);
  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    const localToken = localStorage.getItem('admin_token');
    const localAdmin = localStorage.getItem('admin_user');
    
    if (!localToken || !localAdmin) {
      router.push('/admin');
      return;
    }

    try {
      const adminData = JSON.parse(localAdmin);
      if (adminData.role !== 'admin') {
        toast.error('Access denied. Admins only.');
        localStorage.clear();
        router.push('/admin');
        return;
      }
      
      // Use the stored admin data which already includes company info
      setAdminProfile(adminData);
    } catch (err) {
      console.error('Error parsing admin data:', err);
      toast.error('Invalid session data. Please login again.');
      localStorage.clear();
      router.push('/admin');
    }
  }, [hasHydrated, router]);

  const handleEdit = (field, currentValue) => {
    setEditField(field);
    setFieldValue(currentValue || ''); // Ensure it's never undefined
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

      // Determine which API to use based on field type
      let response;
      if (['twitterLink', 'linkedinLink', 'fbLink', 'instaLink', 'youtubeLink', 'experienceInYear', 'completeProjectNumbers', 'happyClientNumbers', 'companyName', 'companyEmail', 'companyMobile', 'companyAddress'].includes(editField)) {
        // Update company data
        const updatePayload = {};
        if (editField === 'companyName') updatePayload.brand_name = fieldValue;
        else if (editField === 'companyEmail') updatePayload.email = fieldValue;
        else if (editField === 'companyMobile') updatePayload.mobile_number = fieldValue;
        else if (editField === 'companyAddress') updatePayload.address = fieldValue;
        else if (editField === 'twitterLink') updatePayload.twitter_link = fieldValue;
        else if (editField === 'linkedinLink') updatePayload.linkedin_link = fieldValue;
        else if (editField === 'fbLink') updatePayload.fb_link = fieldValue;
        else if (editField === 'instaLink') updatePayload.insta_link = fieldValue;
        else if (editField === 'youtubeLink') updatePayload.youtube_link = fieldValue;
        else if (editField === 'experienceInYear') updatePayload.experience_in_year = parseInt(fieldValue) || 0;
        else if (editField === 'completeProjectNumbers') updatePayload.complete_project_numbers = parseInt(fieldValue) || 0;
        else if (editField === 'happyClientNumbers') updatePayload.happy_client_numbers = parseInt(fieldValue) || 0;

        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/update`,
          updatePayload,
          { headers: { Authorization: `Bearer ${localToken}` } }
        );
      } else {
        // Update user profile data
        const updatePayload = { [editField]: fieldValue };
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
          updatePayload,
          { headers: { Authorization: `Bearer ${localToken}` } }
        );
      }

      // Update local state
      const updatedAdmin = { ...adminProfile, [editField]: fieldValue };
      setAdminProfile(updatedAdmin);
      
      // Update localStorage with new data
      login(updatedAdmin, localToken);
      
      toast.success('Profile updated successfully');
      setEditField(null);
    } catch (err) {
      console.error('Save failed:', err);
      const { message } = handleApiError(err);
      toast.error(`Update failed: ${message}`);
    }
  };

  const handleCancel = () => {
    setEditField(null);
    setFieldValue('');
  };

  if (!adminProfile) {
    return <div className="admin-profile-loading">Loading...</div>;
  }

  const renderRow = (label, key, value, isReadOnly = false) => (
    <div className="admin-profile-row" key={key}>
      <strong>{label}:</strong>
      {editField === key && !isReadOnly ? (
        <>
          {key === 'experienceInYear' || key === 'completeProjectNumbers' || key === 'happyClientNumbers' ? (
            <input
              type="number"
              className="admin-profile-input"
              value={fieldValue || ''}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          ) : key === 'companyAddress' ? (
            <textarea
              className="admin-profile-input"
              value={fieldValue || ''}
              onChange={(e) => setFieldValue(e.target.value)}
              rows={3}
            />
          ) : (
            <input
              type="text"
              className="admin-profile-input"
              value={fieldValue || ''}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          )}
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{value || 'Not specified'}</span>
          {!isReadOnly && (
            <button onClick={() => handleEdit(key, value)} className="edit-btn">
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="admin-profile-container">
      <h2>Admin Profile</h2>
      {renderRow('Name', 'name', adminProfile.name)}
      {renderRow('Email', 'email', adminProfile.email, true)}
      {renderRow('Role', 'role', adminProfile.role, true)}

      <h2 className="mt-6">Company Information</h2>
      {renderRow('Company Name', 'companyName', adminProfile.companyName)}
      {renderRow('Company Email', 'companyEmail', adminProfile.companyEmail)}
      {renderRow('Company Mobile', 'companyMobile', adminProfile.companyMobile)}
      {renderRow('Company Address', 'companyAddress', adminProfile.companyAddress)}

      <h2 className="mt-6">Social Media & Links</h2>
      {renderRow('Twitter Link', 'twitterLink', adminProfile.twitterLink)}
      {renderRow('LinkedIn Link', 'linkedinLink', adminProfile.linkedinLink)}
      {renderRow('Facebook Link', 'fbLink', adminProfile.fbLink)}
      {renderRow('Instagram Link', 'instaLink', adminProfile.instaLink)}
      {renderRow('YouTube Link', 'youtubeLink', adminProfile.youtubeLink)}

      <h2 className="mt-6">Business Statistics</h2>
      {renderRow('Experience (Years)', 'experienceInYear', adminProfile.experienceInYear)}
      {renderRow('Completed Projects', 'completeProjectNumbers', adminProfile.completeProjectNumbers)}
      {renderRow('Happy Clients', 'happyClientNumbers', adminProfile.happyClientNumbers)}

      <h2 className="mt-6">Account Information</h2>
      {renderRow('Created At', 'createdAt', adminProfile.createdAt ? new Date(adminProfile.createdAt).toLocaleDateString() : 'N/A', true)}
      {renderRow('Updated At', 'updatedAt', adminProfile.updatedAt ? new Date(adminProfile.updatedAt).toLocaleDateString() : 'N/A', true)}

      <div className="admin-profile-actions">
        <button
          className="admin-profile-update-password-btn"
          onClick={() => router.push('/admin/update-password')}
        >
          Update Password
        </button>
        
        <button
          className="admin-profile-logout-btn"
          onClick={() => {
            localStorage.clear();
            toast.success('Logged out successfully');
            router.push('/admin');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
