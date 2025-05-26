/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Group, Paper, Text, Title } from "@mantine/core";
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { NextSegementValue } from "./types";
import { showNotification } from "@mantine/notifications";
import { API_ENDPOINT } from "@/service/api/endpoints";
import { useCustomPost } from "@/Hooks/useCustomPost";
import { useSession } from "next-auth/react";
import { useCustomGet } from "@/Hooks/useCustomGet";
import { isDocumentAccepted } from "@/Hooks/Helper";

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

export default function VisionMission({
  NextSegement,
}: {
  NextSegement: (value: NextSegementValue) => void;
}) {
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

  // HOOKS
  const { data } = useSession();

  // API
  const { data: onboarding } = useCustomGet<any>({
    url: `${API_ENDPOINT.EMPLOYEE}/${data?.user?.id}/accepted-documents`,
  });

  const acceptedDocs = onboarding?.accepted_documents || [];

  const isDocAccepted: boolean = isDocumentAccepted(
    "vision_mission",
    acceptedDocs
  );

  // STATES
  const [isloading, setisloading] = useState<boolean>(false);

  // API
  const POST_ACTION = useCustomPost<any>({
    url: `${API_ENDPOINT.EMPLOYEE}/${data?.user?.id}/accept/vision_mission`,
    onSuccess: (data: any) => {
      NextSegement("Company Profile");
      showNotification({
        title: "Success",
        message: data?.message || "Changes saved successfully!",
        color: "green",
        icon: <IconCheck />,
        position: "bottom-right",
      });
    },
    onError: (error: any) => {
      console.log(error?.data?.message);

      if (error?.data?.message === "Already accepted.") {
        NextSegement("Company Profile");
        return;
      }
      showNotification({
        title: "Error",
        message: error?.data?.message || "Something went wrong!",
        color: "red",
        icon: <IconX />,
        position: "bottom-right",
      });
    },
  });

  const handleSubmit = async () => {
    try {
      setisloading(true);
      POST_ACTION.mutate(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      // showNotification({
      //   title: "Error",
      //   message: error?.response?.data?.message || "Something went wrong!",
      //   color: "red",
      //   icon: <IconX />,
      //   position: "top-right",
      // });
    } finally {
      setisloading(false);
    }
  };

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
        {!isDocAccepted && (
          <Group justify="space-between">
            <Button component={Link} href={"/dashboard"} variant="default">
              Back to Dashboard
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isloading}
              variant="filled"
              color={"dark"}
            >
              Mark as Complete
            </Button>
          </Group>
        )}
      </div>
    </div>
  );
}
