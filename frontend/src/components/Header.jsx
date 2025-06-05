import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/images/avatar.png";

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  return (
    <header className="bg-gradient-to-tr from-pink-100 via-white to-blue-100 shadow px-6 py-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold">Trang chủ hệ thống</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Xin chào, {user?.username || "Admin"}</span>
        <div className="relative">
          <img
            src={avatar}
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
            alt="avatar"
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-gradient-to-tr from-pink-100 via-white to-blue-100 border rounded shadow z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
