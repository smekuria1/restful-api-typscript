export default {
  privateKey: process.env.PRIVATE_KEY || "",
  publicKey: process.env.PUBLIC_KEY || "",
  dbUri: process.env.DB_CONNECTION,
  port: process.env.PORT,
};
