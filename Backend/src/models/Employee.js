import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, trim: true },
    institution: { type: String, trim: true },
    fieldOfStudy: { type: String, trim: true },
    graduationYear: { type: Number, min: 1900, max: 2100 },
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    mis: {
      type: String,
      required: [true, 'MIS is required'],
    },
    iqamaNo: {
      type: String,
      required: [true, 'Iqama number is required'],
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    joiningDate: {
      type: Date,
      required: [true, 'Joining date is required'],
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true,
    },
    profession: {
      type: String,
      required: [true, 'Profession is required'],
      trim: true,
    },
    workLocation: {
      type: String,
      required: [true, 'Work location is required'],
      trim: true,
    },
    bankIban: {
      type: String,
      
    },
     bankName: {
      type: String,
      
    },
     AccountHolderName: {
      type: String,
      
    },
    personalEmail: {
      type: String,
      required: [true, 'Personal email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    absherMobile: {
      type: String,
      required: [true, 'Absher mobile number is required'],
      trim: true,
    },
    basicSalary: {
      type: Number,
      required: [true, 'Basic salary is required'],
      min: [0, 'Basic salary cannot be negative'],
    },
    accommodationTransportation: {
      type: Number,
      default: 0,
      min: [0, 'Accommodation and Transportation allowance cannot be negative'],
    },
   
    otherAllowances: {
      type: Number,
      default: 0,
      min: [0, 'Other allowances cannot be negative'],
    },
    totalPackage: {
      type: Number,
      min: [0, 'Total package cannot be negative'],
    },
    education: {
      type: String,
      required: [true, 'Education is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);



const EmployeesSchema = mongoose.model.Employees || mongoose.model('Employees', employeeSchema);
export default EmployeesSchema;
