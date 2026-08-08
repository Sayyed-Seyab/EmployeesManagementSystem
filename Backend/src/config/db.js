import mongoose from "mongoose";

const Db = () => {
  return mongoose
    .connect('mongodb+srv://admin2:admin2@Cluster0.uaxmezr.mongodb.net/SrzEmployees?')
    .then(() => {
      console.log('Database is connected');
    })
    .catch((err) => {
      console.log('There is problem while connecting database' + err);
      process.exit(1);
    });
};

export default  Db;
