import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      const response = await fetch(`http://localhost:3001/api/users/${id}`, {method: "GET"});

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record.data);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      isAdmin: form.isAdmin,
    };

    await fetch(`http://localhost:3001/api/users/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mr-2">
            Name:
          </label>
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded"
            id="name"
            value={form.name || ""}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mr-2">
            Email:
          </label>
          <input
            type="email"
            className="border border-gray-300 px-3 py-2 rounded"
            id="email"
            value={form.email || ""}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mr-2">
            Password:
          </label>
          <input
            type="password"
            className="border border-gray-300 px-3 py-2 rounded"
            id="password"
            value={form.password || ""}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update User"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </div>
  );
}
