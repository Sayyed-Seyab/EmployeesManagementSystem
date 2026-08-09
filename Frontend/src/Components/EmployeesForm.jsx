import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function EmployeesForm() {
  const [Employeeloading, setEmployeeLoading] = useState(false)
  // Store submitted data for modal
   const [submittedData, setSubmittedData] = useState(null);
    // Modal state
     const [showModal, setShowModal] = useState(false);

  const initialData = {
    fullName: "",
    mis:"",
    iqamaNo: "",
    dateOfBirth: "",
    joiningDate: "",
    nationality: "",
    profession: "",
    workLocation: "",
    bankIban: "",
    bankName:"",
    AccountHolderName:"",
    personalEmail: "",
    absherMobile: "",
    basicSalary: "",
    accommodationTransportation: "",
    totalPackage: "",
    education: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("FORM DATA:", formData);

  // ==========================================
  // FULL NAME
  // ==========================================

  if (!formData.fullName.trim()) {
    return toast.error("Full Name is required.");
  }

  if (!/^[A-Za-z ]+$/.test(formData.fullName.trim())) {
    return toast.error("Full Name should contain letters only.");
  }


  // ==========================================
  // IQAMA NUMBER
  // ==========================================

  if (!formData.iqamaNo.trim()) {
    return toast.error("Iqama Number is required.");
  }

  // Numbers only
  if (!/^\d+$/.test(formData.iqamaNo)) {
    return toast.error("Iqama Number must contain numbers only.");
  }

  // Exactly 10 digits
  if (!/^\d{10}$/.test(formData.iqamaNo)) {
    return toast.error("Iqama Number must be exactly 10 digits.");
  }


  // ==========================================
  // DATE OF BIRTH
  // EMPLOYEE MUST BE AT LEAST 18 YEARS OLD
  // ==========================================

  if (!formData.dateOfBirth) {
    return toast.error("Date of Birth is required.");
  }

  const today = new Date();

  const birthDate = new Date(formData.dateOfBirth);

  // Calculate age
  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  // If birthday has not occurred yet this year
  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age--;
  }

  // Must be 18 or older
  if (age < 18) {
    return toast.error(
      "Employee must be at least 18 years old."
    );
  }


  // ==========================================
  // JOINING DATE
  // MUST NOT BE FUTURE DATE
  // ==========================================

  if (!formData.joiningDate) {
    return toast.error("Joining Date is required.");
  }

  const joiningDate = new Date(formData.joiningDate);

  // Remove time from today's date
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);
  joiningDate.setHours(0, 0, 0, 0);

  // Joining date cannot be tomorrow or future
  if (joiningDate > currentDate) {
    return toast.error(
      "Joining Date cannot be a future date."
    );
  }


  // ==========================================
  // ABSHER MOBILE
  // ==========================================

  if (!formData.absherMobile.trim()) {
    return toast.error("Absher Mobile Number is required.");
  }

  if (!/^\d{10}$/.test(formData.absherMobile)) {
    return toast.error(
      "Absher Mobile Number must contain exactly 10 digits."
    );
  }


  // ==========================================
  // ACCOUNT NUMBER
  // ==========================================
const accountNumber = ""
  if (formData.bankIban !== "") {
    return toast.error("Account Number is required.");
      
    // Remove spaces if the user entered them
   accountNumber = formData.bankIban.replace(/\s/g, "");
console.log(accountNumber.length);
  // Numbers only
  if (!/^\d+$/.test(accountNumber)) {
    return toast.error(
      "Account Number must contain numbers only."
    );
  }


  // Exactly 22 digits
  if (accountNumber.length !== 22) {
    return toast.error(
      "Account Number must be exactly 22 digits."
    );
  }
  }


  


  // ==========================================
  // API REQUEST
  // ==========================================

  try {
    setEmployeeLoading(true);

    // Use cleaned account number
    const payload = {
      ...formData,
      bankIban: accountNumber,
    };

    console.log("PAYLOAD:", payload);

    const response = await axios.post(
      "https://employeesmanagementsystem-1.onrender.com/api/employees",
      payload
    );

    console.log("API RESPONSE:", response.data);

    if (response.status === 201) {

      // Save submitted data BEFORE clearing form
      setSubmittedData(payload);

      // Show success modal
      setShowModal(true);

      // Clear form
      setFormData(initialData);

      toast.success(
        response.data.message ||
        "Employee saved successfully."
      );
    }

  } catch (error) {

    console.log("FULL ERROR:", error);
    console.log(
      "STATUS:",
      error.response?.status
    );
    console.log(
      "DATA:",
      error.response?.data
    );

    toast.error(
      error.response?.data?.message ||
      "Something went wrong."
    );

  } finally {
    setEmployeeLoading(false);
  }
};


  useEffect(()=>{
    console.log(formData);
  },[formData])
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">
     
{/* ================= SUCCESS MODAL ================= */}

{showModal && submittedData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

    <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">

      {/* ================= MODAL HEADER ================= */}
      <div className="border-b px-6 py-5 sticky top-0 bg-white z-10">
        <h2 className="text-2xl font-bold text-green-700">
          Employee Saved Successfully
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Submitted employee details
        </p>
      </div>


      {/* ================= MODAL BODY ================= */}
      <div className="px-6 py-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

          {/* Full Name */}
          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.fullName || "-"}
            </p>
          </div>


          {/* MIS */}
          <div>
            <p className="text-sm text-gray-500">
              MIS
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.mis || "-"}
            </p>
          </div>


          {/* Iqama Number */}
          <div>
            <p className="text-sm text-gray-500">
              Iqama Number
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.iqamaNo || "-"}
            </p>
          </div>


          {/* Date of Birth */}
          <div>
            <p className="text-sm text-gray-500">
              Date of Birth
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.dateOfBirth || "-"}
            </p>
          </div>


          {/* Joining Date */}
          <div>
            <p className="text-sm text-gray-500">
              Joining Date
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.joiningDate || "-"}
            </p>
          </div>


          {/* Nationality */}
          <div>
            <p className="text-sm text-gray-500">
              Nationality
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.nationality || "-"}
            </p>
          </div>


          {/* Profession */}
          <div>
            <p className="text-sm text-gray-500">
              Profession
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.profession || "-"}
            </p>
          </div>


          {/* Work Location */}
          <div>
            <p className="text-sm text-gray-500">
              Work Location
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.workLocation || "-"}
            </p>
          </div>


          {/* Bank Name */}
          <div>
            <p className="text-sm text-gray-500">
              Bank Name
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.bankName || "-"}
            </p>
          </div>


          {/* Bank IBAN */}
          <div>
            <p className="text-sm text-gray-500">
              Bank IBAN
            </p>

            <p className="font-semibold text-gray-900 mt-1 break-all">
              {submittedData.bankIban || "-"}
            </p>
          </div>


          {/* Account Holder Name */}
          <div>
            <p className="text-sm text-gray-500">
              Account Holder Name
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.AccountHolderName || "-"}
            </p>
          </div>


          {/* Personal Email */}
          <div>
            <p className="text-sm text-gray-500">
              Personal Email
            </p>

            <p className="font-semibold text-gray-900 mt-1 break-all">
              {submittedData.personalEmail || "-"}
            </p>
          </div>


          {/* Absher Mobile */}
          <div>
            <p className="text-sm text-gray-500">
              Absher Mobile
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.absherMobile || "-"}
            </p>
          </div>


          {/* Basic Salary */}
          <div>
            <p className="text-sm text-gray-500">
              Basic Salary
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.basicSalary || "-"}
            </p>
          </div>


          {/* Accommodation / Transportation */}
          <div>
            <p className="text-sm text-gray-500">
              Accommodation / Transportation
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.accommodationTransportation || "-"}
            </p>
          </div>


          {/* Total Package */}
          <div>
            <p className="text-sm text-gray-500">
              Total Package
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.totalPackage || "-"}
            </p>
          </div>


          {/* Education */}
          <div>
            <p className="text-sm text-gray-500">
              Education
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {submittedData.education || "-"}
            </p>
          </div>

        </div>

      </div>


      {/* ================= MODAL FOOTER ================= */}
      <div className="border-t px-6 py-4 flex justify-end sticky bottom-0 bg-white">

        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            setSubmittedData(null);
          }}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}
```

      <div className="mx-auto max-w-6xl rounded-xl bg-white shadow-xl">
        <div className="rounded-t-xl bg-green-600 p-5">
          <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Employee Registration Form
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-8"
        >
          <Input label="Full Name" name="fullName" placeholder="Enter Full Name" value={formData.fullName} onChange={handleChange} pattern="[A-Za-z ]+" />
          <Input label="MIS" name="mis" placeholder="Km_XXXXX" value={formData.mis} onChange={handleChange} />
          <Input label="Iqama Number" type="number" name="iqamaNo" placeholder="26XXXXXXXX" value={formData.iqamaNo} onChange={handleChange} min={1} />
          <Input label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          <Input label="Joining Date" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />

          <Select label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange}
            options={["Pakistan","India","Bangladesh","Yemen","Sudan","Nigeria"]} />

          <Select label="Profession" name="profession" value={formData.profession} onChange={handleChange}
            options={[
              "DC Data Clerk",
              "DC Inventory Specialist",
              "Part-time - DC Picker & Sorter",
              "DC Picker & Sorter",
              "DC Inside Security",
              "DC Team Leader",
              "DC Forklift Driver",
              "PC Packer",
              "Part-time - DC Receiving and Returning",
              "DC Receiving and Returning",
              "Part-time - DC Inventory Assistant",
              "Part-time - PC Packer",
              "DC Materials Management",
            ]} />

          <Select label="Work Location" name="workLocation" value={formData.workLocation} onChange={handleChange}
            options={[
              "Jeddah0001 - Jeddah DC Warehouse 1 (Vault)",
              "Jeddah0001 - Jeddah DC Warehouse 3 (Akun)",
              "Jeddah001 - Jeddah China Harbour",
            ]} />

          <Input label="Bank IBAN Number (Optional)" name="bankIban" placeholder="SA24 XXXX XXXX XXXX XXXX XXXX
" required={false}
            value={formData.bankIban} onChange={handleChange} />

            <Input label="Bank Name (Optional)" name="bankName" placeholder="Bank Name
" required={false}
            value={formData.bankName} onChange={handleChange} />

            <Input label="Account Holder Names (Optional)" name="AccountHolderName" placeholder="Account Holder Name
" required={false}
            value={formData.AccountHolderName} onChange={handleChange} />

          <Input label="Personal Email" type="email" name="personalEmail" placeholder="example@gmail.com"
            value={formData.personalEmail} onChange={handleChange} />

          <Input label="Absher Mobile Number" type="tel" name="absherMobile" placeholder="05XXXXXXXX"
            pattern="[0-9]{10}" value={formData.absherMobile} onChange={handleChange} />

          <Select label="Basic Salary" name="basicSalary" value={formData.basicSalary} onChange={handleChange}
            options={["1300","1800","2000","2300","3000"]} />

          <Select label="Accommodation & Transportation" name="accommodationTransportation"
            value={formData.accommodationTransportation} onChange={handleChange}
            options={["700"]} />

          <Select label="Total Package" name="totalPackage" value={formData.totalPackage}
            onChange={handleChange}
            options={["2000","2500","2700","3000","3700"]} />

          <Select label="Education" name="education" value={formData.education} onChange={handleChange}
            options={["Non","Matric","Intermediate","Graduate","Master"]} />

          <div className="md:col-span-2">
           <button
  type="submit"
  disabled={Employeeloading}
  className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
    Employeeloading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-700 hover:bg-green-800"
  }`}
>
  {Employeeloading ? (
    <span className="flex items-center justify-center gap-2">
      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Saving...
    </span>
  ) : (
    "Save Employee"
  )}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({label,type="text",name,value,onChange,placeholder="",required=true,min,pattern}) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-700">{label}</label>
      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        pattern={pattern}
      />
    </div>
  );
}

function Select({label,name,value,onChange,options}) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-700">{label}</label>
      <select
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Select {label}</option>
        {options.map((item)=>(
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default EmployeesForm;
