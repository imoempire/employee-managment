import { ActionIcon, Group, Table } from "@mantine/core";
import { IconEye, IconRepeat, IconTrashFilled } from "@tabler/icons-react";
import React from "react";

export default function DocsTable() {
  const documents = [
    {
      name: "Document 1",
      status: "Uploaded",
      dateUploaded: "2022-01-01",
      actions: "View",
    },
    {
      name: "Document 2",
      status: "Pending",
      dateUploaded: "2022-02-01",
      actions: "Edit",
    },
    {
      name: "Document 3",
      status: "Verified",
      dateUploaded: "2022-03-01",
      actions: "Download",
    },
    {
      name: "Document 4",
      status: "Rejected",
      dateUploaded: "2022-04-01",
      actions: "Resubmit",
    },
    {
      name: "Document 5",
      status: "In Progress",
      dateUploaded: "2022-05-01",
      actions: "Update",
    },
  ];

  const rows = documents.map((document) => (
    <Table.Tr key={document.name}>
      <Table.Td>{document.name}</Table.Td>
      <Table.Td>{document.status}</Table.Td>
      <Table.Td>{document.dateUploaded}</Table.Td>
      <Table.Td>
        <Group gap={0}>
          <ActionIcon c={"dark"} variant="subtle" size="xl">
            <IconEye />
          </ActionIcon>

          <ActionIcon c={"dark"} variant="subtle" size="xl">
            <IconRepeat />
          </ActionIcon>

          <ActionIcon c={"dark"} size="xl" variant="subtle">
            <IconTrashFilled />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mt-6">
      <Table verticalSpacing="md">
        <Table.Thead style={{ backgroundColor: "#00000061" }}>
          <Table.Tr>
            <Table.Th>Document Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Date Uploaded</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
