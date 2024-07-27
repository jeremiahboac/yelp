'use client'

import { FormFieldType } from "@/utils/inputTypes"
import CustomFormField from "./CustomFormField"
import { Form } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reviewSchema } from "@/lib/zod.schema/review"
import { Button } from "./ui/button"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"


const ReviewForm = () => {
  const { id } = useParams()
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      review: ""
    },
    resolver: zodResolver(reviewSchema)
  })

  const { handleSubmit, reset, formState: { isSubmitting } } = form

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/campgrounds/${id}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const review = await res.json()

      const { success, message } = review

      if (success) {
        toast.success(message, {
          position: 'bottom-right',
          duration: 2000
        })
        reset()
        router.refresh()
      } else {
        throw ({ message })
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-right',
        duration: 2000
      })
    }
  }

  return (
    <div className="mb-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="review"
            label="Review:"
            isSubmitting={isSubmitting}
            className="resize-none"
            placeholder="Add a review..."
          />
          <Button type="submit" className="bg-black/90 hover:bg-black/85 text-white w-full mt-3" disabled={isSubmitting}>{!isSubmitting ? 'Submit' : 'Submitting...'}</Button>
        </form>
      </Form>
    </div>
  )
}
export default ReviewForm