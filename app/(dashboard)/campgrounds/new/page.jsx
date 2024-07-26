'use client'

// SHADCN UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"

// Custom Form
import CustomFormField from "@/components/CustomFormField"

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
import { FormFieldType } from "@/utils/inputTypes"

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

  const { addressList, setAddressList, setInitialized, geometry, setGeometry } = useFetchAddress(location)

  const onSubmit = async (data) => {
    try {
      data.title.trim()
      data.description.trim()
      data.geometry = geometry
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

  const handleClick = ({ place_name, geometry }) => {
    setInitialized(true)
    setAddressList([])
    setGeometry(geometry)
    setValue('location', place_name)
  }

  return (
    <div className="container mt-10 max-w-2xl transform translate-y-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">New Campground</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
              {/* Title */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={'title'}
                label={'Title:'}
                isSubmitting={isSubmitting}
              />
              {/* Title */}


              {/* Description */}
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name={'description'}
                label={'Description:'}
                isSubmitting={isSubmitting}
                className={'resize-none'}
              />
              {/* Description */}


              {/* Location */}
              <div className="relative">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name={'location'}
                  label={'Location:'}
                  isSubmitting={isSubmitting}
                  type="search"
                />

                {addressList && addressList.length > 0 && <div className="absolute bg-white w-full border rounded-md p-4 shadow-md cursor-pointer">
                  <div className="max-h-52 overflow-auto">
                    {addressList.length > 0 && addressList.map((address, index) => {
                      const { place_name, geometry } = address
                      return (
                        <div key={index} className="text-sm py-1 hover:bg-gray-200" onClick={() => handleClick({ place_name, geometry })}>
                          <p>{address.place_name}</p>
                          <small className="text-gray-500">{address.place_name_en}</small>
                        </div>
                      )
                    })}
                  </div>
                </div>}
              </div>
              {/* Location */}

              {/* Images */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={'images'}
                label={'Image(s):'}
                type="file"
                isSubmitting={isSubmitting}
              />
              {/* Images */}

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