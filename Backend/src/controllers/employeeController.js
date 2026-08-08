import AccountSchema from '../models/Account.js';
import EmployeesSchema from '../models/Employee.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeesSchema.find();
    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeesSchema.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    console.log(req.body)
    const {
      fullName,
      mis,
      iqamaNo,
      dateOfBirth,
      joiningDate,
      nationality,
      profession,
      workLocation,
      bankIban,
      bankName,
      AccountHolderName,
      personalEmail,
      absherMobile,
      basicSalary,
      housing,
      transportation,
      otherAllowances,
      totalPackage,
      education,
    } = req.body;
    console.log(req.body)
    

    const employee = new EmployeesSchema({
      fullName,
      mis,
      iqamaNo,
      dateOfBirth,
      joiningDate,
      nationality,
      profession,
      workLocation,
      bankIban,
      bankName,
      AccountHolderName,
      personalEmail,
      absherMobile,
      basicSalary,
      accommodationTransportation,
      otherAllowances,
      totalPackage,
      education,
    });

      const savedEmployee = await employee.save();

    return res.status(201).json({
      success: true,
      message: "Employee data submited successfully",
      data: savedEmployee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An employee with this Iqama number already exists',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const {
      fullName,
      iqamaNo,
      dateOfBirth,
      joiningDate,
      nationality,
      profession,
      workLocation,
      bankIban,
      personalEmail,
      absherMobile,
      basicSalary,
      housing,
      transportation,
      otherAllowances,
      totalPackage,
      education,
    } = req.body;

    const employee = await EmployeesSchema.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        iqamaNo,
        dateOfBirth,
        joiningDate,
        nationality,
        profession,
        workLocation,
        bankIban,
        personalEmail,
        absherMobile,
        basicSalary,
        housing,
        transportation,
        otherAllowances,
        totalPackage,
        education,
      },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An employee with this Iqama number already exists',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await EmployeesSchema.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const createAccount = async (req, res) => {
  try {
    const {
      mis,
      AccountNo,
      AccountHolderName,
      ContactNO,
      workLocation,
    } = req.body;

    // Validation
    if (!mis || !AccountNo || !AccountHolderName || !ContactNO || !workLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

     const existingMIS = await AccountSchema.findOne({
      mis,
    });

    if (existingMIS) {
      return res.status(409).json({
        success: false,
        message: "MIS already exists.",
      });
    }

    // Check duplicate Contact NO
    const existingNumber = await AccountSchema.findOne({
      ContactNO,
    });


    if (existingNumber) {
      return res.status(409).json({
        success: false,
        message: "Contact No already exists.",
      });
    }

    // Create Account
    const account = await AccountSchema.create({
      mis,
      AccountNo,
      AccountHolderName,
      ContactNO,
      workLocation,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      account,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


// Get All Accounts
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await AccountSchema.find();

    return res.status(200).json({
      success: true,
      // count: accounts.length,
       account: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};