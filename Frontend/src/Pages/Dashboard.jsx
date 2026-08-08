import React, { useState } from "react";
import AllEmployeesData from "../Components/AllEmployeesData";
import AllEmployeesAccounts from "../Components/AllEmployeesAccounts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="p-5">

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          borderBottom: "2px solid #ddd",
        }}
      >
        {/* Employees Details Tab */}
        <div
          onClick={() => setActiveTab("employees")}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:
              activeTab === "employees" ? "#28a745" : "transparent",
            color:
              activeTab === "employees" ? "#fff" : "#333",
            borderRadius: "8px 8px 0 0",
            marginRight: "10px",
            transition: "0.3s",
          }}
        >
          Employees Details
        </div>

        {/* Accounts Details Tab */}
        <div
          onClick={() => setActiveTab("accounts")}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:
              activeTab === "accounts" ? "#28a745" : "transparent",
            color:
              activeTab === "accounts" ? "#fff" : "#333",
            borderRadius: "8px 8px 0 0",
            transition: "0.3s",
          }}
        >
          Accounts Details
        </div>
      </div>

      {/* Tables */}
      <div>
        {activeTab === "employees" && <AllEmployeesData />}

        {activeTab === "accounts" && <AllEmployeesAccounts />}
      </div>

    </div>
  );
}