import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import ChartSection from "../components/ChartSection";
import ActivityLog from "../components/AtivityLog";

export default function Dashboard() {
  console.log("🧩 Dashboard component mounted!");
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        console.log("Đang gọi API lấy tài khoản..."); // Thêm dòng này
        const res = await api.get("/accounts");
        console.log("Data:", res.data); // In kết quả API
        const admins = res.data.filter((acc) => acc.role === "admin");
        setAdminCount(admins.length);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchAdminCount();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="Tài khoản quản trị" value={adminCount} />
      </div>
    </MainLayout>
  );
}
