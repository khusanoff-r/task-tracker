import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch {
    console.error("Server startup aborted because database is unavailable.");
    process.exit(1);
  }
};

startServer();
