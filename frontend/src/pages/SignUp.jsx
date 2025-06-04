  import React, { useState, useEffect } from "react";
  import api from "../services/api";
  import FloatingInput from "../components/FloatingInput";
  import isEmail from "validator/lib/isEmail";

  function SignUp() {
    const [step, setStep] = useState(1);

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [email, setEmail] = useState("");
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);

    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
      if (username.trim() === "") 
        return setIsUsernameAvailable(false);

      const timer = setTimeout(() => {
        api.get("/api/accounts/check-username", { params: { username } })
          .then(res => setIsUsernameAvailable(res.data.available))
          .catch(() => setIsUsernameAvailable(false));
      }, 500);
      return () => clearTimeout(timer);
    }, [username]);

    useEffect(() => {
      const valid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password) &&
        password === confirmPassword;
      setIsPasswordValid(valid);
    }, [password, confirmPassword]);

    useEffect(() => {
      if (email.trim() === "" || !isEmail(email))
        return setIsEmailAvailable(false);
      const timer = setTimeout(() => {
        api.get("/api/accounts/check-email", { params: { email } })
          .then(res => setIsEmailAvailable(res.data.available))
          .catch(() => setIsEmailAvailable(false));
      }, 500);
      return () => clearTimeout(timer);
    }, [email]);

    const handleRegister = () => {
      const data = { username, password, email };
      api.post("/api/accounts", data)
        .then(() => alert("Đăng ký thành công"))
        .catch((err) => {
          console.error(err);
          alert("Đăng ký thất bại");
        });
    };

    return (
      <div className="h-screen flex">
        <div className="w-1/2 bg-gradient-to-br flex items-center justify-center text-white">
          <div className="text-center px-10">
            <h1 className="text-4xl font-bold mb-4">Tạo tài khoản</h1>
            <p className="text-lg">Gia nhập hệ thống để theo dõi và quản lý thông tin dễ dàng hơn!</p>
          </div>
        </div>

        <div className="w-1/2 mx-auto flex items-center justify-center p-10">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            {step === 1 && (
              <>
                <h1 className="text-2xl font-semibold text-center mb-6 mt-6">
                  Bước 1: Tên người dùng
                </h1>
                <FloatingInput
                  id="username"
                  type="text"
                  label="Tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className={`text-sm mt-2 ${isUsernameAvailable ? "text-green-500" : "text-red-500"}`}>
                  {username &&
                    (isUsernameAvailable
                      ? "Tên hợp lệ!"
                      : "Tên đã tồn tại hoặc không hợp lệ.")}
                </p>
                <button
                  disabled={!isUsernameAvailable}
                  onClick={() => setStep(2)}
                  className={`w-full py-2 mt-6 rounded ${
                    isUsernameAvailable
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  Tiếp theo
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Bước 2: Mật khẩu</h2>
                <FloatingInput
                  id="password"
                  type="password"
                  label="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FloatingInput
                  id="confirmPassword"
                  type="password"
                  label="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="text-sm mt-2 text-gray-500">
                  Ít nhất 8 ký tự, gồm chữ hoa, thường, ký tự đặc biệt.
                </p>
                <p className={`text-sm mt-1 ${isPasswordValid ? "text-green-500" : "text-red-500"}`}>
                  {password && confirmPassword &&
                    (isPasswordValid ? "Mật khẩu hợp lệ!" : "Mật khẩu chưa hợp lệ hoặc không khớp.")}
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(1)} className="bg-gray-300 text-white py-2 px-4 rounded">
                    Quay lại
                  </button>
                  <button
                    disabled={!isPasswordValid}
                    onClick={() => setStep(3)}
                    className={`py-2 px-4 rounded ${
                      isPasswordValid ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Tiếp theo
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Bước 3: Email</h2>
                <FloatingInput
                  id="email"
                  type="email"
                  label="Địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className={`text-sm mt-2 ${isEmailAvailable ? "text-green-500" : "text-red-500"}`}>
                  {email &&
                    (isEmailAvailable ? "Email hợp lệ!" : "Email đã được sử dụng hoặc không đúng định dạng.")}
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(2)} className="bg-gray-300 text-white py-2 px-4 rounded">
                    Quay lại
                  </button>
                  <button
                    disabled={!isEmailAvailable}
                    onClick={() => setStep(4)}
                    className={`py-2 px-4 rounded ${
                      isEmailAvailable ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Tiếp theo
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Bước 4: Xác nhận</h2>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  Tôi đồng ý với các điều khoản và điều kiện.
                </label>
                <div className="flex justify-between">
                  <button onClick={() => setStep(3)} className="bg-gray-300 text-white py-2 px-4 rounded">
                    Quay lại
                  </button>
                  <button
                    disabled={!agreed}
                    onClick={handleRegister}
                    className={`py-2 px-4 rounded ${
                      agreed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Đăng ký
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default SignUp;