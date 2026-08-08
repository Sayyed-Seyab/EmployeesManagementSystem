import mongoose from "mongoose";



const Account = new mongoose.Schema(
  {
    mis: {
      type: String,
      required: [true, 'Mis is required'],
     unique: true,
    },
    AccountNo: {
      type: String,
      required: [true, 'Account is required'],
    },
    AccountHolderName: {
      type: String,
      required: [true, 'Bank Holder Name is required'],
        unique: false,
    },
    ContactNO: {
      type: Number,
      required: [true, 'Contact No is required'],
       unique: true,
    },
     workLocation: {
      type: String,
      required: [true, 'Wrok Location is required'],
    },
   
  },
  {
    timestamps: true,
  }
);



const AccountSchema = mongoose.models.Account || mongoose.model("Account", Account);

export default AccountSchema;
