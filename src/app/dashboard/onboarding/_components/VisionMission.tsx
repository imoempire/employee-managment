import React from "react";
import { Button, Group, Paper, Text, Title } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";

const VisionSession = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <Title order={4} mb={"md"}>
        {title}
      </Title>
      <Paper shadow="0" withBorder p={"sm"} radius={"sm"} bg={"#EFF6FF"}>
        <Text mt={"sm"} size="md" c="#1E40AF">
          {`"${description}"`}
        </Text>
      </Paper>
    </div>
  );
};

const DATA = [
  {
    title: "Innovation",
    description: "We pursue creative solutions and embrace change.",
  },
  {
    title: "Excellence",
    description: "We strive for exceptional quality in everything we do.",
  },
  {
    title: "Integrity",
    description: "We pursue creative solutions and embrace change.",
  },
  {
    title: "Collaboration",
    description: "We work together to achieve common goals.",
  },
  {
    title: "Customer Focus",
    description: "We prioritize understanding and meeting customer needs.",
  },
];

const CoreSession = ({ title }: { title: string }) => {
  return (
    <div>
      <Title order={4} mb={"md"}>
        {title}
      </Title>
      <div className="flex flex-col gap-y-2">
        {DATA?.map((item, index) => {
          return (
            <div className="flex items-center" key={index}>
              <IconPointFilled size={"15"} />
              <Text ml={"xs"} fw={"bold"}>
                {item.title}
              </Text>
              :<Text> {item.description}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function VisionMission() {
  const VisionMissions: { title: string; description: string }[] = [
    {
      title: "Our Vision",
      description:
        "To be the industry leader in innovative solutions that transform how businesses operate and succeed in the digital age.",
    },
    {
      title: "Our Mission",
      description:
        "We deliver exceptional products and services that solve complex business challenges, while maintaining the highest standards of quality, integrity, and customer satisfaction.",
    },
    {
      title: "Core Values",
      description: "",
    },
  ];

  return (
    <div>
      <div>
        <Title order={3}>Vision & Mission</Title>
        <Text size="sm" c="#64748b" mb={"lg"}>
          Our company&apos;s purpose and future direction
        </Text>
      </div>
      <div className="flex flex-col gap-y-3.5">
        {VisionMissions?.map((item, index) => (
          <div key={index}>
            {item.title == "Core Values" ? (
              <CoreSession title={item.title} />
            ) : (
              <VisionSession
                description={item.description}
                title={item.title}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Group justify="space-between">
          <Button variant="default">Back to Dashboard</Button>
          <Button variant="filled" color={"dark"}>
            Mark as Complete
          </Button>
        </Group>
      </div>
    </div>
  );
}
