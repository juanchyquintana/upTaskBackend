import mongoose from "mongoose";
import colors from "colors";
import { exit } from 'node:process'

export const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log(colors.magenta.bold(`Database Connect in: ${url}.`))
    } catch (error) {
        console.log(colors.bgRed("Error to connect with MongoDB."));
        exit(1);
    }
}