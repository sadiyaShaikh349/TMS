import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Reg from "./Component/Reg";
import Admin from "./Component/Admin";
import Home from "./Component/Home";
import AdminLogin from "./Component/AdminLogin";
import AddTask from "./Component/AddTask";
import UpdateTask from "./Component/UpdateTask";
import AdminDash from "./Component/AdminDash";

import UserTask from "./Component/UserTask";

function App()
{
    return(
        <>
        <BrowserRouter>
           <Routes>
            <Route path="/" element={<Home/>} />
           <Route path="/Reg" element={<Reg/>}/>
           <Route path="/LoginForm" element={<LoginForm/>} />
           <Route path="/Admin" element={<Admin/>} />
           <Route path="/AdminLogin" element={<AdminLogin/>} />
           <Route path="/AddTask" element={<AddTask/>} />
           <Route path="/UpdateTask/:id" element={<UpdateTask/>} />
           <Route path="/AdminLogin" element={<AdminLogin/>} />
           <Route path="/AdminDash" element={<AdminDash />} />
           <Route path="/UserTask" element={<UserTask/>} />
           </Routes>
        </BrowserRouter>
        
        </>
    )
}
export default App;