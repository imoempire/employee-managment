"use client";
import {
  Card,
  Text,
  Title,
  Button,
  Group,
  RingProgress,
  Stack,
  Divider,
  Modal,
} from "@mantine/core";
import {
  IconDeviceDesktopAnalytics,
  IconFolder,
  IconUserStar,
} from "@tabler/icons-react";
import EmployeeAssessment from "./training/_components/EmployeeAssessment";
import { useDisclosure } from "@mantine/hooks";

export default function DashboardPage() {
  const CardsData: {
    title: string;
    subtitle: string;
    count?: string;
    color: string;
    Icon: React.ReactNode;
  }[] = [
    {
      title: "Your progress",
      subtitle: "training item completed",
      count: "0",
      color: "#054EFA",
      Icon: <IconDeviceDesktopAnalytics size={70} color="white" />,
    },
    {
      title: "Onboarding",
      subtitle: "You have 65% score",
      color: "#228039",
      Icon: <IconUserStar size={70} color="white" />,
    },
    {
      title: "Your documents",
      subtitle: "documents uploaded",
      color: "#FA9005",
      Icon: <IconFolder size={70} color="white" />,
    },
  ];

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

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Title mb={"xl"} order={2} className="text-center text-gray-800">
          Hey Mawuena!
        </Title>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {CardsData?.map((card, index) => {
            return (
              <Card
                key={index}
                shadow="sm"
                padding="xl"
                radius="40"
                bg={card.color}
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

        {/* Progress Circles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                onClick={open}
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
