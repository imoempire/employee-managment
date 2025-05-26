/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TextField } from "../_components/TextField";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { useSession } from "next-auth/react";
import { useCustomPost } from "@/Hooks/useCustomPost";
import { API_ENDPOINT } from "@/service/api/endpoints";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCustomGet } from "@/Hooks/useCustomGet";
import { ProfileResponse } from "@/Hooks/ApiDataTypes";

interface EmployeeFormData {
  full_name: string;
  email: string;
  phone_number: string;
  start_date: Date | null;
  department: string;
  position: string;
  technical_skills: string;
  professional_bio: string;
}

export default function Page() {
  const { data } = useSession();
  const router = useRouter();

  //API DATA
  const { data: MyProfile } = useCustomGet<ProfileResponse>({
    url: `${API_ENDPOINT.EMPLOYEE}/${data?.user?.id}/employee-profile`,
  });

  // STATES
  const [isloading, setisloading] = useState<boolean>(false);

  // Add
  const form = useForm<EmployeeFormData>({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      start_date: null,
      department: "",
      position: "",
      technical_skills: "",
      professional_bio: "",
    },
    validate: {
      full_name: (value) =>
        value.trim().length < 2
          ? "Full name must be at least 2 characters"
          : null,
      email: (value) =>
        !/^\S+@\S+$/.test(value) ? "Invalid email format" : null,
      phone_number: (value) =>
        !/^\d{10,15}$/.test(value.replace(/\D/g, ""))
          ? "Phone number must be 10-15 digits"
          : null,
      start_date: (value) => (!value ? "Start date is required" : null),
      department: (value) => (!value ? "Department is required" : null),
      position: (value) => (!value ? "Position is required" : null),
      technical_skills: (value) =>
        value.trim().length < 3
          ? "Please provide at least 3 characters for technical skills"
          : null,
      professional_bio: (value) =>
        value.trim().length < 10
          ? "Professional bio should be at least 10 characters"
          : null,
    },
  });

  useEffect(() => {
    if (MyProfile?.profile) {
      const profile = MyProfile?.profile;
      form.setFieldValue("email", profile.email);
      form.setFieldValue("department", profile.department);
      form.setFieldValue("full_name", profile.full_name);
      form.setFieldValue("phone_number", profile.phone_number);
      form.setFieldValue(
        "start_date",
        profile.start_date ? new Date(profile.start_date) : null
      );
      form.setFieldValue("position", profile.position);
      form.setFieldValue("technical_skills", profile.technical_skills);
      form.setFieldValue("professional_bio", profile.professional_bio);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MyProfile?.profile]);

  const completedProfile = Object.values(form.values).every(
    (value) => value !== null && value !== ""
  );

  const POST_ACTION = useCustomPost<EmployeeFormData>({
    url: `${API_ENDPOINT.EMPLOYEE}/${data?.user?.id}/complete-profile`,
    onSuccess: (data: any) => {
      router.replace("/dashboard");
      showNotification({
        title: "Success",
        message: data?.message || "Changes saved successfully!",
        color: "green",
        icon: <IconCheck />,
        // position: "bottom-center",
      });
    },
    onError: (error: any) => {
      console.log(error);
      showNotification({
        title: "Error",
        message: error?.data?.errors?.message || "Something went wrong!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setisloading(true);
      await POST_ACTION.mutateAsync(values);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between mb-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-0.5">Employee Profile</h1>
            <p className="text-xl">
              Complete your employee information to access all portal features
            </p>
          </div>
        </div>
        <Paper shadow="md" withBorder p={"md"} mb={"xl"}>
          <div>
            <h1 className="text-2xl font-bold">
              Personal & Professional Information
            </h1>
            <p className="text-md text-[#64748B]">
              This information will be used for your employee directory profile
              and departmental records.
            </p>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="flex flex-col gap-y-6 mt-8">
              <SimpleGrid cols={2} w={"100%"} verticalSpacing="lg">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...form.getInputProps("full_name")}
                />
                <TextInput
                  label="Work Email"
                  placeholder="Enter your work email address"
                  {...form.getInputProps("email")}
                />

                <TextInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  {...form.getInputProps("phone_number")}
                />
                <DateInput
                  label="Start Date"
                  placeholder="Select start date"
                  valueFormat="DD/MM/YYYY"
                  {...form.getInputProps("start_date")}
                />

                <TextInput
                  label="Department"
                  placeholder="eg: Administration"
                  {...form.getInputProps("department")}
                />
                <TextInput
                  label="Position"
                  placeholder="eg: Manager"
                  {...form.getInputProps("position")}
                />
              </SimpleGrid>
              <TextField
                mt={"xl"}
                label="Technical Skills"
                placeholder="eg: Resources management"
                caption="Enter your key skills separated by commas"
                {...form.getInputProps("technical_skills")}
              />
              <Textarea
                mt={"lg"}
                styles={{
                  input: {
                    minHeight: 100,
                  },
                }}
                label="Professional Bio"
                placeholder="Brief description of your professional background and experience"
                {...form.getInputProps("professional_bio")}
              />

              {completedProfile && (
                <Group justify="right" mt={"50"}>
                  <Button
                    variant="default"
                    onClick={() => {
                      form.reset();
                      router.back();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="filled"
                    color="dark"
                    type="submit"
                    loading={isloading}
                  >
                    Save Profile
                  </Button>
                </Group>
              )}
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
