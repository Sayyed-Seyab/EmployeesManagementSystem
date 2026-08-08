
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  return (
    <>
    
   <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <Outlet />

    </>
  );
}

export default MainLayout;