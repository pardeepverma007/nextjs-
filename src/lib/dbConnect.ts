import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Data Base is Already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODBURI || "", {})
        connection.isConnected = db.connections[0].readyState;

        console.log("DB is Connected Successfully")

    } catch (erro) {
        console.log("Data Base connection faild", erro)
        process.exit(1);
    }
}

export default dbConnect