require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`TaxGuru AI backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
