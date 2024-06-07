import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";
import { z } from "zod";

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "not Authenticated"
            },
            {
                status: 401
            }
        )
    }
    //for aggrigatin we need to get maongooes object id so we need to convert user if into object id 
    const userId = new mongoose.Types.ObjectId(user._id) // convert into object id if user.id is string
    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])
        if (!user || user.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User not Found"
                },
                {
                    status: 400
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: user[0].messages
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log("Faild to get messages", error)
        return Response.json(
            {
                success: false,
                message: "Faild to get messages"
            },
            {
                status: 500
            }
        )
    }
}