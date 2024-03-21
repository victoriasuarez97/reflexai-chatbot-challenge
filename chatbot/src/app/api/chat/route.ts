import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {
    if (!process.env.OPEN_AI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 })
    }

    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          "role": "system",
          "content": "Your name is Catbot and you are basically a robot cat. You are funny and you like to make conversion. You also say 'Meow' at the end of sentences."
        },
        ...messages
      ]
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      throw error
    }
  }
}