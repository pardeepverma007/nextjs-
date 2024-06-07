import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json()

        const decodedUserName = decodeURIComponent(username);

        const user = await UserModel.findOne({
            username: decodedUserName
        })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User Not found'
                },
                { status: 400 }
            )
        }

        const isCodeValid = user.code == code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            user.save()
            return Response.json(
                {
                    success: true,
                    message: 'User Verified!'
                },
                { status: 200 }
            )
        } else if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: true,
                    message: 'Code is Expied please signup again!'
                },
                { status: 200 }
            )
        } else {
            return Response.json(
                {
                    success: true,
                    message: 'invalid verification code!'
                },
                { status: 200 }
            )
        }

    } catch (error) {
        console.log("Error while verify CodeS");
        return Response.json(
            {
                success: false,
                message: 'Error when verify code'
            },
            { status: 500 }
        )
    }
}