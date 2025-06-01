/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { InputField } from "@/components/Inputs";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconCheck,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { api } from "@/service/api/http";
import { API_ENDPOINT } from "@/service/api/endpoints";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSucess, setshowSucess] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (value.length === 0 ? "Code is required" : null),
    },
  });

  const handleVerifyCode = async (values: typeof form.values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: any = await api.post(API_ENDPOINT.FORGOT_PASSWORD, {
        email: values.email,
      });

      if (response?.message === "A new password has been sent to your email.") {
        showNotification({
          title: "Success",
          message: response?.message || "A new password has been sent to your email.",
          color: "green",
          icon: <IconCheck />,
          position: "bottom-right",
        });
        setshowSucess(true);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || "Failed to send password");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section: Background Image */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/signup.jpg')",
          backgroundColor: "#f0f0f0",
        }}
      />

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white">
        {showSucess ? (
          <div className="w-full max-w-md space-y-6">
            <Group justify="center">
              <IconRosetteDiscountCheckFilled color="green" size={100} />
            </Group>
            <Stack gap={0} justify="center">
              <Title
                order={2}
                className="text-center text-2xl sm:text-3xl font-bold text-gray-800"
              >
                New Password Sent
              </Title>
              <Text
                size="sm"
                ta="center"
                c={"dimmed"}
                className="text-gray-600"
              >
                We have sent you instructions{" "}
                {form.values.email && `to ${form.values.email}`}
              </Text>
            </Stack>
            <Button
              component={Link}
              href={"/"}
              fullWidth
              size="lg"
              color="blue"
              disabled={isLoading}
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6">
            {/* Title */}
            <Group gap={0} justify="center">
              <Title
                order={2}
                className="text-center text-2xl sm:text-3xl font-bold text-gray-800"
              >
                Forgot Password?
              </Title>
              <Text
                size="sm"
                ta="center"
                c={"dimmed"}
                className="text-gray-600"
              >
                No worries, will send your reset instructions.
              </Text>
            </Group>

            {!!error && (
              <Text c="red" ta="center">
                {error}
              </Text>
            )}
            <form
              onSubmit={form.onSubmit(handleVerifyCode)}
              className="space-y-4 mt-8"
            >
              {/* Email Input */}
              <InputField
                form={form}
                name="email"
                placeholder="Enter your email"
              />

              {/* Send Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                color="blue"
                loading={isLoading}
                disabled={isLoading}
              >
                Send
              </Button>

              {/* Links */}
              <Group
                gap={0}
                align="center"
                justify="center"
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 space-x-0"
                onClick={() => router.replace("/")}
              >
                <IconArrowNarrowLeft />
                <Text size="sm" className="text-gray-600">
                  Back To Login{" "}
                </Text>
              </Group>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
