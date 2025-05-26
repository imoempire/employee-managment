export function calculateCompletionPercentage(
  requiredDocs: string[],
  acceptedDocs: string[]
): number {
  const completedDocs = acceptedDocs.filter((doc) =>
    requiredDocs.includes(doc)
  ).length;
  return (completedDocs / requiredDocs.length) * 100;
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

  return (completedFields / requiredFields.length) * 100;
}

export function isDocumentAccepted(
  doc: string,
  acceptedDocs: string[]
): boolean {
  return acceptedDocs.includes(doc);
}
