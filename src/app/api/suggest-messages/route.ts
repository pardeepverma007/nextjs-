// import { openai } from '@ai-sdk/openai';

// import { StreamingTextResponse, streamText, StreamData } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export const runtime = 'edge';


// export async function POST(req: Request) {
//     const { messages } = await req.json();

//     const result = await streamText({
//         model: openai('gpt-4-turbo'),
//         messages,
//     });

//     const data = new StreamData();

//     data.append({ test: 'value' });

//     const stream = result.toAIStream({
//         onFinal(_) {
//             data.close();
//         },
//     });

//     return new StreamingTextResponse(stream, {}, data);
// }

// app/(auth)/open-ai/route.ts

import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText, StreamData } from 'ai';

export const maxDuration = 30;
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await streamText({
            model: openai('gpt-4-turbo'),
            messages,
        });

        const data = new StreamData();

        data.append({ test: 'value' });

        const stream = result.toAIStream({
            onFinal(_) {
                data.close();
            },
        });

        return new StreamingTextResponse(stream, {}, data);
    } catch (error: any) {
        console.error('Error:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
