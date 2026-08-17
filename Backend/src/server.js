import app from "./app.js";
import Db from "./config/db.js";

const PORT = process.env.PORT || 5000;
 
// this page is used as a server
const startServer = async () => {
  try {
    await Db();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();