'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "./ui/input"
import { FormFieldType } from "../utils/inputTypes"
import { Textarea } from "./ui/textarea"

const RenderField = ({ field, props }) => {
  const { value, onChange, ...fieldProps } = field
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          {props.type !== 'file' ?
            <Input
              {...field}
              type={props.type}
              disabled={props.isSubmitting}
              placeholder={props.placeholder}
            /> :
            <Input
              {...fieldProps}
              type={props.type}
              disabled={props.isSubmitting}
              multiple
              onChange={(e) => {
                return field.onChange(e.target.files)
              }}
            />
          }
        </FormControl>
      )

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            {...field}
            className={props.className}
            disabled={props.isSubmitting}
            placeholder={props.placeholder}
          />
        </FormControl>
      )
  }
}

const CustomFormField = (props) => {
  const { control, label, name } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <RenderField
            field={field}
            props={props}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default CustomFormField