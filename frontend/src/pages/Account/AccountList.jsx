import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import api from "../../services/api";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const res = await api.get("/accounts/");
      setAccounts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài khoản", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa tài khoản này?")) return;

    try {
      await api.delete(`/accounts/${id}`);
      alert("Đã xóa thành công!");
      fetchAccounts();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại!");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Danh sách tài khoản</h1>
      <table className="min-w-full bg-gradient-to-tr from-pink-100 via-white to-blue-100 border rounded-xl">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Tên đăng nhập</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Thời gian tạo</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, index) => (
            <tr key={acc._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{acc.username}</td>
              <td className="p-3">{acc.email}</td>
              <td className="p-3 capitalize">{acc.role}</td>
              <td className="p-3">
                {dayjs(acc.created_at).format("DD-MM-YY HH:mm:ss")}
              </td>
              <td className="p-3 space-x-2">
                <button
                  className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                  onClick={() => navigate(`/accounts/action-logs/${acc.id}`)}
                >
                  Xem log
                </button>
                <button
                  className={`px-2 py-1 text-sm rounded text-white ${
                    acc.id === user.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500"
                  }`}
                  onClick={() => navigate(`/accounts/edit/${acc.id}`)}
                  disabled={acc.id === user.id}
                >
                  Sửa
                </button>
                <button
                  className={`px-2 py-1 text-sm rounded text-white ${
                    acc.id === user.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500"
                  }`}
                  onClick={() => handleDelete(acc.id)}
                  disabled={acc.id === user.id}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
