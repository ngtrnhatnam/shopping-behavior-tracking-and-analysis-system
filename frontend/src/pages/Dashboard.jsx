import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [accountCount, setAccountCount] = useState(1);
  const [activatedAccountCount, setActivatedAccountCount] = useState(2);

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const res = await api.get("/accounts/");
        console.log("Data:", res.data);
        const admins = res.data.filter((acc) => acc.role === "admin");
        setAdminCount(admins.length);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchAdminCount();
  }, []);

  useEffect(() => {
    const fetchAccountCount = async () => {
      try {
        const res = await api.get("/accounts/all");
        console.log("Data:", res.data);
        setAccountCount(res.data.length);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchAccountCount();
  }, []);

  useEffect(() => {
    const fetchActivatedAccountCount = async () => {
      try {
        const res = await api.get("/accounts/");
        console.log("Data:", res.data);
        setActivatedAccountCount(res.data.length);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchActivatedAccountCount();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded shadow space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="Tài khoản quản trị" value={adminCount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="Tổng số tài khoản" value={accountCount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard title="Số lượng tài khoản còn hoạt động" value={activatedAccountCount} />
      </div>
    </div>
  );
}
