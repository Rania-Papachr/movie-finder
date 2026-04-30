import app from "./app";
import { initDB } from "./db/init";

const PORT = 5000;

initDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
