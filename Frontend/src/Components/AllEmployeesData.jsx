import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AllEmployeesData() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Employees
  const getEmployees = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "https://employeesmanagementsystem-1.onrender.com/api/employees"
      );

      if (data.success) {
        setEmployees(data.data);
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to fetch employees."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const downloadExcel = () => {
  const excelData = employees.map((employee, index) => ({
    "S.No": index + 1,
    "Work Location": employee.workLocation,
    "Full Name": employee.fullName,
    MIS: employee.mis,
    "Iqama No": employee.iqamaNo,
    "Date of Birth": new Date(employee.dateOfBirth).toLocaleDateString("en-GB"),
    "Joining Date": new Date(employee.joiningDate).toLocaleDateString("en-GB"),
    Nationality: employee.nationality,
    Profession: employee.profession,
    "Absher Mobile": employee.absherMobile,
    "Basic Salary": employee.basicSalary,
    "Housing & Transportation": employee.accommodationTransportation,
    "Other Allowances": employee.otherAllowances,
     "Total Package": employee.totalPackage,
       Education: employee.education,
    "Bank IBAN": employee.bankIban,
    "Bank Name": employee.bankName,
    "Account Holder Name": employee.AccountHolderName,
    "Personal Email": employee.personalEmail,
    
    
    
    
   
  
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

  saveAs(fileData, "Employees_Data_Jeddah.xlsx");
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Employees...
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-200">
        <div className="m-5 w-full h-[95vh] rounded-2xl border border-gray-200 shadow-lg bg-white overflow-hidden">

  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b bg-gray-50">

    <h1 className="text-3xl font-bold text-gray-800">
      Employees List
    </h1>

    <button
      onClick={downloadExcel}
      className="bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
    >
      📥 Download Excel
    </button>

  </div>

  <div className="w-full h-full overflow-x-auto overflow-y-auto ">

    <table className="m-1 min-w-[2200px] w-full border-collapse">

      {/* Table Head */}

      <thead className="sticky top-0 z-20 bg-green-700 text-white rounded-full">

        <tr>

          <th className="px-4 py-3 rounded-tl-xl">S.NO</th>
          <th className="px-4 py-3">Full Name</th>
          <th className="px-4 py-3">MIS</th>
          <th className="px-4 py-3">Iqama No</th>
          <th className="px-4 py-3">Date of Birth</th>
          <th className="px-4 py-3">Joining Date</th>
          <th className="px-4 py-3">Nationality</th>
          <th className="px-4 py-3">Profession</th>
          <th className="px-4 py-3">Work Location</th>
          <th className="px-4 py-3">Bank IBAN</th>
          <th className="px-4 py-3">Bank Name</th>
          <th className="px-4 py-3">Account Holder</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Absher</th>
          <th className="px-4 py-3">Basic Salary</th>
          <th className="px-4 py-3">Housing</th>
          <th className="px-4 py-3">Transport</th>
          <th className="px-4 py-3">Allowance</th>
          <th className="px-4 py-3">Total Package</th>
          <th className="px-4 py-3 rounded-tr-xl">Education</th>

        </tr>

      </thead>

      {/* Table Body */}

      <tbody>

        {employees.length > 0 ? (

          employees.map((employee, index) => (

            <tr
              key={employee._id}
              className="border-b text-xs even:bg-gray-50 odd:bg-white hover:bg-blue-50 transition duration-200"
            >

              <td className="px-4 py-1 font-medium">
                {index + 1}
              </td>

              <td className="px-4 py-1 whitespace-nowrap">
                {employee.fullName}
              </td>

              <td className="px-4 py-3">
                {employee.mis}
              </td>

              <td className="px-4 py-3">
                {employee.iqamaNo}
              </td>

              <td className="px-4 py-3">
                {new Date(employee.dateOfBirth).toLocaleDateString("en-GB")}
              </td>

              <td className="px-4 py-3">
                {new Date(employee.joiningDate).toLocaleDateString("en-GB")}
              </td>

              <td className="px-4 py-3">
                {employee.nationality}
              </td>

              <td className="px-4 py-3">
                {employee.profession}
              </td>

              <td className="px-1 py-1">
                {employee.workLocation}
              </td>

              <td className="px-4 py-3">
                {employee.bankIban}
              </td>

              <td className="px-4 py-3">
                {employee.bankName}
              </td>

              <td className="px-4 py-3">
                {employee.AccountHolderName}
              </td>

              <td className="px-4 py-3">
                {employee.personalEmail}
              </td>

              <td className="px-4 py-1">
                {employee.absherMobile}
              </td>

              <td className="px-4 py-3 font-semibold text-green-600">
                SAR {employee.basicSalary}
              </td>

              <td className="px-4 py-1">
                {employee.housing}
              </td>

              <td className="px-4 py-1">
                {employee.transportation}
              </td>

              <td className="px-4 py-1">
                {employee.otherAllowances}
              </td>

              <td className="px-4 py-1 font-bold text-green-700">
                SAR {employee.totalPackage}
              </td>

              <td className="px-4 py-1">
                <span className="bg-blue-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {employee.education}
                </span>
              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan="20"
              className="text-center py-10 text-gray-500 text-lg"
            >
              No Employees Found
            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
    </div>
  );
}