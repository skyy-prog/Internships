import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { backend_url } from "../App";
import AllContext, { AllContexts } from "../Context/Allcontext";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const {setshow} = useContext(AllContexts)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
         backend_url + "/api/content/admin",
        { email, pass }
      );

      if (res.data.success) {
        localStorage.setItem("admin", "true");
        navigate("/");
        setshow(true)
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Admin Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-green-600 outline-none"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
