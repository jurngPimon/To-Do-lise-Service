const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json"); // Path to your Firebase service account JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjNjI2MmYzZTk3NzIzOWMwMDUzY2ViODY0Yjc3NDBmZjMxZmNkY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG9kby1saXN0LXNlcnZpY2VzLTk4MmJkIiwiYXVkIjoidG9kby1saXN0LXNlcnZpY2VzLTk4MmJkIiwiYXV0aF90aW1lIjoxNzQwNTAzNjM4LCJ1c2VyX2lkIjoiSjZNMWZPUGxsYmZ1TzJLeEtWc2k3MnJZTmUwMiIsInN1YiI6Iko2TTFmT1BsbGJmdU8yS3hLVnNpNzJyWU5lMDIiLCJpYXQiOjE3NDA1MDM2MzgsImV4cCI6MTc0MDUwNzIzOCwiZW1haWwiOiJqdXJuZzk4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqdXJuZzk4QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.JrrwXPnMsYrbdZgjjqBDKufZUJNQj_0Gpq37wdcb8EtT44UkFxSP5r-ltiV8ICk-ubimn2BmcyETzgVFkQ5D9WFxMn5aHr2NmnxikJ-21T_-CfIeIfxaSLiX7eY2qvYFi3wVg3zIIzOWKPmrI0WkT_-2NrvaN8EDEWajj6-XFskg51C6qkwAvwNhRLQKbxV1uIWiypWHSeJEpzvI79rlJQlPI_SotKLYvpNhzQCdoKVV3pTMI0Bpa3uEuuzVOYFAGBw3g91AvasmNmndUTcdHijlq4jOIsjMGhvp5tFJoyGygf8SFfV2wxyGZ8Lx8zmNn2maQl7etkYJTgl5V8Hcrg"

admin.auth()
  .verifyIdToken(token)
  .then((decodedToken) => {
    console.log("✅ Token is valid:", decodedToken);
  })
  .catch((error) => {
    console.error("❌ Token is invalid:", error);
  });
