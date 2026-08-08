import app from './app.js';
import Db from './config/db.js';

const PORT = process.env.PORT || 5000;

Db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
