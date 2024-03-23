import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function createTable() {
  try {
    const result = await sql`CREATE TABLE IF NOT EXISTS catbot (
      role VARCHAR (255),
      message TEXT
  )`

    return NextResponse.json({ chats: result.rows }, { status: 200 })
  } catch (error) {
    console.log(`Failed to create table! error: ${error}`)
    return NextResponse.json({ error }, { status: 500 })
  }
}

type Params = {
    role: string
    content: string
}

export async function insertData({ role, content }: Params) {
  try {
    const result = await sql`
        INSERT INTO catbot (
            role,
            message
        ) VALUES (${role}, ${content})`

    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.log(`Failed to insert into table! error: ${error}`)
    return NextResponse.json({ error }, { status: 500 })
  }
}