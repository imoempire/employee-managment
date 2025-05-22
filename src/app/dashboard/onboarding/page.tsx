"use client";
import {
  // Button,
  Center,
  // Modal,
  Paper,
  Progress,
  // RingProgress,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import React, { JSX, useState } from "react";
// import EmployeeAssessment from "../training/_components/EmployeeAssessment";
// import { useDisclosure } from "@mantine/hooks";
// import { useRouter } from "next/navigation";
import { IconBook, IconShield, IconUsers } from "@tabler/icons-react";
import CodeConduct from "./_components/CodeConduct";
import VisionMission from "./_components/VisionMission";
import CompanyProfile from "./_components/Profile";
import OrgStructure from "./_components/OrgStructure";

type SegmentValues =
  | "Code of Conduct"
  | "Vision & Mission"
  | "Company Profile"
  | "Org Structure";

export default function Page() {
  // Data for Progress Circles
  // const progressData = [
  //   {
  //     title: "Onboarding Score",
  //     percentage: 65,
  //     color: "#054EFA",
  //     buttonText: "Start Onboarding",
  //   },
  //   {
  //     title: "Profile Score",
  //     percentage: 83,
  //     color: "#000000",
  //     buttonText: "Complete Profile",
  //   },
  //   {
  //     title: "Document Score",
  //     percentage: 91,
  //     color: "#FA9005",
  //     buttonText: "Upload Docs",
  //   },
  // ];

  // const [opened, { open, close }] = useDisclosure(false);

  // const router = useRouter();
  // const handleprogress = (selected: string) => {
  //   if (selected === "Complete Profile") {
  //     router.push("/dashboard/settings/profile");
  //     return;
  //   }
  //   if (selected === "Upload Docs") {
  //     router.push("/dashboard/document-management/my_docs?openModal=true");
  //     return;
  //   }
  //   open();
  // };

  const [value, setValue] = useState<SegmentValues>("Code of Conduct");

  const Tabs: Record<SegmentValues, JSX.Element> = {
    "Code of Conduct": <CodeConduct />,
    "Vision & Mission": <VisionMission />,
    "Company Profile": <CompanyProfile />,
    "Org Structure": <OrgStructure />,
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div>
          <Title order={1}>Employee Onboarding</Title>
          <Text size="lg" c="#64748b" mb={"lg"}>
            Learn about our company values, policies, and structure to help you
            get started.
          </Text>
        </div>
        <Paper withBorder p={"md"} mb={"xl"} shadow="xs">
          <div className="flex flex-col gap-y-1.5">
            <div className="flex justify-between items-center">
              <Text size="xl" fw={"500"}>
                Onboarding
              </Text>
              <Text size="sm" fw={"500"} c={"#64748B"}>
                0/4 sections completed
              </Text>
            </div>
            <Progress value={0} />
          </div>
        </Paper>
        <Paper my={"xl"}>
          <SegmentedControl
            value={value}
            onChange={(val) => setValue(val as SegmentValues)}
            size="md"
            radius={"sm"}
            withItemsBorders={false}
            w={"100%"}
            data={[
              {
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconShield size={"17"} />
                    <span>Code of Conduct</span>
                  </Center>
                ),
                value: "Code of Conduct",
              },
              {
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconBook size={"17"} />
                    <span>Vision & Mission</span>
                  </Center>
                ),
                value: "Vision & Mission",
              },
              {
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconUsers size={"17"} />
                    <span>Company Profile</span>
                  </Center>
                ),
                value: "Company Profile",
              },
              {
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconUsers size={"17"} />
                    <span>Org Structure</span>
                  </Center>
                ),
                value: "Org Structure",
              },
            ]}
          />
        </Paper>
        <div>
          <Paper shadow="xs" p={"md"} withBorder>
            {value && Tabs[value]}
          </Paper>
        </div>
        {/* Progress Circles Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
        </div> */}
      </div>

      {/* <Modal size={"80%"} opened={opened} onClose={close}>
        <EmployeeAssessment />
      </Modal> */}
    </div>
  );
}
