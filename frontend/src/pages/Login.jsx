import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import FloatingInput from "../components/FloatingInput";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!usernameOrEmail) {
      errors.usernameOrEmail = "Vui lòng nhập tên tài khoản hoặc email";
    }
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      // Gọi thẳng login trong context với usernameOrEmail
      const success = await login(usernameOrEmail, password);
      if (success) {
        navigate("/");
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };


  return (
    <div className="container mx-auto py-28 px-4">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        noValidate>
        <h1 className="text-2xl font-semibold text-center mb-6 mt-6">Đăng nhập</h1>
        <div className="mb-4">
          <FloatingInput
            id="username"
            type="text"
            label="Tên người dùng"
            value={usernameOrEmail}
            onChange={(e) => {
              setUsernameOrEmail(e.target.value);
              setValidationErrors((prev) => ({ ...prev, usernameOrEmail: "" }));
            }}
            className="w-full p-2 border rounded"
          />
          {validationErrors.usernameOrEmail && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.usernameOrEmail}
            </p>
          )}
        </div>
        <div className="mb-4">
          <FloatingInput
            id="password"
            type="password"
            label="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors((prev) => ({ ...prev, password: "" }));
            }}
            className="w-full p-2 border rounded"
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>
        {error && (
          <p className="text-red-500 mb-4 flex items-center">
            <FaPaw className="mr-2 text-2xl text-pink-400" /> {error}
          </p>
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded hover:bg-purple-600 mt-8 ${
            !usernameOrEmail || !password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 text-white"
          }`}
          disabled={!usernameOrEmail || !password}
        >
          Đăng nhập
        </button>
        <p className="mt-4 text-center">
          Chưa có tài khoản?{" "}
          <Link to="/sign-up" className="text-purple-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;