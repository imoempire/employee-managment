"use client";
import React, { useEffect } from "react";
import DocsTable from "../_components/DocsTable";
import {
  IconArrowNarrowLeft,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // Check for openModal query param on mount
  useEffect(() => {
    if (searchParams.get("openModal") === "true") {
      open();
      // Optionally clear the query param from the URL
      // router.replace("/target", undefined, { shallow: true });
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <Flex justify={"space-between"}>
          <ActionIcon
            color={"#054EFA"}
            variant="filled"
            aria-label="Settings"
            radius={"xl"}
            size={"xl"}
            mb={"xl"}
            onClick={() => router.back()}
          >
            <IconArrowNarrowLeft />
          </ActionIcon>
          <Button
            size="md"
            mb={"xl"}
            variant="filled"
            radius={"xl"}
            color="#054EFA"
            onClick={open}
          >
            Add New Document
          </Button>
        </Flex>
        <DocsTable />
      </div>
      <Modal
        centered
        size={"lg"}
        opened={opened}
        onClose={close}
        title="Add Documents"
        closeOnClickOutside={false}
        p={"xl"}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Flex mb={"lg"}>
            <Select
              w={"100%"}
              data={["ID", "Proof of Address", "Contract", "Certificate"]}
              withAsterisk
              label={"Select Document Type"}
              placeholder="Select Document Type"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Flex>

          <Stack gap={0}>
            <Text size="sm" fw={"500"} mb={"2"}>
              Upload Document
            </Text>
            <Dropzone
              onDrop={(files) => console.log("accepted files", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              <Group
                justify="center"
                gap="xl"
                mih={220}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size={52}
                    color="var(--mantine-color-blue-6)"
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={52}
                    color="var(--mantine-color-red-6)"
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    size={52}
                    color="var(--mantine-color-dimmed)"
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Stack>

          <div className="mt-6">
            <Button
              fullWidth
              size="lg"
              color="#054EFA"
              className="mt-4"
              variant="filled"
              onClick={close}
            >
              I’m done
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
