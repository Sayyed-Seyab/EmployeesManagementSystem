import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";





function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

      </Route>

     

      <Route path="/dashboard" element={<Dashboard />} />

      {/* <Route path="*" element={<NotFound />} /> */}

    </Routes>
  );
}

export default AppRoutes;