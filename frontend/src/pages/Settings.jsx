import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Settings() {
  const { user, setUser, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa tài khoản này của bạn?")) return;

    try {
      await api.delete(`/accounts/${user.id}`);
      alert("Đã xóa thành công!");
      logout();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại!");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/accounts/${user.id}`, {
        email,
        password,
        role: user.role,
      });
      if (res.status === 200) {
        setSuccessMsg("Cập nhật thành công!");
        const updatedUser = { ...user, email };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Cập nhật thất bại", error);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto ">
      <h1 className="text-3xl font-bold text-center">Cài đặt chung</h1>

      <div className="bg-gradient-to-tr from-pink-100 via-white to-blue-100 shadow rounded-xl p-6 space-y-4 ">
        <h2 className="text-2xl font-semibold mb-4">Cài đặt tài khoản</h2>

        <div className="space-y-2">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded"
            placeholder="Để trống nếu không đổi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <h2>Role: {user.role}</h2>
        <br />

        <button
          onClick={handleUpdate}
          className="dynamic-primary text-white px-4 py-2 rounded"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          Cập nhật
        </button>
        {successMsg && <p className="text-green-600">{successMsg}</p>}
      </div>

      <div className="bg-gradient-to-tr from-pink-100 via-white to-blue-100 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Danger Zone!!!</h2>
                <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDelete(user.id)}
        >
          Xóa tài khoản
        </button>
      </div>

      <div className="bg-gradient-to-tr from-pink-100 via-white to-blue-100 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Hệ thống</h2>
        <button
          onClick={logout}
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}