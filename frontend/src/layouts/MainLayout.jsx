// MainLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="p-6 overflow-auto bg-white rounded-tl-2xl shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
