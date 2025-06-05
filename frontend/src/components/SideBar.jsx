// components/Sidebar.jsx
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Camera', path: '/camera' },
  { label: 'Beacon', path: '/beacon' },
  { label: 'Tài khoản', path: '/accounts' },
  { label: 'Toàn bộ log', path: '/action-logs' },
  { label: 'Phân tích', path: '/analysis' },
  { label: 'Cài đặt', path: '/settings' }
]

export default function Sidebar({ onHide }) {
  return (
    <aside className="w-64 bg-gradient-to-tr from-pink-100 via-white to-blue-100 shadow h-full relative">
      <div className="p-6 font-bold text-lg border-b">Shopping Behavior</div>
      <button
        onClick={onHide}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        title="Ẩn menu"
      >
        ✖
      </button>
      <ul className="mt-4 space-y-2 px-4">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-2 py-1 rounded cursor-pointer hover:bg-gray-200 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}