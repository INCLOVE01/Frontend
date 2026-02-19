"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PasswordField({ control, name = "password", label = "Password", placeholder = "••••••••" }) {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <FormLabel>{label}</FormLabel>
            <Button variant="link" type="button" className="p-0 h-auto text-xs" tabIndex={-1}>
              Forgot password?
            </Button>
          </div>
          <FormControl>
            <div className="relative">
              <Input {...field} type={show ? "text" : "password"} placeholder={placeholder} className="pr-10" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}