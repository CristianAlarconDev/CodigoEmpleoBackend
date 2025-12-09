import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB Conectado exitosamente");
    } catch (error) {
        console.error(" Error de conexión a MongoDB:", error);
        process.exit(1); // Detengo todo por ahora si falla pero deberia tener una db local de respaldo
    }
};

export default connectDB;