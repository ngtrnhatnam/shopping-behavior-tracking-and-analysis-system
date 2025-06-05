import { useEffect, useState } from "react";
import api from "../services/api";

export default function AllLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  const fetchLogs = async () => {
    try {
      let res;

      if (filterType === "year") {
        res = await api.get(`/action-logs/filter-by-year?year=${filterValue}`);
      } else if (filterType === "month") {
        res = await api.get(`/action-logs/filter-by-month?month=${filterValue}`);
      } else if (filterType === "date") {
        res = await api.get(`/action-logs/filter-by-date?date=${filterValue}`);
      } else {
        res = await api.get("/action-logs/");
      }

      setLogs(res.data);
    } catch (err) {
      console.error("Lỗi khi tải logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFilter = () => {
    if (filterType !== "all" && !filterValue) {
      alert("Vui lòng nhập giá trị lọc!");
      return;
    }
    setLoading(true);
    fetchLogs();
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-3xl font-bold text-center">Toàn bộ hoạt động hệ thống</h1>

      {/* Bộ lọc */}
      <div className="flex gap-4 items-end">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="all">Tất cả</option>
          <option value="year">Theo năm</option>
          <option value="month">Theo tháng</option>
          <option value="date">Theo ngày</option>
        </select>

        {(filterType !== "all") && (
          <input
            type={filterType === "date" ? "date" : "text"}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder={
              filterType === "year"
                ? "VD: 2025"
                : filterType === "month"
                ? "VD: 2025-06"
                : ""
            }
            className="border rounded px-4 py-2"
          />
        )}

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lọc
        </button>
      </div>

      {/* Hiển thị log */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : logs.length === 0 ? (
        <p>Không có hoạt động nào phù hợp.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li
              key={log.id}
              className="border p-4 rounded bg-gradient-to-br from-blue-50 via-white to-pink-50"
            >
              <p><strong>ID Tài khoản:</strong> {log.account_id}</p>
              <p><strong>Hành động:</strong> {log.action}</p>
              <p className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
