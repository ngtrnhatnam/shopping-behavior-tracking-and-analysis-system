import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/images/Logo-no-bg.png'

function AuthLayout() {
  console.log('AuthLayout is rendering');
  return (
    <div className="bg-auth bg-cover bg-center min-h-screen bg-gray-100 flex flex-col">
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
      <div className="absolute top-16 left-16">
        <img src={logo} alt="Logo" className="h-24" />
      </div>
      <main className="flex-growrelative z-10 flex items-center justify-center min-h-screen px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;