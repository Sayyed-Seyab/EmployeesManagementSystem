import express from 'express';
import multer from "multer";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createAccount,
  getAllAccounts,
  dltAccount,
} from '../controllers/employeeController.js';


const EmployeeRouter = express.Router();

//Image storege engine
// const AccountStorage = multer.diskStorage({
//     destination: 'Uploads/accounts',
//     filename:(req, file, cb)=>{
//         const sanitizedFileName = file.originalname.replace(/\s+/g, "-"); // Replace spaces with dashes
//         cb(null, `${Date.now()}-${sanitizedFileName}`);
      
//     }
// })
// const Upload = multer({storage: AccountStorage})

const Upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});


EmployeeRouter.post('/account', Upload.single('accountImage'), createAccount);
EmployeeRouter.get('/accounts', getAllAccounts);
EmployeeRouter.delete('/account/:id', dltAccount);
EmployeeRouter.get('/', getEmployees);
EmployeeRouter.post('/', createEmployee);
EmployeeRouter.get('/:id', getEmployeeById);
EmployeeRouter.put('/:id', updateEmployee);
EmployeeRouter.delete('/:id', deleteEmployee);




export default EmployeeRouter;
