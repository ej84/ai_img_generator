import { useSession } from "next-auth/react";

export const session = () => {
  const { data: session } = useSession();
  return { session };
};
