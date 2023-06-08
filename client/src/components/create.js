import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };

    await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", email: "", password: "", passwordConfirmation: "" });
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4">Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordConfirmation" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            id="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={(e) => updateForm({ passwordConfirmation: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="Create User"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
