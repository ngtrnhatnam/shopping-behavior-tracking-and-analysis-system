import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccountEdit() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch(`/api/accounts/${accountId}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [accountId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/accounts/${accountId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Cập nhật thành công!");
      navigate("/accounts");
    } else {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Sửa tài khoản</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Lưu lại
        </button>
      </form>
    </div>
  );
}
