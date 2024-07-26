'use client'

import { FormFieldType } from "@/utils/inputTypes"
import CustomFormField from "./CustomFormField"
import { Form } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reviewSchema } from "@/lib/zod.schema/review"
import { Button } from "./ui/button"


const ReviewForm = () => {
  const form = useForm({
    defaultValues: {
      review: ""
    },
    resolver: zodResolver(reviewSchema)
  })

  const { handleSubmit, formState: { isSubmitting } } = form

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="review"
            label="Review:"
            isSubmitting={isSubmitting}
            className="resize-none"
          />
          <Button type="submit" className="bg-black/90 hover:bg-black/85 text-white w-full mt-3" disabled={isSubmitting}>{!isSubmitting ? 'Submit' : 'Submitting...'}</Button>
        </form>
      </Form>
    </div>
  )
}
export default ReviewForm