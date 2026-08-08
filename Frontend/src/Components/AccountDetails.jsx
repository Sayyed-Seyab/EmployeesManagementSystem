import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AccountDetails() {
  const [formData, setFormData] = useState({
    mis: "",
    AccountNo: "",
    AccountHolderName: "",
    ContactNO: "",
    workLocation:"",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
  ...formData,
  AccountNo: `SA${formData.AccountNo}`,
};

  // MIS
  if (!formData.mis.trim())
    return toast.error("MIS is required.");

  // Account Holder Name
  if (!formData.AccountHolderName.trim())
    return toast.error("Account Holder Name is required.");

  // Account Number
  if (!formData.AccountNo.trim())
    return toast.error("Account Number is required.");

  if (!/^Km_.+/i.test(formData.mis.trim()))
  return toast.error("MIS must start with Km_.");

  // Numbers only
  if (!/^\d+$/.test(formData.AccountNo))
    return toast.error("Account Number must contain only numbers.");

  if (!formData.workLocation)
  return toast.error("Work Location is required.");

  // Exactly 22 digits (remove this if you don't require exactly 22)
  if (formData.AccountNo.length !== 22)
    return toast.error("Account Number must be exactly 22 digits.");

  // Contact Number
  if (!formData.ContactNO.trim())
    return toast.error("Contact Number is required.");

  // Saudi Mobile Number (05XXXXXXXX)
  if (!/^05\d{8}$/.test(formData.ContactNO))
    return toast.error(
      "Enter a valid Saudi mobile number (e.g. 05XXXXXXXX)."
    );

  try {
    await axios.post(
      "https://employeesmanagementsystem-1.onrender.com/api/employees/account",
      payload
    );

    toast.success("Account saved successfully.");

    setFormData({
      mis: "",
      AccountNo: "",
      AccountHolderName: "",
      ContactNO: "",
      workLocation:"",
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong."
    );
    console.log(error);
  }
};

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Salary Account Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* MIS */}
          <div>
            <label className="block mb-2 font-medium">
              MIS
            </label>

            <input
              type="text"
              name="mis"
              value={formData.mis}
              onChange={handleChange}
              placeholder="KM_XXXXX"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block mb-2 font-medium">
              Account Number
            </label>

            <input
              type="text"
              name="AccountNo"
              value={formData.AccountNo}
              onChange={handleChange}
              placeholder="SA67 XXXX XXXX XXXX XXXX XXXX"
              maxLength={22}
              inputMode="numeric"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 22);
              }}
            />
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block mb-2 font-medium">
              Account Holder Name
            </label>

            <input
              type="text"
              name="AccountHolderName"
              value={formData.AccountHolderName}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-2 font-medium">
              Contact Number
            </label>

            <input
              type="text"
              name="ContactNO"
              value={formData.ContactNO}
              onChange={handleChange}
              placeholder="05XXXXXXXX"
              maxLength={10}
              inputMode="numeric"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
              }}
            />
          </div>

          {/* Work Location */}
<div>
  <label className="block mb-2 font-medium">
    Work Location
  </label>

  <select
  name="workLocation"
  value={formData.workLocation}
  onChange={handleChange}
  className="w-full border rounded-lg px-4 py-3 bg-white outline-none transition duration-300 hover:bg-green-100 focus:ring-2 focus:ring-green-500"
>
  <option value="">Select Work Location</option>
  <option value="Riyadh">Riyadh</option>
  <option value="Jeddah">Jeddah</option>
</select>
</div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Save Account
          </button>

        </form>
      </div>
    </div>
  );
}