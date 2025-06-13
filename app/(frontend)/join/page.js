// 'use client';

// import React, { useState ,useEffect} from 'react';
// import { useUser } from '@/context/UserContext';
// import { useRouter } from 'next/navigation';

// export default function JoinUsPage() {
//   const { register, loading , user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       router.push('/profile');
//     }
//   }, [user, router]);

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//     mobile: '',
//     age: '',
//     gender: '',
//   });

//   const [error, setError] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');

//     if (formData.password !== formData.confirm_password) {
//       setError('Password mismatch. Please re-enter.');
//       return;
//     }

//     const userData = { ...formData };
//     delete userData.confirm_password;
//     userData.age = parseInt(userData.age, 10);

//     const res = await register(userData);
//     if (res.success) {
//       setSuccessMsg('Registration successful! Redirecting to login...');
//       setFormData({
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         confirm_password: '',
//         mobile: '',
//         age: '',
//         gender: '',
//       });

//       // Redirect after a short delay (e.g., 2 seconds)
//       setTimeout(() => {
//         router.push('/login');
//       }, 2000);

//     } else {
//       setError(res.message);
//     }
//   };


//   return (
//     <div className="container py-5">
      
//       <div className="row">
//         {/* Left Section: Facilities */}
//         <div className="col-md-6 mb-4">
//           <h2 className="mb-4">CLUB FACILITIES</h2>
//           <ul className="list-group mb-4">
//             {[
//               'Group Exercise', 'Gym Floor', 'Cardio Area', 'Cycle Studio',
//               'Free Weights', 'freestyle', 'Internet Station', 'Shower Area',
//               'Steam Room', 'Strength Area', 'Personal Training', 'Towel Service',
//               'F&B', 'Members Lounge', 'Yoga',
//             ].map((item) => (
//               <li key={item} className="list-group-item">✔️ {item}</li>
//             ))}
//           </ul>


//           <h5 className="fw-bold">TRY FREESTYLE™</h5>
//           <p>
//             Our dedicated Freestyle™ areas and fitness experts can help you discover new training techniques and exercises that offer a dynamic and efficient full-body workout.
//           </p>

//           <h5 className="fw-bold">TRY A CLASS</h5>
//           <p>
//             Come into any of your club and see how our range of group exercise classes can take your fitness further. Why not sample yoga, spinning or circuit training.
//           </p>

//           <div className="mt-3">
//             <a href="https://facebook.com/yourusername" className="btn btn-outline-primary me-2">
//               Share on Facebook
//             </a>
//             <a href="https://twitter.com/yourusername" className="btn btn-outline-info">
//               Share on Twitter
//             </a>
//           </div>
//         </div>

//         {/* Right Section: Signup Form */}
//         <div className="col-md-6">
//           <h2 className="mb-4">Join Us</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           {successMsg && <div className="alert alert-success">{successMsg}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <input
//                   type="text"
//                   name="first_name"
//                   placeholder="First Name"
//                   className="form-control"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <input
//                   type="text"
//                   name="last_name"
//                   placeholder="Last Name"
//                   className="form-control"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <input
//                   type="password"
//                   name="confirm_password"
//                   placeholder="Confirm Password"
//                   className="form-control"
//                   value={formData.confirm_password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 name="mobile"
//                 placeholder="Mobile"
//                 className="form-control"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <input
//                   type="number"
//                   name="age"
//                   placeholder="Age"
//                   className="form-control"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <select
//                   name="gender"
//                   className="form-select"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </button>

//             <div className="text-center mt-3">
//               Already have an account?{' '}
//               <button
//                 type="button"
//                 className="btn btn-link p-0"
//                 onClick={() => router.push('/login')}
//               >
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
