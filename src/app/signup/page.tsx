"use client";
import React from "react";
import { useForm } from "@mantine/form";
import { InputField } from "@/Components/Inputs";
import { Button, Group, Text, Title } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";

export default function Page() {
  const form = useForm({
    initialValues: {
      Username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validate: {
      Username: (value) => (value.length > 0 ? null : "Username is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 8) {
          return "Password should be more than 8 characters";
        }
        if (!/[a-z]/.test(value)) {
          return "Password should contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password should contain at least one uppercase letter";
        }
        if (!/\d/.test(value)) {
          return "Password should contain at least one number";
        }
        return null;
      },
      confirm_password: (value, { password }) => {
        if (value !== password) {
          return "Passwords do not match";
        }
        return null;
      },
    },
  });

  const handleSignUp = (values: typeof form.values) => {
    console.log(values);
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
        <div className="w-full max-w-md space-y-6">
          {/* Title */}
          <Title
            order={2}
            mb={"xl"}
            className="text-center text-2xl sm:text-3xl font-bold text-gray-800"
          >
            Create A Free Account
          </Title>

          {/* Form */}
          <form onSubmit={form.onSubmit(handleSignUp)} className="space-y-6">
            {/* Username */}
            <InputField form={form} name="Username" placeholder="username" />

            {/* Email Input */}
            <InputField form={form} name="email" placeholder="Email" />

            {/* Password Input */}
            <InputField
              form={form}
              name="password"
              placeholder="Password"
              type="password"
            />

            {/* Confirm Password Input */}
            <InputField
              form={form}
              name="confirm_password"
              placeholder="Confirm Password"
              type="password"
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              color="blue"
              className="mt-8"
            >
              Signup
            </Button>
          </form>

          {/* Links */}
          <Group
            align="center"
            justify="center"
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <Text size="sm" className="text-gray-600">
              You already have an account?{" "}
              <a href={"/"} className="text-blue-600 hover:underline">
                Login
              </a>
            </Text>
            <Text size="sm" className="text-gray-600">
              Forgot your password?{" "}
              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Click here
              </a>
            </Text>
          </Group>

          {/* Gmail Button */}
          <Button
            fullWidth
            size="lg"
            color="blue"
            leftSection={<IconMail size={20} />}
            className="mt-4"
            variant="outline"
          >
            Gmail
          </Button>
        </div>
      </div>
    </div>
  );
}
