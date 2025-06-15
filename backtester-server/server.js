const app = require("./app");
const { createConnectionWithDb, closeConnectionWithDb } = require("./db/db");
const { PORT } = process.env;

const startUpServer = async () => {
  try {
    console.log("Starting up server...");
    await createConnectionWithDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    shutDownServer();
  }
};

const shutDownServer = async () => {
    await closeConnectionWithDb();
    console.log("Server shut down gracefully");
    process.exit(0);
}

process.on("SIGINT", shutDownServer);

startUpServer().catch((error) => {
  console.error("Error starting server:", error);
  shutDownServer();
});