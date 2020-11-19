const admin = require("firebase-admin");

const serviceAccount = require("../../sls/env/serviceAccountKey.json");
const registrationToken = process.env.TEST_DEVICE_REGISTRATION_KEY;

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export const handler = async (event) => {
  const { title, body } = JSON.parse(event.body);

  const message = { notification: { title, body }, token: registrationToken };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return {
      statusCode: 200,
      body: `Successfully sent message ${response}`,
    };
  } catch (error) {
    console.log("Error sending message:", error);
    return {
      statusCode: 400,
      body: `Error sending message: ${error}`,
    };
  }
};
