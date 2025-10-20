import React, { useState } from "react";
import { LoginUser } from "../api/auth/ApiServices";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { setLoginUser } from "../store/slice/authSlice";

export default function LoginUI() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        if (!form.username || !form.password) {
            setError("Please enter both username and password");
            return;
        }
        const payload = {
            username: form.username,
            password: form.password,
        };

        const logindata = await LoginUser(payload);
        if (logindata.error) {
            setError(logindata.error);
        } else {
            // Handle successful login
            console.log("Login successful:", logindata);
            dispatch(setLoginUser(logindata));
            setTimeout(() => navigate("/verify-otp"), 1500);

        }
        console.log("Logging in with:", form);
        setError(null);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Login
                </h2>

                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                >
                    Login
                </button>

                {error && (
                    <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
                )}
            </div>
        </div>
    );
}
