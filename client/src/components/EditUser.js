import { useState } from "react";

function EditUser({ showModal, id, onUpdate, setshowModal, user }) {
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [password, setpassword] = useState(user.password);

  const formHandler = (event) => {
    event.preventDefault();
    onUpdate(name, email, password, id);
    setshowModal(false);
  };

  return (
    <>
      {/* <!-- Edit user modal --> */}
      {showModal ? (
        <div className="modal">
          <div
            tabindex="-1"
            className="fixed top-0 modal  right-0 z-50 items-center justify-center flex  w-full p-4 overflow-x-hidden overflow-y-auto  h-screen "
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <form
                onSubmit={formHandler}
                action="#"
                className="relative bg-white rounded-lg shadow "
              >
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Edit user
                  </h3>
                  <button
                    type="button"
                    onClick={() => setshowModal(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                    data-modal-hide="EditUserModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 ">
                      <label
                        htmlFor="user-name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        name="user-name"
                        id="user-name"
                        className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 "
                        placeholder="Bonnie"
                        required=""
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        id="email"
                        className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 "
                        placeholder="example@company.com"
                        required=""
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Password
                      </label>
                      <input
                        type="tel"
                        name="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        id="phone-number"
                        className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 "
                        placeholder="••••••••"
                        required=""
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save all
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditUser;
