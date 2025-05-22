import React from "react";
import { Button, Group, Text, Title } from "@mantine/core";

const ConductSession = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <Title order={4}>{title}</Title>
      <Text mt={"sm"} size="md">
        {description}
      </Text>
    </div>
  );
};

export default function CodeConduct() {
  const Conducts: { title: string; description: string }[] = [
    {
      title: "Professional Conduct",
      description:
        "We expect all employees to conduct themselves professionally and ethically. This means treating others with respect, honesty, and fairness at all times.ƒ",
    },
    {
      title: "Respect in the Workplace",
      description:
        "We're committed to maintaining a respectful workplace free from harassment, discrimination, and bullying. We value diversity and inclusion, and expect all team members to contribute to a positive work environment.",
    },
    {
      title: "Conflicts of Interest",
      description:
        "Avoid situations where personal interests could interfere with your ability to make objective decisions in the best interest of the company. Disclose any potential conflicts to management.",
    },
    {
      title: "Confidentiality",
      description:
        "Protect confidential information about our company, our customers, and your colleagues. Do not disclose sensitive information to unauthorized individuals.",
    },
  ];

  return (
    <div>
      <div>
        <Title order={3}>Code of Conduct</Title>
        <Text size="sm" c="#64748b" mb={"lg"}>
          Our company values and behavior guidelines
        </Text>
      </div>
      <div className="flex flex-col gap-y-3.5">
        {Conducts?.map((item, index) => (
          <ConductSession
            key={index}
            description={item.description}
            title={item.title}
          />
        ))}
      </div>
      <div className="mt-8">
        <Group justify="space-between">
          <Button variant="default">Back to Dashboard</Button>
          <Button variant="filled" color={'dark'} >Mark as Complete</Button>
        </Group>
      </div>
    </div>
  );
}
