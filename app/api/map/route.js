import { NextResponse } from "next/server"

export const GET = async (request) => {
  const searchText = request.nextUrl.searchParams.get('q')
  try {
    const URL = `https://api.maptiler.com/geocoding/${searchText}.json?language=en&types=country%2Cregion%2Csubregion%2Ccounty%2Cjoint_municipality%2Cjoint_submunicipality%2Cmunicipality%2Cmunicipal_district%2Clocality%2Cneighbourhood%2Cplace%2Cpostal_code%2Cpoi&country=ph&proximity=ip&autocomplete=false&fuzzyMatch=false&key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`

    const res = await fetch(URL)

    if (!res) throw ({
      message: 'Cannot search address. Please try again later.',
      status: 500
    })

    const data = await res.json()
    const { features } = data

    return NextResponse.json({
      success: true,
      data: features
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: error.status })
  }
}