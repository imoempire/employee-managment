"use client";
import { Button, Modal, RingProgress, Text } from "@mantine/core";
import React from "react";
import EmployeeAssessment from "../training/_components/EmployeeAssessment";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Page() {
  // Data for Progress Circles
  const progressData = [
    {
      title: "Onboarding Score",
      percentage: 65,
      color: "#054EFA",
      buttonText: "Start Onboarding",
    },
    {
      title: "Profile Score",
      percentage: 83,
      color: "#000000",
      buttonText: "Complete Profile",
    },
    {
      title: "Document Score",
      percentage: 91,
      color: "#FA9005",
      buttonText: "Upload Docs",
    },
  ];

  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();
  const handleprogress = (selected: string) => {
    if (selected === "Complete Profile") {
      router.push("/dashboard/settings/profile");
      return;
    }
    if (selected === "Upload Docs") {
      router.push("/dashboard/document-management/my_docs?openModal=true");
      return;
    }
    open();
  };

  
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Text size="xl" fw={"500"}>
          Onboarding
        </Text>
        {/* Progress Circles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {progressData.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center border-2 rounded-xl py-4"
            >
              <RingProgress
                size={250}
                thickness={24}
                label={
                  <Text size="xl" ta="center">
                    {item.percentage}%
                  </Text>
                }
                sections={[{ value: item.percentage, color: item.color }]}
              />
              <Text size="xl" fw={700} mt="md" className="text-gray-800">
                {item.percentage}%
              </Text>
              <Text size="sm" className="text-gray-600">
                {item.title}
              </Text>
              <Button
                onClick={() => handleprogress(item.buttonText)}
                miw={"50%"}
                color="#054EFA"
                mt="md"
                radius="lg"
              >
                {item.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Modal size={"80%"} opened={opened} onClose={close}>
        <EmployeeAssessment />
      </Modal>
    </div>
  );
}
