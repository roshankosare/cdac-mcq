"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  username: z.string({ message: "Enter valid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 character" }),
});

const SignInForm = () => {
  const router = useRouter();
  const [signInDisable, setSignInDisable] = useState<boolean>(false);

  const callbackUrl = process.env.NEXTAUTH_CALLBACK_URL || "http://localhost:3000";

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSignInDisable(true);
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        // callbackUrl: "http://localhost:3000",
        redirect: false,
        callbackUrl,
      });
      if (result?.error) {
        form.setError("username", {
          message: "username or password is incorrect",
        });
        form.setError("password", {
          message: "username or password is incorrect",
        });
      } else if (result?.ok && result?.url) {
        router.push(result.url);
        router.refresh();
        return;
        // manually redirect only on success
      }
      setSignInDisable(false);
    } catch (error) {
      if (error instanceof Error) {
        form.setError("username", {
          message: error.message,
        });
        form.setError("password", {
          message: error.message,
        });
        setSignInDisable(false);
        return;
      }

      form.setError("username", {
        message: "something went wrong",
      });
      setSignInDisable(false);
    }
    finally{
      setSignInDisable(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-4 border rounded-none border-gray-300 text-xs placeholder:text-xs"
                  placeholder="E-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-4 border rounded-none border-gray-300 text-xs placeholder:text-xs"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={signInDisable} className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
