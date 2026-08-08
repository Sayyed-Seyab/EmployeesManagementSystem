import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export default function AllEmployeesAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

    const downloadExcel = () => {
    const excelData = accounts.map((accounts, index) => ({
      "S.No": index + 1,
      "Work Location": accounts.workLocation,
      "MIS": accounts.mis,
      "Account NO": accounts.AccountNo,
      "Account Holder Name": accounts.AccountHolderName,
      "Contact No": accounts.ContactNO,
      
    
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(excelData);
  
    const workbook = XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
  
    saveAs(fileData, "Accounts_Data_Jeddah.xlsx");
  };

  const fetchAccounts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/employees/accounts"
      );

      if (data.success) {
        setAccounts(data.account);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch accounts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading Accounts...
      </div>
    );
  }

 return (
  <div className="p-6">

     {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b bg-gray-50">

    <h1 className="text-3xl font-bold text-gray-800">
      Employees Account List
    </h1>

    <button
      onClick={downloadExcel}
      className="bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
    >
      📥 Download Excel
    </button>

  </div>

    {/* Table */}
    <div className="  rounded-xl shadow-lg border border-gray-200">
      <table className="m-1 w-full border-collapse">

        {/* Table Head */}
        <thead className="sticky top-0 z-20 bg-green-700 text-white">
          <tr>
            <th className="px-4 py-3 rounded-tl-xl">S.NO</th>
            <th className="px-4 py-3">MIS</th>
            <th className="px-4 py-3">Account Number</th>
            <th className="px-4 py-3">Account Holder Name</th>
            <th className="px-4 py-3">Contact Number</th>
            <th className="px-4 py-3 rounded-tr-xl">Created At</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <tr
                key={account._id}
                className="border-b text-sm even:bg-gray-50 odd:bg-white hover:bg-blue-50 transition duration-200"
              >
                <td className="px-4 py-3 text-center font-medium">
                  {index + 1}
                </td>

                <td className="px-4 py-3 text-center">
                  {account.mis}
                </td>

                <td className="px-4 py-3 font-mono text-center">
                  {account.AccountNo}
                </td>

                <td className="px-4 py-3 text-center">
                  {account.AccountHolderName}
                </td>

                <td className="px-4 py-3 text-center">
                  {account.ContactNO}
                </td>

                <td className="px-4 py-3 text-center">
                  {new Date(account.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-gray-500 text-lg"
              >
                No Accounts Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>

  </div>
);
}