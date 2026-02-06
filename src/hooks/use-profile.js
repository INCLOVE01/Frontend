// hooks/use-profile.ts
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
    // Auth Protection: only run if the client thinks we are logged in
    staleTime: 1000 * 60 * 5, 
  });
}