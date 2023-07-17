// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LandingPage from "./pages/LandingPage/LandingPage";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<LandingPage />} />
//         <Route exact path="/signup" element={<Signup />} />
//         <Route exact path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
 
// We use Route in order to define the different routes of our application
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar.jsx";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Users from "./pages/Users.js";
 
const App = () => {
 return (
   <div>
     <BrowserRouter>
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/users" element={<Users />} />
       
     </Routes>
      </BrowserRouter>
   </div>
 );
};
 
export default App;