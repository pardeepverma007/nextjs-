import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";



export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions) // GET logdin user 
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "not Authenticated"
            },
            {
                status: 400
            }
        )
    }
    const userId = user._id
    const { acceptMessages } = await request.json();
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "fail to update user status to accept messges",
                    updatedUser
                },
                {
                    status: 401
                }
            )
        } else {
            return Response.json(
                {
                    success: true,
                    message: "update user status"
                },
                {
                    status: 200
                }
            )
        }
    } catch (error) {
        console.log("Accept message Error", error);
        return Response.json(
            {
                success: false,
                message: "Accept message Error"
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions) // GET logdin user 
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "not Authenticated"
            },
            {
                status: 400
            }
        )
    }
    const userId = user._id
    try {
        const foundUser = await UserModel.findOne({ userId })
        if (!foundUser) {
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
                isAcceptingMessage: foundUser.isAcceptingMessage
            },
            {
                status:200
            }
        )
    } catch (error) {
        console.log("Accept message Error", error);
        return Response.json(
            {
                success: false,
                message: "Accept message Error"
            },
            {
                status: 500
            }
        )
    }
}