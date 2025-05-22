import React from "react";
import { Button, Group, Paper, Text, Title } from "@mantine/core";

const InfoSession = ({
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
      <Text mt={"sm"} size="md">
        {description}
      </Text>
    </div>
  );
};

const DATA = [
  {
    title: "Product Development",
    description: "Responsible for designing, building, and maintaining our software products.",
  },
  {
    title: "Customer Success",
    description: "Ensures clients achieve their desired outcomes through our solutions.",
  },
  {
    title: "Sales & Marketing",
    description: "Drives growth through market expansion and building client relationships.",
  },
  {
    title: "Human Resources",
    description: "Manages talent acquisition, employee development, and company culture.",
  },
  
];

const DepartmentsCard = ({ title }: { title: string }) => {
  return (
    <div>
      <Title order={4} mb={"md"}>
        {title}
      </Title>
      <div className="grid grid-cols-2 gap-4">
        {DATA?.map((item, index) => {
          return (
            <Paper shadow="0" withBorder p={"md"} className="flex items-center" key={index}>
              <Title order={4} mb={"sm"}>
                {item?.title}
              </Title>
              <Text fw={"normal"}>
                {item.description}
              </Text>
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default function OrgStructure() {
  const VisionMissions: { title: string; description: string }[] = [
    {
      title: "Executive Leadership",
      description:
        "Our company is led by an executive team with decades of combined experience in the industry. The leadership team includes the CEO, CTO, CFO, and department heads who collaborate to guide our strategic direction.",
    },
    {
      title: "Key Departments",
      description: "",
    },
    {
      title: "Team Structure",
      description:
        "We operate in a relatively flat organization with cross-functional teams. This approach encourages collaboration, innovation, and quick decision-making. Most teams include members from various disciplines to ensure diverse perspectives.",
    },
  ];

  return (
    <div>
      <div>
        <Title order={3}>Company Profile</Title>
        <Text size="sm" c="#64748b" mb={"lg"}>
          Learn about our company history and achievements
        </Text>
      </div>
      <div className="flex flex-col gap-y-3.5">
        {VisionMissions?.map((item, index) => (
          <div key={index}>
            {item.title == "Key Departments" ? (
              <DepartmentsCard title={item.title} />
            ) : (
              <InfoSession description={item.description} title={item.title} />
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
