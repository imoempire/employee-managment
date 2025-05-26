/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // IconBuilding,
} from "@tabler/icons-react";
import CodeConduct from "./_components/CodeConduct";
import VisionMission from "./_components/VisionMission";
import CompanyProfile from "./_components/Profile";
import { NextSegementValue, SegmentValues } from "./_components/types";
import { useRouter } from "next/navigation";
import { useCustomGet } from "@/Hooks/useCustomGet";
import { API_ENDPOINT } from "@/service/api/endpoints";
import { useSession } from "next-auth/react";
import { calculateCompletionPercentage } from "@/Hooks/Helper";
// import OrgStructure from "./_components/OrgStructure";

export default function Page() {
  const router = useRouter();
  const { data } = useSession();
  const [value, setValue] = useState<SegmentValues>("Code of Conduct");

  const NextSegement = (value: NextSegementValue) => {
    if (!value) {
      console.log(value, "GHGHGHG");
      router.replace("/dashboard");
      return;
    }
    if (value !== null) setValue(value);
  };

  const Tabs: Record<SegmentValues, JSX.Element> = {
    "Code of Conduct": <CodeConduct NextSegement={NextSegement} />,
    "Vision & Mission": <VisionMission NextSegement={NextSegement} />,
    "Company Profile": <CompanyProfile NextSegement={NextSegement} />,
    // "Org Structure": <OrgStructure />,
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
    // {
    //   label: (
    //     <Center style={{ gap: 6 }}>
    //       <IconBuilding size={16} />
    //       <span className="hidden sm:inline">Org Structure</span>
    //       <span className="sm:hidden text-xs">Structure</span>
    //     </Center>
    //   ),
    //   value: "Org Structure",
    // },
  ];

  // API
  const { data: onboarding } = useCustomGet<{ accepted_documents: string[] }>({
    url: `${API_ENDPOINT.EMPLOYEE}/${data?.user?.id}/accepted-documents`,
  });
  const acceptedDocs = onboarding?.accepted_documents || [];
  const requiredDocs = ["coc", "company_profile", "vision_mission"];

  const onBoardingPercentage: number = calculateCompletionPercentage(
    requiredDocs,
    acceptedDocs
  );

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto p-6">
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
                {acceptedDocs?.length}/3 sections completed
              </Text>
            </div>
            <Progress value={onBoardingPercentage || 0} />
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
