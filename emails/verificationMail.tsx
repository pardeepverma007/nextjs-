import * as React from 'react';
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button, Link } from "@react-email/components";


interface VerificationMailProps {
    username: string,
    otp: string
}
export default function VerificationMail({ username, otp }: VerificationMailProps) {
    return (
        <Html lang="en">
            <Head>
                <title>Verification Code</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                    fontStyle="normal"
                />
                <style>
                    {`
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        font-family: 'Roboto', sans-serif;
                    }
                    .heading {
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    .text {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 20px;
                    }
                    .otp {
                        font-size: 28px;
                        font-weight: bold;
                        color: #000;
                        margin: 20px 0;
                    }
                    .footer {
                        margin-top: 40px;
                        font-size: 14px;
                        color: #888;
                    }
                    .footer a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    .footer a:hover {
                        text-decoration: underline;
                    }
                `}
                </style>
            </Head>
            <Preview>Here is Your Verification Code {otp}</Preview>
            <body>
                <div className="container">
                    <Section>
                        <Row>
                            <Heading className="heading">Hello {username},</Heading>
                        </Row>
                        <Row>
                            <Text className="text">
                                Thank you for registering. Please use the following verification code:
                            </Text>
                        </Row>
                        <Row>
                            <div className="otp">{otp}</div>
                        </Row>
                        <Row>
                            <Text className="text">
                                If you did not request this code, please ignore this email or contact our support team.
                            </Text>
                        </Row>
                    </Section>
                    <Section className="footer">
                        <Row>
                            <Text>
                                Best regards,<br />
                                team <a href="https://pardeepcv.vercel.app/">@Pardeep Choudhary</a>
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                <a href="https://www.youtube.com/@pardeep_choudhary_2211">YouTube Channel</a> |
                                <a href="mailto:pardeepkumawat139.com">Email</a> |
                                <a href="tel:+917340730710">Mobile: +917340730710</a> |
                                <a href="https://pardeepcv.vercel.app/">Portfolio</a>
                            </Text>
                        </Row>
                    </Section>
                </div>
            </body>
        </Html>
    );
}

