"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Required for default styling
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Reusable PhoneField Component
 * @param {Object} props
 * @param {Object} props.control - From react-hook-form's useForm()
 * @param {string} props.name - The key in your Zod schema (defaults to "phone")
 * @param {string} props.label - Display label
 * @param {string} props.description - Optional helper text
 */
export function PhoneField({
  control,
  name = "phone",
  label = "Phone Number",
  description,
  ...props
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>{label}</FormLabel>
          <FormControl className="w-full">
            <PhoneInput
              {...props}
              international
              defaultCountry="US"
              value={field.value}
              onChange={field.onChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </FormControl>
          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}