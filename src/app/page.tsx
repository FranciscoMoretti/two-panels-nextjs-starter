'use client'
import Image from 'next/image'

"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  subtitle: z
    .string()
    .min(10, {
      message: "Subtitle must be at least 10 characters.",
    })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    }),
})


export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: 'YOUR LINKEDIN CAROUSEL',
      subtitle: 'Generated specially for you'
    }
  })


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-stretch w-full gap-8 justify-between font-mono text-sm flex min-h-[450px]">
        <div className="flex-1 border p-4 rounded shadow">HELLO WORLD</div>
        <div className="flex-1 border p-4 rounded shadow"><TextareaForm form={form}/></div>
      </div>
    </main>
  )
}


export function TextareaForm({form}: {form:  UseFormReturn<z.infer<typeof FormSchema>, any, undefined>}) {
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your super cool title"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input
                  placeholder="Subtitle for more clarity"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

