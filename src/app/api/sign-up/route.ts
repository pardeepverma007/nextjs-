import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, username, password } = await request.json();
        const exisitingUserVerifiedByUserName = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (exisitingUserVerifiedByUserName) {
            return Response.json(
                { success: false, message: 'user name is already taken' }
            )
        }
        const exisitingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (exisitingUserByEmail) {
            if (exisitingUserByEmail.isVerified) {
                return Response.json(
                    { success: false, message: 'User with this email is already registred' },
                    { status: 400 }
                )
            } else {
                const hashPassword = await bcrypt.hash(password, 10);
                const expiryDate = new Date(Date.now() + 3600000)
                exisitingUserByEmail.password = hashPassword
                exisitingUserByEmail.verifyCode = verifyCode
                exisitingUserByEmail.verifyCodeExpiry = expiryDate
                await exisitingUserByEmail.save();
                return Response.json(
                    { success: false, message: 'User with this email is already registred' },
                    { status: 400 }
                )
            }

        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel(
                {
                    username,
                    email,
                    password: hashPassword,
                    verifyCode: verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerified: false,
                    isAcceptingMessage: true,
                    messages: []
                }
            )
            await newUser.save()
            //send verification Mail
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if (!emailResponse.success) {
                return Response.json(
                    { success: false, message: emailResponse.message || 'Error Registring user' },
                    { status: 500 }
                )
            }
            return Response.json(
                { success: true, message: 'User registred successfully. Please Verify your email' },
                { status: 201 }
            )
        }
    } catch (error) {
        console.log("Error Registring User", error)
        return Response.json(
            { success: false, message: 'Error Registring user' },
            { status: 500 }
        )
    }
}