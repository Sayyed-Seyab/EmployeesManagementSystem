import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createAccount,
  getAllAccounts,
} from '../controllers/employeeController.js';

const EmployeeRouter = express.Router();

EmployeeRouter.post('/account', createAccount);
EmployeeRouter.get('/accounts', getAllAccounts);
EmployeeRouter.get('/', getEmployees);
EmployeeRouter.post('/', createEmployee);
EmployeeRouter.get('/:id', getEmployeeById);
EmployeeRouter.put('/:id', updateEmployee);
EmployeeRouter.delete('/:id', deleteEmployee);




export default EmployeeRouter;
