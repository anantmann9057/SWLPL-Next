import mongoose, { connection } from "mongoose";

export async function Connect() {
  try {
    mongoose.connect(process.env.DB_URL);
    const conection = mongoose.connection;
    connection.on("connected", () => {
      console.log("db connected successfully!");
    });

    connection.on("error", (error) => {
      console.log("error connecting mongodb!" + error);
      process.exit();
    });
  } catch (error) {
    console.log(e);
  }
}
