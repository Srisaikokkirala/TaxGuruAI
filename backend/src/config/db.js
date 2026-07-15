const mongoose = require("mongoose");

async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);

  // Drop old non-sparse index so Mongoose can rebuild it with sparse: true
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: "users" }).toArray();
    if (collections.length > 0) {
      const indexes = await db.collection("users").indexes();
      const hasEmailIndex = indexes.some((idx) => idx.name === "email_1");
      if (hasEmailIndex) {
        await db.collection("users").dropIndex("email_1");
        console.log("Legacy email_1 index dropped to allow sparse rebuild.");
      }
      const hasPhoneIndex = indexes.some((idx) => idx.name === "phoneNumber_1");
      if (hasPhoneIndex) {
        await db.collection("users").dropIndex("phoneNumber_1");
        console.log("Legacy phoneNumber_1 index dropped to allow non-unique rebuild.");
      }
    }
  } catch (err) {
    console.warn("Could not drop legacy email index:", err.message);
  }

  return mongoose.connection;
}

module.exports = { connectDatabase };
