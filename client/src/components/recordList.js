import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td className="px-4 py-2 border">{props.record.name}</td>
    <td className="px-4 py-2 border">{props.record.email}</td>
    <td className="px-4 py-2 border">{props.record.password}</td>
    <td className="px-4 py-2 border">
      <Link
        className="text-blue-500 hover:underline mr-2 transition-colors duration-300"
        to={`/edit/${props.record._id}`}
      >
        Edit
      </Link>
      <button
        className="text-red-500 hover:underline transition-colors duration-300"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch("http://localhost:3001/api/users/");
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const data = await response.json();
        setRecords(data.data);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((user) => {
      return (
        <Record
          record={user}
          deleteRecord={() => deleteRecord(user._id)}
          key={user._id}
        />
      );
    });
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Users</h3>
      <div className="flex justify-end mb-4">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/create"
        >
          Create User
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Password</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
