import React from "react";
import { Button, Group, Text, Title } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";

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
    description: "Recognized as a top employer for 5 consecutive years",
  },
  {
    description: "Over 500 enterprise clients worldwide",
  },
  {
    description: "Industry-leading customer satisfaction ratings",
  },
  {
    description: "Multiple awards for product innovation",
  },
  {
    description: "Consistent annual growth since founding",
  },
];

const AchieveSession = ({ title }: { title: string }) => {
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
                {item.description}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function CompanyProfile() {
  const VisionMissions: { title: string; description: string }[] = [
    {
      title: "Company History",
      description:
        "Founded in 2010, our company began as a small team with a big vision. Over the years, we've grown to become a leader in our industry, employing over 1,000 talented individuals across multiple locations worldwide.",
    },
    {
      title: "What We Do",
      description:
        "We specialize in developing innovative software solutions that help businesses streamline operations, increase efficiency, and drive growth. Our products serve clients across various industries, including finance, healthcare, retail, and manufacturing.",
    },
    {
      title: "Key Achievements",
      description: "",
    },
    {
      title: "Global Presence",
      description:
        "With headquarters in San Francisco, we maintain offices in New York, London, Singapore, and Sydney, allowing us to serve clients around the globe.",
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
            {item.title == "Key Achievements" ? (
              <AchieveSession title={item.title} />
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
