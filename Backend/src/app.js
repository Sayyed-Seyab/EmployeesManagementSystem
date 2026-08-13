import express from 'express';
import cors from 'cors';
import EmployeeRouter from './routes/employeeRoutes.js';
import path from "path";


const app = express();

app.use(cors());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://employees-management-system-65e3.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//always add image path to the top not in the bottom of the code
//because request will be caches my middlewear 
app.use("/Images", express.static("Uploads"));
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/employees', EmployeeRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});



// app.use(
//   "/uploads",
//   express.static(path.join(process.cwd(), "Uploads"))
// );


export default app;
