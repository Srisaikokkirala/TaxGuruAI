const { clerkClient } = require("@clerk/express");
const User = require("../models/User");

async function authenticateToken(req, res, next) {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Access token is missing or invalid." });
    }

    const clerkUserId = req.auth.userId;

    // Find the user in our local DB by clerkUserId
    let user = await User.findOne({ clerkUserId });

    if (!user) {
      console.log(`Syncing new Clerk user to local DB: ${clerkUserId}`);
      try {
        const clerkUser = await clerkClient.users.getUser(clerkUserId);
        const rawPhone = clerkUser.phoneNumbers?.[0]?.phoneNumber;
        const phoneNumber = rawPhone && rawPhone.trim() !== "" ? rawPhone.trim() : undefined;
        const username = clerkUser.username || phoneNumber || clerkUserId;
        const displayName = clerkUser.firstName 
          ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim() 
          : username;
 
        user = await User.create({
          clerkUserId,
          phoneNumber,
          username,
          displayName,
          provider: "clerk",
        });
      } catch (clerkError) {
        console.error("Failed to fetch user from Clerk API:", clerkError.message);
        // Fallback: create a user with minimal details
        user = await User.create({
          clerkUserId,
          phoneNumber: undefined,
          username: clerkUserId,
          displayName: "TaxGuru User",
          provider: "clerk",
        });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Clerk auth middleware error:", error.message);
    return res.status(403).json({ message: "Invalid or expired session. Please log in again." });
  }
}

module.exports = authenticateToken;
