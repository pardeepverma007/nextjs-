import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import Message from "@/model/user";



export async function POST(request: Request) {
    await dbConnect();
    const { username, content } = await request.json();
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
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
        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "User not Accept message"
                },
                {
                    status: 403
                }
            )
        }
        const newMessages = { content, createdAt: new Date() }

        user.messages.push(newMessages)
        await user.save();
        return Response.json(
            {
                success: true,
                message: "Send Message Successfully"
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log("Faild to send messages", error)
        return Response.json(
            {
                success: false,
                message: "Faild to Send Message"
            },
            {
                status: 500
            }
        )
    }
}