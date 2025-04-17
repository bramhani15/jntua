// import { use, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { todoStore} from './todoSlice';
// // import Tuto from './Tuto'
// import { useSelector, useDispatch } from "react-redux";
// import { colorSlice } from "./themeSlice";

// export default function App() {
//   const count = useSelector((state) => state.theme.count);
//   const dispatch = useDispatch();

//   return (
//     <div
//       style={{
//         backgroundColor: count % 2 === 0 ? "white" : "black",
//         color: count % 2 === 0 ? "black" : "white",
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "background-color 0.5s ease",
//       }}
//     >
//       <header>Welcome to the Home Page</header>
//       <p>Click Count: {count}</p>
//       <button
//         onClick={() => dispatch(colorSlice())}
//         style={{ padding: "10px", margin: "10px" }}
//       >
//         Toggle Theme
//       </button>
//     </div>
//   );
// }



// export default function App() {
//   return(
//     <div>
//       <header>
//         <nav>
//           <button type ="button">Home</button>
//           <button type ="button">About us</button>
//           <button type ="button">Contact</button>
//         </nav>
//       </header>
//       <div className="card">
//         <img src="data:image/png;base64,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" alt="React Logo"/>
//         <h4>React</h4>
//       </div>
//       <footer>
//         <h2>email id: bramhanibysani@gmail.com</h2>
//         <h3>Thanks for visiting our website</h3>
//       </footer>
//     </div>
//   )
// }
// export default function App() {
//   return (
//     <div className="App">
//       <Tuto />
//     </div>
//   )
// }
// export default function App(){
//     const colourSlice  =useSelector(
//         state => state.theme.value 
//     )
//     const dispatch = useDispatch();
//     return (
//         <div>
//             <button onClick={() => dispatch(True())}>Light</button>
//             <button onClick={() => dispatch(False())}>Dark</button>
//         </div>
//     )
// }

        
        //   <div>
        //     <button onClick={() => dispatch(setLightMode())}>Light Mode</button>
        //     <button onClick={() => dispatch(setDarkMode())}>Dark Mode</button>
        //   </div>
    //     <div style={{ backgroundColor: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff", padding: "10px" }}>
    //     <h2>Current Theme: {theme} </h2>
    //     <button onClick={() => dispatch(setLightMode())}>Light Mode</button>  
    //     <button onClick={() => dispatch(setDarkMode())}>Dark Mode</button>
    //   </div>
    //     );
    //   };
    // export default function App() {
    //     useEffect(() => {
    //         fetch('https://api.restful-api.dev/objects')
    //             .then(response => response.json())
    //             .then(data => console.log(data))
    //     }
    // )
    // }
// export default function App() {
//     const [data,setData] = useState([]);
//     useEffect(() => {
//         fetch('https://api.restful-api.dev/objects')
//         .then(response => response.json())
//         .then(data => console.log(data))
//     })
//     return (
//         <div>
//             <h1>React Fetch Data</h1>
//             <ul>
//                 {data.map(item => (
//                     <li key={item.id}>{item.name}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }


// export default function App() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetch('https://api.restful-api.dev/objects')
//             .then(response => response.json())
//             .then(data => setData(data)) 
//     }, []); 

//     return (
//         <div>
//             <h1>React Fetch Data</h1>
//             <ul>
//                 {data.map(item => (
//                     <li key={item.id}>{item.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
// export default function App() {
//     const [task, setTask] = useState([]);
//     return (
//         <div>
//             <h1> To-Do List</h1>
//             <input type="text" placeholder="Enter task" />
//             <button>Add Task</button>
//             <ul>
//                 {task.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>

//         </div>
       
//     )
// }

// import { Routes, Route } from "react-router-dom";
// // import Login from './LoginForm';
// // import Dashboard from "./Dashboard";
// import usermanagement from "./usermanagement.jsx"
// import './App.css'


// function App() {
//   return (
//     <Routes>
//             <Route path="/" element={<UserManagement />} />
//         </Routes>
//   );
// }
// export default App;
// import { Routes, Route } from "react-router-dom";
// import UserManagement from "./usermanagement.jsx";
// import "./App.css";

// function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<UserManagement />} />
//         </Routes>
//     );
// }

// export default App;





import React from "react";
import AdminUserlogin from "./AdminUserlogin"; // ✅ Correct

import "bootstrap/dist/css/bootstrap.min.css";
// import LoginPage from "./AdminUserlogin";

const App = () => {
  return (
    <div className="container">
      <AdminUserlogin/>
    </div>
  );
};

export default App;

// import React from "react";
// import AdminUserlogin from "./AdminUserlogin";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import "bootstrap/dist/css/bootstrap.min.css";

// // const App = () => {
// //   return (
// //     <div className="container">
// //       <AdminUserlogin/>
// //           </div>
// //   );
// // };
// const AdminDashboard = () => <h2 className="text-center mt-5">Welcome to Admin Dashboard</h2>;
// const UserDashboard = () => <h2 className="text-center mt-5">Welcome to User Dashboard</h2>;
// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<AdminUserlogin />} />
//       <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       <Route path="/user-dashboard" element={<UserDashboard />} />
//     </Routes>
//   </Router>
// );

// export default App;

