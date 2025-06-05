import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function AccountLog() {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get(`/action-logs/account/${id}`);
        setLogs(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy log hoạt động:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Lịch sử hoạt động của tài khoản #{id}</h1>
      {loading ? (
        <p>Đang tải log...</p>
      ) : logs.length === 0 ? (
        <p>Không có hoạt động nào được ghi nhận.</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="border p-3 rounded bg-gradient-to-r from-blue-50 via-white to-pink-50"
            >
              <p><strong>Hành động:</strong> {log.action}</p>
              <p><strong>Chi tiết:</strong> {log.details}</p>
              <p className="text-sm text-gray-600">
                <strong>Thời gian:</strong> {new Date(log.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}