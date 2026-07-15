require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    try {
      await connectDatabase(process.env.MONGODB_URI);
      console.log("Connected to primary MongoDB.");
    } catch (dbError) {
      console.warn("Failed to connect to primary DB, falling back to local DB:", dbError.message);
      await connectDatabase("mongodb://127.0.0.1:27017/taxguru_ai");
      console.log("Connected to fallback local MongoDB.");
    }

    app.listen(PORT, () => {
      console.log(`TaxGuru AI backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
