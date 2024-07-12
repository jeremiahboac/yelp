import { NextResponse } from "next/server"

export const GET = async (request) => {
  const searchText = request.nextUrl.searchParams.get('q')
  try {
    const res = await fetch(`${process.env.MAPBOX_SEARCH_URL}?q=${searchText}?language=en&session_token=${process.env.MAP_BOX_SESSION_TOKEN}&country=PH&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res) throw ({
      message: 'Cannot search address. Please try again later.',
      status: 500
    })

    const { suggestions } = await res.json()


    return NextResponse.json({
      success: true,
      data: suggestions
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: error.status })
  }
}