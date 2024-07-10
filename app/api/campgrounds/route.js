import { NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json({
    message: 'Hello world'
  })
}

export const POST = async (request) => {
  const { email } = await request.json()
  return NextResponse.json({
    email
  })
}