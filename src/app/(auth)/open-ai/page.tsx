
'use client'

import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function Component() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);

        const newMessages: Message[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await fetch('/api/suggest-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let result = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value);
                }
            }

            setMessages([...newMessages, { role: 'assistant', content: result }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
                <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
                    <div className="h-96 overflow-y-auto mb-4 p-2 border border-gray-300 rounded">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-2 my-2 rounded ${message.role === 'user'
                                        ? 'bg-blue-500 text-white self-end'
                                        : 'bg-gray-300 text-black self-start'
                                    }`}
                            >
                                {message.content}
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}