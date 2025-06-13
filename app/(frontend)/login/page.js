// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@/context/UserContext'; // adjust the path based on your file structure

// const LoginPage = () => {
//     const router = useRouter();
//     const { login, user, loading } = useUser();

//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const [error, setError] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     useEffect(() => {
//         if (user) {
//             router.push('/');
//         }
//     }, [user, router]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMsg('');

//         const res = await login(formData);
//         if (res.success) {
//             setSuccessMsg('Login successful! Redirecting...');
//             setTimeout(() => {
//                 router.push('/');
//             }, 1500);
//         } else {
//             setError(res.message);
//         }
//     };

//     return (

//         <div className="container py-5">

//             <div className="row">
//                 {/* Left Section: Facilities */}
//                 <div className="col-md-6 mb-4">
//                     <h2 className="mb-4">CLUB FACILITIES</h2>
//                     <ul className="list-group mb-4">
//                         {[
//                             'Group Exercise', 'Gym Floor', 'Cardio Area', 'Cycle Studio',
//                             'Free Weights', 'freestyle', 'Internet Station', 'Shower Area',
//                             'Steam Room', 'Strength Area', 'Personal Training', 'Towel Service',
//                             'F&B', 'Members Lounge', 'Yoga',
//                         ].map((item) => (
//                             <li key={item} className="list-group-item">✔️ {item}</li>
//                         ))}
//                     </ul>


//                     <h5 className="fw-bold">TRY FREESTYLE™</h5>
//                     <p>
//                         Our dedicated Freestyle™ areas and fitness experts can help you discover new training techniques and exercises that offer a dynamic and efficient full-body workout.
//                     </p>

//                     <h5 className="fw-bold">TRY A CLASS</h5>
//                     <p>
//                         Come into any of your club and see how our range of group exercise classes can take your fitness further. Why not sample yoga, spinning or circuit training.
//                     </p>

//                     <div className="mt-3">
//                         <a href="https://facebook.com/yourusername" className="btn btn-outline-primary me-2">
//                             Share on Facebook
//                         </a>
//                         <a href="https://twitter.com/yourusername" className="btn btn-outline-info">
//                             Share on Twitter
//                         </a>
//                     </div>
//                 </div>

//                 {/* Right Section: Login Form */}
//                 <div className="col-md-6">
//                     <h2 className="mb-4 text-center">Login</h2>

//                     {error && <div className="alert alert-danger">{error}</div>}
//                     {successMsg && <div className="alert alert-success">{successMsg}</div>}

//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 className="form-control"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 className="form-control"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//                             {loading ? 'Logging in...' : 'Login'}
//                         </button>

//                         <div className="text-center mt-3">
//                             Don’t have an account?{' '}
//                             <button
//                                 type="button"
//                                 className="btn btn-link p-0"
//                                 onClick={() => router.push('/join')}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//             </div>
//         </div>



//     );
// };

// export default LoginPage;
