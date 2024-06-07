import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/user"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne(
                        {
                            $or: [
                                { email: credentials.identifire },
                                { username: credentials.identifire }
                            ]
                        }
                    )
                    if (!user) {
                        throw new Error("No user found this")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account first, brfore login")
                    }
                    const passwordIsCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (passwordIsCorrect) {
                        return user
                    } else {
                        throw new Error("invalid password")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user?.isVerified;
                token.isAcceptingMessage = user?.isAcceptingMessage;
                token.username = user?.username
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id?.toString();
                session.user.isVerified = token?.isVerified;
                session.user.isAcceptingMessage = token?.isAcceptingMessage;
                session.user.username = token?.username
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}