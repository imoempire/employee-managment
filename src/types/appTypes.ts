export type Employee = {
  id: number;
  username: string;
  email: string;
  accessToken?: string;
  emailVerified: Date | null;
  name?: string;
  image?: string;
};
