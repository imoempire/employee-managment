export type Employee = {
  id: number;
  username: string;
  email: string;
  accessToken?: string;
<<<<<<< HEAD
  emailVerified: Date | null;
  name?: string;
  image?: string;
};
=======
  emailVerified: Date | null; // Make it non-optional to satisfy AdapterUser
  name?: string; // From User
  image?: string; // From User
};
>>>>>>> master
