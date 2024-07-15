import { NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json({
    message: 'Hello world'
  })
}

export const POST = async (request) => {
  console.log('run')
  const data = await request.json()
  console.log(data)
  return NextResponse.json({
    data
  })
}