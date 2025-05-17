"use client";
import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { TextField } from "../_components/TextField";

export default function Page() {
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
          <div className="flex flex-col gap-y-6 mt-8"></div>
          <SimpleGrid cols={2} w={"100%"} verticalSpacing="lg">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              onChange={(e) => console.log(e.target.value)}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              onChange={(e) => console.log(e.target.value)}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              onChange={(e) => console.log(e.target.value)}
            />
            <TextInput
              label="Start Date"
              placeholder=""
              onChange={(e) => console.log(e.target.value)}
            />

            <TextInput
              label="Department"
              placeholder="eg: Administration"
              onChange={(e) => console.log(e.target.value)}
            />
            <TextInput
              label="Position"
              placeholder="eg: Manager"
              onChange={(e) => console.log(e.target.value)}
            />
          </SimpleGrid>

          <TextField
            mt={"xl"}
            label="Technical Skills"
            placeholder="rg: Resources management"
            caption="Enter your key skills separated by commas"
            onChange={(e) => console.log(e.target.value)}
          />
          <Textarea
            mt={"lg"}
            styles={{
              input: {
                minHeight: 100,
              },
            }}
            label="Professional Bio"
            placeholder="Brief discription of your professional background and experience"
            onChange={(e) => console.log(e.target.value)}
          />

          <Group justify="right" mt={"50"}>
            <Button variant="default">Cancel</Button>
            <Button variant="filled" color="dark">
              Save Profile
            </Button>
          </Group>
        </Paper>
      </div>
    </div>
  );
}
