import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AccountDetails() {
  const [formData, setFormData] = useState({
    mis: "",
    AccountNo: "",
    AccountHolderName: "",
    ContactNO: "",
    workLocation:"",
      BankName: "",
  });
// Store submitted data for modal
 const [submittedData, setSubmittedData] = useState(null);
 
 // Modal state
  const [showModal, setShowModal] = useState(false);
  //loader
  const [loading, setLoading] = useState(false);
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    console.log(formData)
  },[formData])

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

   // Contact Number
  if (!formData.workLocation.trim())
    return toast.error("Work Location is required.");


   // Contact Number
  if (!formData.BankName.trim())
    return toast.error("Bank Name is required.");


  // Saudi Mobile Number (05XXXXXXXX)
  if (!/^05\d{8}$/.test(formData.ContactNO))
    return toast.error(
      "Enter a valid Saudi mobile number (e.g. 05XXXXXXXX)."
    );
  

  try {
     setLoading(true);
   const response =  await axios.post(
      "https://employeesmanagementsystem-1.onrender.com/api/employees/account",
      payload
    );
console.log(response)
    if(response.status === 201) {
      setLoading(false);
       toast.success("Account saved successfully.");

      // Save submitted data for modal 
      setSubmittedData(payload);
       // Show success modal 
       setShowModal(true);
       setFormData({
      mis: "",
      AccountNo: "",
      AccountHolderName: "",
      ContactNO: "",
      workLocation:"",
      BankName:"",
    });
    }

   
    

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong."
    );
    console.log(error);
  }finally {
  setLoading(false);
}
};

  return (
    <div className="flex justify-center mt-8">
    {/* ================= SUCCESS MODAL ================= */}
     {showModal && submittedData && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"> 
       <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl"> {/* Modal Header */} 
        <div className="px-6 py-4"> 
          <h2 className="text-xl font-bold text-green-700"> Account Saved Successfully </h2>
           <p className="text-gray-500 text-sm mt-1"> Submitted employee account details </p>
            </div>
             {/* Modal Body */} 
             <div className="px-6 py-5 space-y-4"> {/* MIS */} 
              <div className="flex justify-between "> 
                <span className="font-medium text-gray-600"> MIS </span> 
                <span className="font-semibold text-gray-900"> {submittedData.mis} </span> 
                </div> 
                {/* Account Number */}
                 <div className="flex justify-between ">
                   <span className="font-medium text-gray-600"> Account Number </span> 
                   <span className="font-semibold text-gray-900 break-all text-right"> {submittedData.AccountNo} </span>
                    </div> 
                    {/* Account Holder */} 
                    <div className="flex justify-between ">
                       <span className="font-medium text-gray-600"> Account Holder Name </span>
                        <span className="font-semibold text-gray-900"> {submittedData.AccountHolderName} </span> 
                        </div> 
                        {/* Contact Number */} 
                        <div className="flex justify-between "> 
                          <span className="font-medium text-gray-600"> Contact Number </span>
                           <span className="font-semibold text-gray-900"> {submittedData.ContactNO} </span> 
                           </div> 
                           {/* Work Location */}
                            <div className="flex justify-between "> 
                            <span className="font-medium text-gray-600"> Work Location </span> 
                            <span className="font-semibold text-gray-900"> {submittedData.workLocation} </span>
                             </div> 
                             {/* Bank Name */}
                               <div className="flex justify-between "> 
                                <span className="font-medium text-gray-600"> Bank Name </span> 
                            <span className="font-semibold text-gray-900"> {submittedData.BankName} </span>
                            </div>
                             </div> {/* Modal Footer */}
                              <div className=" px-6 py-4 flex justify-end"> 
                                <button
                                 type="button" 
                                 onClick={() => { setShowModal(false); setSubmittedData(null); }}
                                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition" >
                                     Submit </button> 
                                     </div> 
                                     </div> 
                                     </div>
                                     )}
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
              required = {true}
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
               required = {true}
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

<div>
  <label className="block mb-2 font-medium">
    Bank Name
  </label>

  <select
  name="BankName"
  value={formData.BankName}
  onChange={handleChange}
  className="w-full border rounded-lg px-4 py-3 bg-white outline-none transition duration-300 hover:bg-green-100 focus:ring-2 focus:ring-green-500"
>
  <option value="">Select Bank Name</option>
  <option value="Al-Rajhi">Al-Rajhi</option>
  <option value="AlBilad Bank">AlBilad Bank</option>
  <option value="Allnma Bank ">Allnma Bank </option>
  <option value="Arab National Bank">Arab National Bank</option>
  <option value="Bank AlJazira">Bank AlJazira</option>
  <option value="Banque Saudi Fransi">Banque Saudi Fransi</option>
  <option value="Emirates Bank">Emirates Bank</option>
  <option value="Gulf International Bank">Gulf International Bank</option>
  <option value="Riyadh Bank">Riyadh Bank</option>
  <option value="STC Bank">STC Bank</option>
  <option value="Saudi Awwal Bank">Saudi Awwal Bank</option>
 


</select>
</div>

         {/* Submit Button */}
<button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
    loading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-700 hover:bg-green-800"
  }`}
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Saving...
    </span>
  ) : (
    "Save Account"
  )}
</button>

        </form>
      </div>
    </div>
  );
}