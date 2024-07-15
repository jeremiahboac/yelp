import { useEffect, useState } from "react"

const getLocations = async (location) => {
  try {
    const res = await fetch(`/api/map?q=${location}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const useFetchAddress = (location) => {
  const [addressList, setAddressList] = useState([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (location.length === 0) setInitialized(false)

    const delay = setTimeout(async () => {
      if (!initialized) {
        const addresses = await getLocations(location)
        setAddressList(addresses.data)
      }
    }, 500)

    return () => clearTimeout(delay)
  }, [location])

  return { addressList, setAddressList, setInitialized }
}
export default useFetchAddress