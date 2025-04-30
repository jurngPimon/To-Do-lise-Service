const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function getIdToken() {
  try {
    // Use an existing Firebase UID (from Firebase Console > Authentication)
    const uid = "J6M1fOPllbfuO2KxKVsi72rYNe02";

    // Generate a custom token (temporary authentication)
    const customToken = await admin.auth().createCustomToken(uid);
    console.log("Custom Token:", customToken);

    // Sign in with the Custom Token to get a valid ID Token
    const fetch = require("node-fetch");
    const apiKey = "AIzaSyBJtvYmxkpzc5-ypK0CfcvjW_wFiEsNL9w"; // Get this from Firebase Console > Project Settings
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;

    const response = await fetch(signInUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: customToken, returnSecureToken: true }),
    });

    const data = await response.json();

    if (data.idToken) {
      console.log("✅ Firebase ID Token:", data.idToken);
    } else {
      console.error("❌ Error getting ID token:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getIdToken();
