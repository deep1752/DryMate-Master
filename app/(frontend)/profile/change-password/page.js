// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@/context/UserContext';
// import axios from 'axios';

// const ChangePasswordPage = () => {
//   const router = useRouter();
//   const { user, token } = useUser();

//   const [formData, setFormData] = useState({
//     new_password: '',
//     confirm_password: '',
//   });

//   const [error, setError] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       router.push('/join');
//     }
//   }, [user, router]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');

//     if (formData.new_password !== formData.confirm_password) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.put(
//         `http://127.0.0.1:8000/users/update-password/${user?.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSuccessMsg('Password updated successfully!');
//       setFormData({ new_password: '', confirm_password: '' });
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to update password.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
 

//       <div className="row">
//         {/* Left Section: Info */}
//         <div className="col-md-6 mb-4">
//           <h2 className="mb-4">ACCOUNT SECURITY</h2>
//           <p>
//             Keep your account secure by updating your password regularly.
//           </p>

//           <h5 className="fw-bold">Tips:</h5>
//           <ul className="list-group mb-4">
//             <li className="list-group-item">✔️ Use a strong and unique password</li>
//             <li className="list-group-item">✔️ Avoid using common passwords</li>
//             <li className="list-group-item">✔️ Change your password every few months</li>
//           </ul>
//         </div>

//         {/* Right Section: Change Password Form */}
//         <div className="col-md-6">
//           <h2 className="mb-4 text-center">Change Password</h2>

//           {error && <div className="alert alert-danger">{error}</div>}
//           {successMsg && <div className="alert alert-success">{successMsg}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 name="new_password"
//                 placeholder="New Password"
//                 className="form-control"
//                 value={formData.new_password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <input
//                 type="password"
//                 name="confirm_password"
//                 placeholder="Confirm Password"
//                 className="form-control"
//                 value={formData.confirm_password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? 'Updating...' : 'Update Password'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePasswordPage;
