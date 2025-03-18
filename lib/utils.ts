"use server"
import mongoose from "mongoose"

interface Connection {
    isConnected: boolean;
}

const connection: Connection = {
    isConnected: false 
};

export const connectToDb = async (): Promise<void> => {
    try {
        if (connection.isConnected) {
            return
        }
        const db = await mongoose.connect(process.env.MONGO_URI!)
        connection.isConnected = db.connections[0].readyState === 1
        console.log(connection)
    } catch (error: any) {
        console.log(error)
        throw new Error("Error connecting to database")
    }
}