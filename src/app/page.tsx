"use client";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { watch } from "fs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import useFormPersist from "react-hook-form-persist";

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
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "YOUR LINKEDIN CAROUSEL",
      subtitle: "Generated specially for you",
    },
  });

  const { watch, setValue } = form;

  useFormPersist("storageKey", {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
  });

  const values = form.watch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-stretch justify-center w-full gap-8 font-mono text-sm flex ">
        <div className="flex-1 border p-4 rounded shadow flex flex-col items-center ">
          <Carousel values={values} />
        </div>
        <div className="flex-1 border p-4 rounded shadow">
          <TextareaForm form={form} />
        </div>
      </div>
    </main>
  );
}

export function Carousel({ values }: { values: z.infer<typeof FormSchema> }) {
  return (
    <Card className="w-[448px] h-[560px] p-8">
      <CardHeader>
        <CardTitle>{values.title}</CardTitle>
        <CardDescription>{values.subtitle}</CardDescription>
      </CardHeader>
      {values.content && (
        <CardContent>
          <span className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            eligendi dolorem consectetur sit sequi. Saepe repellendus
            perferendis iure laborum esse!
          </span>
        </CardContent>
      )}
      <CardFooter className="flex justify-start gap-3 ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://thispersondoesnotexist.com"
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="">Your Name</span>
          <span className="">@handle</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export function TextareaForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>;
}) {
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[350px]"
      >
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
  );
}
