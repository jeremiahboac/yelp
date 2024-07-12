'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { campgroundSchema } from "@/lib/zod.schema/campground"
import Link from "next/link"
import { useEffect, useState } from "react"

const NewCampground = () => {
  const [addressList, setAddressList] = useState([])
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      images: []
    },
    resolver: zodResolver(campgroundSchema)
  })

  const { watch, setValue, formState: { isSubmitting } } = form
  const location = watch('location')

  const getLocations = async () => {
    try {
      const res = await fetch(`/api/mapbox?q=${location}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const { data } = await res.json()
      setAddressList(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      getLocations()
    }, 1000)

    return () => clearTimeout(delay)
  }, [location])

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleClick = (address) => {
    setAddressList([])
    console.log(address)
    // setValue('location', address)
  }

  return (
    <div className="container mt-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center mb-5">New Campground</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="relative">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location:</FormLabel>
                      <FormControl>
                        <Input type="search" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {addressList.length > 0 && <div className="absolute bg-white w-full border rounded-md p-4 shadow-md cursor-pointer">
                  {addressList.length > 0 && addressList.map((address, index) => {
                    return <p key={index} className="text-sm py-1 hover:bg-gray-200" onClick={() => handleClick(address.place_formatted)}>{address.place_formatted}</p>
                  })}
                </div>}
              </div>


              <FormField
                control={form.control}
                name="images"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Image(s):</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        {...fieldProps}
                        onChange={(e) => {
                          return onChange(e.target.files)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-black/90 hover:bg-black/85 text-white w-full">Submit</Button>
                <Link href={'/campgrounds'} className="w-full">
                  <Button type="button" className="bg-red-700 hover:bg-red-600 text-white w-full">Cancel</Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
export default NewCampground