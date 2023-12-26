import Sidebar from "../../components/common/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import React from "react";
import AdminNavbar from "../../components/common/Admin/AdminNavbar";

const AdminLayOut = () => {
  return (
    <>
      <AdminNavbar />
      <section className="flex bg-gray-100">
        <Sidebar />
        <div className="w-full md:w-11/12 h-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AdminLayOut;
