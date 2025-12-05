"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { email, z } from "zod";
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
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const form = useForm<loginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: loginFormType) {
    // Reset If before error exit for 2nd times
    setMessage("");
    setErrors({});
    setError("");
     const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
         const response = await fetch(WAITLIST_API_URL, requestOptions)
        // const data = await response.json()
        if (response.status === 201 || response.status === 200) {
            setMessage("Thank you for joining")
        } else {
              const data = await response.json()
              console.log(data)
              setErrors(data)
              if (!data.email) {
                setError("There was an error with your request. Please try again.")
              }
        }
 

  }

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      
      
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
      >
        <div>{message && <p className="my-3 p-3 bg-green-100 text-green-800">{message} </p>}</div>
        <div>{error && <p className=" my-3 p-3 bg-red-100 text-red-800">{error} </p>}</div>
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
