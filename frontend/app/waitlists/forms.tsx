"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

type loginFormType = z.infer<typeof formSchema>;
const WAITLIST_API_URL = "/api/waitlists/";

export function WaitlistForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const form = useForm<loginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: loginFormType) {
    try {
      const res = await axios.post(WAITLIST_API_URL, data);
      if (res.data) {
        setMessage("Thank You for Joining");
      }
    } catch (error) {
      setError(
        "There was an error with your requests . Please try again your."
      );

      console.log(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <div>{message && message}</div>
      <div>{error && error}</div>
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="input-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="input-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Your email"
                  autoComplete="email"
                  className="h-10"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button type="submit" form="login-form" className="h-10">
        Join Waitlist
      </Button>
    </div>
  );
}
