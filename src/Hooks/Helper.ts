import { EmployeeDocDataTable } from "@/app/dashboard/document-management/_components/Types";

export function calculateCompletionPercentage(
  requiredDocs: string[],
  acceptedDocs: string[]
): number {
  const completedDocs = acceptedDocs.filter((doc) =>
    requiredDocs.includes(doc)
  ).length;
  const result = (completedDocs / requiredDocs.length) * 100;
  return +result.toFixed(0);
}

interface Profile {
  [key: string]: string | number | undefined | null;
}

export function calculateProfileCompletionPercentage(
  profile: Profile,
  requiredFields: string[]
): number {
  if (!profile || !requiredFields.length) return 0;

  const completedFields = requiredFields.filter((field) => {
    const value = profile[field];
    return value !== null && value !== undefined && value !== "";
  }).length;
  const result = (completedFields / requiredFields.length) * 100;
  return +result.toFixed(0);
}

export function isDocumentAccepted(
  doc: string,
  acceptedDocs: string[]
): boolean {
  return acceptedDocs.includes(doc);
}

export function calculateDocumentCompletion(
  documents: EmployeeDocDataTable[]
): number {
  // Check if documents array is empty or undefined
  if (!documents || documents.length === 0) {
    return 0;
  }

  // List of required document names
  const requiredDocs: string[] = [
    "ID",
    "Proof of Address",
    "Contract",
    "Certificate",
  ];

  // Get unique document names from the documents array
  const uploadedDocNames: string[] = [
    ...new Set(documents.map((doc) => doc.document_name)),
  ];

  // Count how many required documents are present
  const matchingDocsCount: number = requiredDocs.filter((doc) =>
    uploadedDocNames.includes(doc)
  ).length;

  // Calculate percentage (each document is worth 25%) and fix to 0 decimal places
  const completionPercentage: number = Math.round(matchingDocsCount * 25);

  return completionPercentage;
}
