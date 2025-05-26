"use client";
import {
  Card,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Divider,
  Center,
  Button,
} from "@mantine/core";
import {
  IconClock,
  IconFolder,
  IconMenuDeep,
  IconRosetteDiscountCheck,
  IconXboxX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import PolicyTable from "./_components/PolicyTable";

type SegmentValues = "overview" | "policies" | "procedures" | "training";
export default function Page() {
  const pathname = usePathname();
  const [value, setValue] = useState<SegmentValues>("overview");

  const CardsData: {
    title: string;
    subtitle: string;
    count?: string;
    color: string;
    Icon: React.ReactNode;
  }[] = [
    {
      title: "Total Documents",
      subtitle: "0 uploaded documents",
      // count: "0",
      color: "#054EFA",
      Icon: <IconFolder size={70} color="white" />,
    },
    {
      title: "Pending Documents",
      subtitle: "You have 0 pending",
      color: "#228039",
      Icon: <IconClock size={70} color="white" />,
    },
    {
      title: "Verified Documents",
      subtitle: "0 Verified Documents",
      color: "#FA9005",
      Icon: <IconRosetteDiscountCheck size={70} color="white" />,
    },
    {
      title: "Verified Documents",
      subtitle: "0 Verified Documents",
      color: "#FA9005",
      Icon: <IconXboxX size={70} color="white" />,
    },
  ];

  const DATA = [
    {
      label: (
        <Center style={{ gap: 10 }}>
          <span>Overview</span>
        </Center>
      ),
      value: "overview",
    },
    {
      label: (
        <Center style={{ gap: 10 }}>
          <span>Policies</span>
        </Center>
      ),
      value: "policies",
    },
    {
      label: (
        <Center style={{ gap: 10 }}>
          <span>Procedures</span>
        </Center>
      ),
      value: "procedures",
    },
    {
      label: (
        <Center style={{ gap: 10 }}>
          <span>Training Materials</span>
        </Center>
      ),
      value: "training",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex justify-between">
          <div>
            <SegmentedControl
              value={value}
              onChange={(val) => setValue(val as SegmentValues)}
              color="#0039C8"
              size="lg"
              radius={"xl"}
              withItemsBorders={false}
              w={"150%"}
              data={DATA}
            />
          </div>
          {value === "overview" && (
            <Link href={`${pathname}/my_docs`}>
              <Button
                size="lg"
                variant="filled"
                radius={"xl"}
                color="#054EFA"
                leftSection={<IconMenuDeep />}
              >
                My Documentss
              </Button>
            </Link>
          )}
        </div>
        {value === "overview" && (
          <div className="mt-16 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {CardsData?.map((card, index) => {
                return (
                  <Card
                    key={index}
                    shadow="sm"
                    padding="xl"
                    radius="40"
                    bg={"#0039C8"}
                    className="text-white"
                  >
                    <Stack>
                      <Group gap="xs">
                        {card.Icon}
                        <Stack gap={0}>
                          <Text c={"#ffffff"} size="md">
                            {card.title}
                          </Text>
                          <Text c={"#ffffff"} size="sm">
                            {card?.count && card.count} {card.subtitle}
                          </Text>
                        </Stack>
                      </Group>
                      <Divider size={6} color="#00000047" />
                    </Stack>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {value === "policies" && (
          <div className="mt-16 w-full lg:w-[70%]">
            <PolicyTable />
          </div>
        )}
      </div>
    </div>
  );
}
