import * as React from 'react';
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from "@react-email/components";


interface VerificationMailProps {
    username: string,
    otp: string
}
export default function VerificationMail({ username, otp }: VerificationMailProps) {
    return (
        <Html lang="en">
            <Head>
                <title>Verification code </title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Here is Your Verification Code {otp}</Preview>
            <Section>
                <Row>
                    <Heading>Hello Pardeep Choudhary</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for Registration. Please use the following Verification code.
                    </Text>
                </Row>
                <Row>
                    {otp}
                </Row>
            </Section>
        </Html>
    );
}

