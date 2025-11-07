// 'use client';

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { useAdmin } from '@/context/AdminContext';

// // Validation schema
// const passwordSchema = z.object({
//   currentPassword: z.string().min(1, 'Current password is required'),
//   newPassword: z.string().min(6, 'New password must be at least 6 characters'),
//   confirmPassword: z.string().min(1, 'Please confirm your new password'),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords don&apos;t match",
//   path: ["confirmPassword"],
// });


// export default function UpdatePassword() {
//   const router = useRouter();
//   const { admin } = useAdmin();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(passwordSchema),
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);

//     try {
//       const localToken = localStorage.getItem('admin_token');

//       if (!localToken) {
//         toast.error('Please login again.');
//         router.push('/admin');
//         return;
//       }

//       const updatePayload = {
//         current_password: data.currentPassword,
//         new_password: data.newPassword,
//       };

//       await axios.put(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-password/${admin.id}`,
//         updatePayload,
//         {
//           headers: {
//             Authorization: `Bearer ${localToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       toast.success('Password updated successfully!');
//       reset();
//       router.push('/admin/profile');
//     } catch (error) {
//       console.error('Password update error:', error);
//       const errorMessage =
//         error?.response?.data?.detail ||
//         error?.response?.data?.message ||
//         'Failed to update password. Please try again.';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!admin) {
//     return <div className="admin-profile-loading">Loading...</div>;
//   }

//   return (
//     <div className="update-password-container">
//       <div className="update-password-form">
//         <button
//           type="button"
//           onClick={() => router.push('/admin/profile')}
//           className="back-btn"
//         >
//           ◀ Back to Profile
//         </button>

//         <h2 className="update-password-title">Update Password</h2>
//         <p className="update-password-subtitle">
//           Change your password for account: <strong>{admin.email}</strong>
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="password-form">
//           <div className="form-group">
//             <label className="form-label">Current Password</label>
//             <input
//               {...register('currentPassword')}
//               type="password"
//               className={`form-input ${errors.currentPassword ? 'input-error' : ''}`}
//               placeholder="Enter your current password"
//             />
//             {errors.currentPassword && (
//               <p className="error-message">{errors.currentPassword.message}</p>
//             )}
//           </div>

//           <div className="form-group">
//             <label className="form-label">New Password</label>
//             <input
//               {...register('newPassword')}
//               type="password"
//               className={`form-input ${errors.newPassword ? 'input-error' : ''}`}
//               placeholder="Enter your new password"
//             />
//             {errors.newPassword && (
//               <p className="error-message">{errors.newPassword.message}</p>
//             )}
//           </div>

//           <div className="form-group">
//             <label className="form-label">Confirm New Password</label>
//             <input
//               {...register('confirmPassword')}
//               type="password"
//               className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
//               placeholder="Confirm your new password"
//             />
//             {errors.confirmPassword && (
//               <p className="error-message">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           <div className="form-actions">
//             <button
//               type="submit"
//               className="submit-button"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="button-loading">
//                   <span className="loading-spinner"></span>
//                   Updating...
//                 </span>
//               ) : (
//                 'Update Password'
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={() => router.push('/admin/profile')}
//               className="cancel-button"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>

//         <div className="password-tips">
//           <h4>Password Requirements:</h4>
//           <ul>
//             <li>At least 6 characters long</li>
//             <li>Use a combination of letters, numbers, and symbols</li>
//             <li>Avoid using personal information</li>
//             <li>Don't reuse old passwords</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }