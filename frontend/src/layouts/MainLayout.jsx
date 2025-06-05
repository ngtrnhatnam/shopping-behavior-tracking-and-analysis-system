// layouts/MainLayout.jsx
import { useState, useEffect } from "react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-tr from-pink-100 via-white to-blue-100">
      {sidebarVisible && <Sidebar onHide={() => setSidebarVisible(false)} />}
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="absolute top-16 left-4 z-50 px-3 py-1 bg-blue-600 text-white rounded shadow"
          >
            Menu
          </button>
        )}
        <main className="p-6 overflow-auto bg-white rounded-tl-2xl shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
}