'use client'

// SHADCN UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

// ZOD 
import { zodResolver } from "@hookform/resolvers/zod"
import { campgroundSchema } from "@/lib/zod.schema/campground"

// NEXT
import Link from "next/link"
import { useRouter } from "next/navigation"

// CUSTOM HOOK
import useFetchAddress from "@/hooks/useFetchAddress"

// UTILS
import { toBase64Handler } from "@/utils/imageConverter"

// TOAST
import { toast } from "sonner"


const NewCampground = () => {
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

  const router = useRouter()

  const { addressList, setAddressList, setInitialized } = useFetchAddress(location)

  const onSubmit = async (data) => {
    try {
      const { success, images } = await toBase64Handler(data.images)

      if (success) {
        const res = await fetch(`/api/campgrounds`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            images
          })
        })

        if (res.status === 413) {
          toast.error('File too large.', {
            position: 'bottom-right',
            duration: 2000
          })
        }

        if (!res.ok) {
          console.log('Something went wrong.')
        }

        const { message, campground, success } = await res.json()

        if (success) {
          toast.success(message, {
            position: 'bottom-right',
            duration: 2000
          })
          router.push(`/campgrounds/${campground._id}`)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleClick = (address) => {
    setInitialized(true)
    setAddressList([])
    setValue('location', address)
  }

  return (
    <div className="container mt-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center mb-5">New Campground</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title:</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
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
                      <Textarea className="resize-none" {...field} disabled={isSubmitting} />
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

                {addressList && addressList.length > 0 && <div className="absolute bg-white w-full border rounded-md p-4 shadow-md cursor-pointer">
                  <div className="max-h-52 overflow-auto">
                    {addressList.length > 0 && addressList.map((address, index) => {
                      return (
                        <div key={index} className="text-sm py-1 hover:bg-gray-200" onClick={() => handleClick(address.place_name)}>
                          <p>{address.place_name}</p>
                          <small className="text-gray-500">{address.place_name_en}</small>
                        </div>
                      )
                    })}
                  </div>
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
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-black/90 hover:bg-black/85 text-white w-full" disabled={isSubmitting}>{!isSubmitting ? 'Submit' : 'Submitting...'}</Button>
                <Link href={'/campgrounds'} className="w-full">
                  <Button type="button" className="bg-red-700 hover:bg-red-600 text-white w-full" disabled={isSubmitting}>Cancel</Button>
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