import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'
import { createTable, insertData } from '@/app/lib/queries'
 
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
})
 
export const runtime = 'edge'
 
export async function POST(req: Request) {
  try {
    if (!process.env.OPEN_AI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 })
    }

    const { messages } = await req.json()

    await createTable()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          "role": "system",
          "content": "Your name is Catbot and you are basically a robot cat assistant. You help people understand their cats behaviour. You are funny and you like to make conversion. You also say 'Meow' at the end of sentences."
        },
        ...messages
      ]
    })

    const stream = OpenAIStream(response, {
      onStart: async () => {
        if (messages.length > 0) {
          const lastMessage = messages[messages.length -1].content
          const role = messages[messages.length -1].role

          await insertData({
            role,
            content: lastMessage
          })
        }
      },
      onCompletion: async (botResponse: string) => {
        await insertData({
          role: 'system',
          content: botResponse
        })
      }
    })

    return new StreamingTextResponse(stream)

  } catch (error: unknown) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      throw error
    }
  }
}
