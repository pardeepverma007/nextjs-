import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from 'zod'
import { usernameValidation } from "@/scehmas/signUpSchema";
import { domainToUnicode } from "url";


const usernameSignuSchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }
        //validate with zod
        const result = usernameSignuSchema.safeParse(queryParams);
        console.log("from check unique name", result);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            console.log("usernameErrors from check unique name", usernameErrors)
            return Response.json(
                {
                    success: false,
                    message: "invalid quary parameters"
                },
                {
                    status: 400
                }
            )
        }

        const { username } = result.data
        const existusername = await UserModel.findOne({ username, isVerified: true });

        if (existusername) {
            return Response.json(
                {
                    success: false,
                    message: "username is already taken"
                },
                {
                    status: 400
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "username is unique"
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log("Error Checking Username", error)
        return Response.json(
            {
                success: false,
                message: "Error Checking Username"
            },
            {
                status: 500
            }
        )
    }
}