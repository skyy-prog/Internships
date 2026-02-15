import { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import React from "react";
export default function AdminDashboard() {
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    projectName: "",
    price1: "",
    price2: "",
    location: ""
  });

  useEffect(() => {
    axios.get(backend_url + "/api/content")
      .then(res => setForm(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.put(backend_url + "/api/content/update", form);
    alert("Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            Hero Section Editor
          </span>
        </div>

        <hr className="mb-8" />

    
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-semibold mb-1">
              Hero Title
            </label>
            <input
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Hero Subtitle
            </label>
            <input
              name="heroSubtitle"
              value={form.heroSubtitle}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Project Name
            </label>
            <input
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Price 1
            </label>
            <input
              name="price1"
              value={form.price1}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Price 2
            </label>
            <input
              name="price2"
              value={form.price2}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

        </div>

    
        <div className="mt-10 text-center">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl shadow-lg transition font-semibold text-lg"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
