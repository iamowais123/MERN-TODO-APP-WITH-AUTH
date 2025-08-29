import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb://admin:admin@localhost:27017/todoApp?authSource=admin"
    );
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
