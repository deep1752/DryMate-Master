"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const viewUser = async (userId) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/get/${userId}`);
      setSelectedUser(res.data);
      setSelectedMembership(null);
    } catch (error) {
      alert("Failed to fetch user details.");
    }
  };

  
  const closeModal = () => {
    setSelectedUser(null);
    setSelectedMembership(null);
  };

  useEffect(() => {
   
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/get_all`).then((res) => setTrainers(res.data));
 
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/get`).then((res) => setSliders(res.data));
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/`).then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      {/* <h1>GymStar Dashboard</h1> */}

      {/* Popup Modal */}
      {(selectedUser || selectedMembership) && (
        <div className="modal">
          <div className="modal-content">
            {selectedUser && (
              <>
                <h3>User Info</h3>
                <p><strong>Name:</strong> {selectedUser.first_name} {selectedUser.last_name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
              </>
            )}
            {selectedMembership && (
              <>
                <h3>Membership Plan</h3>
                <p><strong>Name:</strong> {selectedMembership.name}</p>
                <p><strong>Price:</strong> ₹{selectedMembership.price}</p>
                <p><strong>Discount:</strong> {selectedMembership.discount}%</p>
                <p><strong>Final Price:</strong> ₹{selectedMembership.final_price}</p>
                <p><strong>Duration:</strong> {selectedMembership.duration}</p>
                <p><strong>Status:</strong> {selectedMembership.status}</p>
              </>
            )}
            <button className="btn-close" onClick={closeModal}>Back</button>
          </div>
        </div>
      )}

      <section className="section">
        <h2>Membership Plans</h2>
        <div className="grid">
          {membershipPlans.map((plan) => (
            <div key={plan.id} className="card">
              <h3>{plan.name}</h3>
              <p>Price: ₹{plan.price}</p>
              <p>Discount: {plan.discount}%</p>
              <p>Final Price: ₹{plan.final_price}</p>
              <p>Duration: {plan.duration}</p>
              <p>Status: {plan.status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Subscriptions</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Membership</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <button onClick={() => viewUser(sub.user_id)} className="btn-view">
                    View
                  </button>
                </td>
                <td>
                  <button onClick={() => viewMembership(sub.membership_id)} className="btn-view">
                    View
                  </button>
                </td>
                <td>{new Date(sub.start_date).toLocaleDateString()}</td>
                <td>{new Date(sub.expiry_date).toLocaleDateString()}</td>
                <td>₹{sub.total}</td>
                <td>{sub.payment_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Trainers</h2>
        <div className="grid">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="card">
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${trainer.image || "default.jpg"}`}
                alt={trainer.name}
                className="trainer-img"
              />
              <h3>{trainer.name}</h3>
              <p>{trainer.designation}</p>
              <p>{trainer.mobile_number}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Classes</h2>
        <ul>
          {classes.map((cls) => (
            <li key={cls.id}>
              {cls.day}: {cls.class_name} ({cls.timeing})
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Sliders</h2>
        <div className="grid">
          {sliders.map((slider) => (
            <div key={slider.id} className="card">
              <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${slider.image}`} alt={slider.title} />
              <h3>{slider.title}</h3>
              <p>{slider.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Customers</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    
    </div>
  );
};

export default Dashboard;
