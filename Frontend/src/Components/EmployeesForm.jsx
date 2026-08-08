import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EmployeesForm() {
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
    console.log(formData)

    if (!/^[A-Za-z ]+$/.test(formData.fullName.trim())) {
      return alert("Full Name should contain letters only.");
    }

    if (Number(formData.iqamaNo) < 0) {
      return alert("Iqama Number must be greater than zero.");
    }

    if (!/^\d{10}$/.test(formData.absherMobile)) {
      return alert("Absher Mobile Number must contain exactly 10 digits.");
    }

    try {
      const response = await axios.post(
    "http://localhost:5000/api/employees",
    formData
  );

  if (response.data.success) {
    toast.success(response.data.message);

    console.log(response.data.message);

    setFormData(initialData);
  }

  console.log(response);
      
    } catch (error) {
   toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">
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
              className="mt-5 px-8 py-3 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold"
            >
              Save Employee
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
