import { ActionIcon, Group, Table, Text } from "@mantine/core";
import { IconEye, IconRepeat, IconTrashFilled } from "@tabler/icons-react";
import React from "react";
import { EmployeeDocDataTable } from "./Types";
import dayjs from "dayjs";

export default function DocsTable({
  data,
}: {
  data: EmployeeDocDataTable[] | undefined;
}) {
  // Function to handle viewing the document
  const handleViewDocument = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer"); // Opens URL in a new tab
  };

  const rows = data?.map((document) => {
    return (
      <Table.Tr key={document.id}>
        <Table.Td w="25%" style={{ maxWidth: 0 }}>
          <Text truncate title={document.document_name}>
            {document.document_name}
          </Text>
        </Table.Td>
        <Table.Td w="25%">{document.status}</Table.Td>
        <Table.Td w="25%">
          {dayjs(document.date_uploaded).format("YYYY-MM-DD")}
        </Table.Td>
        <Table.Td w="25%">
          <Group gap={0}>
            <ActionIcon
              c={"dark"}
              variant="subtle"
              size="xl"
              onClick={() => handleViewDocument(document.view_document)} // Add click handler
            >
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
    );
  });

  return (
    <div className="mt-6">
      <Table verticalSpacing="md" style={{ tableLayout: "fixed" }}>
        <Table.Thead style={{ backgroundColor: "#00000061" }}>
          <Table.Tr>
            <Table.Th w="25%">Document Name</Table.Th>
            <Table.Th w="25%">Status</Table.Th>
            <Table.Th w="25%">Date Uploaded</Table.Th>
            <Table.Th w="25%">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}