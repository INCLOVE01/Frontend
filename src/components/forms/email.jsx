"use client";

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function EmailField({
  control,
  name = "email",
  label = "Email Address",
  placeholder = "name@example.com",
  description,
  ...props
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              type="email"
              placeholder={placeholder}
              autoComplete="email"
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