"use client";
import {
  Center,
  Paper,
  Progress,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import React, { JSX, useState } from "react";
import {
  IconBook,
  IconShield,
  IconUsers,
  IconBuilding,
} from "@tabler/icons-react";
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
  const [value, setValue] = useState<SegmentValues>("Code of Conduct");

  const Tabs: Record<SegmentValues, JSX.Element> = {
    "Code of Conduct": <CodeConduct />,
    "Vision & Mission": <VisionMission />,
    "Company Profile": <CompanyProfile />,
    "Org Structure": <OrgStructure />,
  };

  const segmentData = [
    {
      label: (
        <Center style={{ gap: 6 }}>
          <IconShield size={16} />
          <span className="hidden sm:inline">Code of Conduct</span>
          <span className="sm:hidden text-xs">Code</span>
        </Center>
      ),
      value: "Code of Conduct",
    },
    {
      label: (
        <Center style={{ gap: 6 }}>
          <IconBook size={16} />
          <span className="hidden sm:inline">Vision & Mission</span>
          <span className="sm:hidden text-xs">Vision</span>
        </Center>
      ),
      value: "Vision & Mission",
    },
    {
      label: (
        <Center style={{ gap: 6 }}>
          <IconUsers size={16} />
          <span className="hidden sm:inline">Company Profile</span>
          <span className="sm:hidden text-xs">Profile</span>
        </Center>
      ),
      value: "Company Profile",
    },
    {
      label: (
        <Center style={{ gap: 6 }}>
          <IconBuilding size={16} />
          <span className="hidden sm:inline">Org Structure</span>
          <span className="sm:hidden text-xs">Structure</span>
        </Center>
      ),
      value: "Org Structure",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div>
          <Title order={1} className="text-2xl sm:text-3xl">
            Employee Onboarding
          </Title>
          <Text
            size="lg"
            c="#64748b"
            mb={"lg"}
            className="text-base sm:text-lg"
          >
            Learn about our company values, policies, and structure to help you
            get started.
          </Text>
        </div>

        <Paper withBorder p={"md"} mb={"xl"} shadow="xs">
          <div className="flex flex-col gap-y-1.5">
            <div className="flex justify-between items-center">
              <Text size="xl" fw={"500"} className="text-lg sm:text-xl">
                Onboarding
              </Text>
              <Text
                size="sm"
                fw={"500"}
                c={"#64748B"}
                className="text-xs sm:text-sm"
              >
                0/4 sections completed
              </Text>
            </div>
            <Progress value={0} />
          </div>
        </Paper>

        {/* Desktop: SegmentedControl */}
        <Paper my={"xl"} className="hidden sm:block">
          <SegmentedControl
            value={value}
            onChange={(val) => setValue(val as SegmentValues)}
            size="md"
            radius={"sm"}
            withItemsBorders={false}
            fullWidth
            data={segmentData}
            styles={{
              root: {
                overflow: "auto",
              },
            }}
          />
        </Paper>

        <div>
          <Paper shadow="xs" p={"md"} withBorder>
            {value && Tabs[value]}
          </Paper>
        </div>
      </div>
    </div>
  );
}
