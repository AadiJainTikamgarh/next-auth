import mongoose from "mongoose";

export default async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongodb connected successfully");
    });

    connection.on("error", (err) => {
      console.error("Mongodb connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
