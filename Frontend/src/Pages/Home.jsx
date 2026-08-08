import React, { useState } from "react";
import EmployeesForm from "../Components/EmployeesForm";
import AccountDetails from "../Components/AccountDetails";

export default function Home() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div style={{ padding: "30px" }}>
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          borderBottom: "2px solid #ddd",
        }}
      >
        <div
          onClick={() => setActiveTab("employee")}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:
              activeTab === "employee" ? "#28a745" : "transparent",
            color: activeTab === "employee" ? "#fff" : "#333",
            borderRadius: "8px 8px 0 0",
            marginRight: "10px",
            transition: "0.3s",
          }}
        >
          Employee Details Form
        </div>

        <div
          onClick={() => setActiveTab("account")}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:
              activeTab === "account" ? "#28a745" : "transparent",
            color: activeTab === "account" ? "#fff" : "#333",
            borderRadius: "8px 8px 0 0",
            transition: "0.3s",
          }}
        >
          Salary Account Details Form
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "employee" && <EmployeesForm />}
        {activeTab === "account" && <AccountDetails />}
      </div>
    </div>
  );
}