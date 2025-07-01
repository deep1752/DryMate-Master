'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AdminDashboard = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [stats, setStats] = useState({
    products: { total: 0, active: 0, inactive: 0 },
    trainers: { total: 0, active: 0, inactive: 0 },
    sliders: { total: 0, active: 0, inactive: 0 },
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsRes, trainersRes, slidersRes] = await Promise.all([
          axios.get(`${baseUrl}/product/get_all`),
          axios.get(`${baseUrl}/trainer/get_all`),
          axios.get(`${baseUrl}/slider/get`),
        ]);

        const countStatus = (data) => ({
          total: data.length,
          active: data.filter((item) => item.status === 'active').length,
          inactive: data.filter((item) => item.status !== 'active').length,
        });

        setStats({
          products: countStatus(productsRes.data),
          trainers: countStatus(trainersRes.data),
          sliders: countStatus(slidersRes.data),
        });
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };

    fetchCounts();
  }, [baseUrl]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Products" data={stats.products} link="/admin/product" bgColor="#e3f2fd" />
        <DashboardCard title="Trainers" data={stats.trainers} link="/admin/trainers" bgColor="#e8f5e9" />
        <DashboardCard title="Sliders" data={stats.sliders} link="/admin/sliders" bgColor="#fff3e0" />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, data, link, bgColor }) => {
  return (
    <div className="dashboard-card" style={{ backgroundColor: bgColor }}>
      <h2>{title}</h2>
      <div className="card-stats">
        <p><strong>Total:</strong> {data.total}</p>
        <p className="active-text"><strong>Active:</strong> {data.total}</p>
        <p className="inactive-text"><strong>Inactive:</strong> {0}</p>
      </div>
      <Link href={link} className="dashboard-btn">Manage</Link>
    </div>
  );
};

export default AdminDashboard;
