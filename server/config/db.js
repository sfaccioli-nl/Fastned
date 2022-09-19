import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${connection.connection.host}: ${connection.connection.port}`;

    console.log(`MongoDB connected: ${url}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
