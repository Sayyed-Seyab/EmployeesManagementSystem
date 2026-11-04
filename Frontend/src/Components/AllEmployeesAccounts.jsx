
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export default function AllEmployeesAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const serverUrl =
    "https://employeesmanagementsystem-1.onrender.com";

  // Filter accounts according to selected location
  const filteredAccounts =
    selectedLocation === "All"
      ? accounts
      : accounts.filter(
          (account) =>
            account.workLocation?.trim().toLowerCase() ===
            selectedLocation.toLowerCase()
        );

  // Download filtered accounts to Excel
  const downloadExcel = () => {
    if (filteredAccounts.length === 0) {
      toast.warning("No accounts available to export.");
      return;
    }

    const excelData = filteredAccounts.map((account, index) => ({
      "S.No": index + 1,
      "Work Location": account.workLocation,
      MIS: account.mis,
      IBN: account.AccountNo,
      Beneficiary: account.AccountHolderName,
      Bank: account.BankName,
      "Contact No": account.ContactNO,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    XLSX.writeFile(
      workbook,
      `Accounts_Data_${selectedLocation}.xlsx`
    );

    toast.success("Excel file downloaded successfully!");
  };

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${serverUrl}/api/employees/accounts`
      );

      if (data.success) {
        setAccounts(data.account);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch accounts."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${serverUrl}/api/employees/account/${id}`
      );

      if (response.status === 200) {
        toast.success("Account deleted successfully.");

        setAccounts((prevAccounts) =>
          prevAccounts.filter(
            (account) => account._id !== id
          )
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete account."
      );
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading Accounts...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-red-600 text-white text-xl font-bold hover:bg-red-700"
            >
              ×
            </button>

            {/* Full Image */}
            <img
              src={selectedImage}
              alt="Account Full Size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b bg-gray-50">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Employees Account List
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Total Accounts: {filteredAccounts.length}
          </p>
        </div>

        {/* Location Filter + Excel Download */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Location Dropdown */}
          <select
            value={selectedLocation}
            onChange={(e) =>
              setSelectedLocation(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Riyadh">Riyadh</option>
            <option value="Jeddah">Jeddah</option>
            <option value="Dammam">Dammam</option>
          </select>

          {/* Download Excel Button */}
          <button
            onClick={downloadExcel}
            disabled={filteredAccounts.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            📥 Download Excel
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl shadow-lg border border-gray-200 overflow-x-auto">

        <table className="m-1 w-full border-collapse">

          {/* Table Head */}
          <thead className="sticky top-0 z-20 bg-green-700 text-white">
            <tr>
              <th className="px-4 py-3 rounded-tl-xl">S.NO</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">MIS</th>
              <th className="px-4 py-3">Account Number</th>
              <th className="px-4 py-3">Account Holder Name</th>
              <th className="px-4 py-3">Bank Name</th>
              <th className="px-4 py-3">Contact Number</th>
              <th className="px-4 py-3">Work Location</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-center rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account, index) => (
                <tr
                  key={account._id}
                  className="border-b text-sm even:bg-gray-50 odd:bg-white hover:bg-blue-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-center font-medium">
                    {index + 1}
                  </td>

                  {/* Account Image */}
                  <td className="px-4 py-3 text-center">
                    {account.accountImage && (
                      <img
                        src={account.accountImage}
                        alt="Account"
                        onClick={() =>
                          setSelectedImage(account.accountImage)
                        }
                        className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
                      />
                    )}
                  </td>

                  {/* MIS */}
                  <td className="px-4 py-3 text-center">
                    {account.mis}
                  </td>

                  {/* Account Number */}
                  <td className="px-4 py-3 font-mono text-center">
                    {account.AccountNo}
                  </td>

                  {/* Account Holder */}
                  <td className="px-4 py-3 text-center">
                    {account.AccountHolderName}
                  </td>

                  {/* Bank */}
                  <td className="px-4 py-3 text-center">
                    {account.BankName}
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3 text-center">
                    {account.ContactNO}
                  </td>

                  {/* Work Location */}
                  <td className="px-4 py-3 text-center">
                    {account.workLocation}
                  </td>

                  {/* Created At */}
                  <td className="px-4 py-3 text-center">
                    {account.createdAt
                      ? new Date(
                          account.createdAt
                        ).toLocaleDateString("en-GB")
                      : "-"}
                  </td>

                  {/* Delete Action */}
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(account._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  No Accounts Found
                  {selectedLocation !== "All" &&
                    ` in ${selectedLocation}`}
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}