import { useState, useEffect } from "react";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import Sidebar from "../components/Sidebar";

function Users() {
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const sendrequest = async () => {
    const response = await fetch("http://localhost:3001/api/users");
    const responseData = await response.json();
    setUsers(responseData.data);
  };

  useEffect(() => {
    sendrequest();
  }, []);

  const onUpdate = (name, email, password, id) => {
    const updatedUser = { name, email, password };

    fetch(`http://localhost:3001/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user.");
        }
        return response.json();
      })
      .then((responseData) => {
        sendrequest();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:3001/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((item) => item.id !== id));
    sendrequest();
  };

  const handleEdit = (user, id) => {
    setEdit(true);
    setUser(user);
    setId(id);
  };

  const addNewUser = async (name, email, password, passwordConfirmation) => {
    const formValues = { name, email, password, passwordConfirmation };
    await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formValues),
    }).catch((error) => {
      window.alert(error);
    });

    setUsers([...users, formValues]);
    sendrequest();
  };

  return (
    <>
      <Sidebar />
      <div className="px-3 mt-20 ml-[30%] ">
        <div className="relative overflow-x-auto  ">
          <div className="flex items-center justify-between py-4 bg-white ">
            <div>
              <button
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300  font-medium rounded-lg text-sm px-3 py-1.5 "
                type="button"
                onClick={() => setAddUser(true)}
              >
                Add user{" "}
              </button>
              {addUser ? (
                <AddUser
                  showModal={addUser}
                  setshowModal={setAddUser}
                  onAdd={addNewUser}
                />
              ) : (
                <></>
              )}
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                    <div className="">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.password}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      onClick={() => handleEdit(user, user._id)}
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href="#"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                      className="font-medium text-red-600  hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <!-- Edit user modal --> */}
          {edit ? (
            <EditUser
              user={user}
              showModal={edit}
              id={id}
              setshowModal={setEdit}
              onUpdate={onUpdate}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
export default Users;
