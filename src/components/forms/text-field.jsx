"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

/**
 * Reusable TextField for Inclove MVP
 * @param {Object} props
 * @param {Object} props.control - From react-hook-form's useForm()
 * @param {string} props.showCount - "word", "char", or "none" (defaults to "none")
 * @param {number} props.maxLength - Character limit (also enforces native HTML limit)
 * @param {number} props.maxWords - Word limit (display only)
 */
export function TextField({
  control,
  name,
  label,
  placeholder,
  description,
  rows = 4,
  showCount = "none",
  maxLength,
  maxWords,
  className,
  ...props
}) {
  // Watch value for real-time counting
  const value = useWatch({
    control,
    name,
    defaultValue: "",
  });

  // --- Logic Functions ---
  const getWordCount = (str) => {
    if (!str) return 0;
    // Splits by whitespace and removes empty strings from the resulting array
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = (str) => {
    return str ? str.length : 0;
  };

  const renderCountDisplay = () => {
    if (showCount === "word") {
      const count = getWordCount(value);
      return (
        <span>
          {count}{maxWords ? ` / ${maxWords}` : ""} words
        </span>
      );
    }
    
    if (showCount === "char") {
      const count = getCharCount(value);
      return (
        <span>
          {count}{maxLength ? ` / ${maxLength}` : ""} chars
        </span>
      );
    }
    
    return null;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex justify-between items-end mb-1">
            <FormLabel className="font-medium text-foreground">
              {label}
            </FormLabel>
            
            {showCount !== "none" && (
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                {renderCountDisplay()}
              </div>
            )}
          </div>

          <FormControl>
            <Textarea
              {...field}
              {...props}
              rows={rows}
              placeholder={placeholder}
              maxLength={maxLength}
              className="resize-none focus-visible:ring-primary"
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