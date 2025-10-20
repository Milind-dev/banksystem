import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { RegisterUser } from "../api/auth/ApiServices"; // your API function
import { setRegister } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";


export default function RegisterAdmin() {
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    console.log("Register Admin - isLoggedIn:", isLoggedIn);

    const [form, setForm] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit() {
        setMessage(null);
        setError(null);

        const payload = {
            username: form.username,
            password: form.password,
            role: "superadmin", // fixed, hidden from the form
        };

        try {
            const response = await RegisterUser(payload); // adjust API call
            dispatch(setRegister(response));

            setMessage(response.message || "SuperAdmin registered successfully!");
            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Register SuperAdmin</h2>

            <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Register
            </button>

            {message && <p className="text-green-600 mt-3">{message}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
    );
}
