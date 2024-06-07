import { resend } from '@/lib/resend';
import VerificationMail from '../../emails/verificationMail'
import { ApiResponse } from '@/types/apiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const aarajju = await resend.emails.send({
            from: 'Pardeep <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code',
            react: VerificationMail({ username, otp: verifyCode }),
        });

        return ({ success: true, message: "Verification Email Successfully" })
    } catch (error) {
        console.error("Verification Email Error", error);
        return ({ success: false, message: "Failed to Send Verification email" })
    }
}