import express from 'express';
import cors from 'cors';
import EmployeeRouter from './routes/employeeRoutes.js';


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

export default app;
