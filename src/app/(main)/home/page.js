import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AuthService } from "@/lib/auth";
import { userService } from "@/services/user-services";
import ProfileDisplay from './main';
// import ProfileDisplay from "./components/ProfileDisplay";

export default async function HomePage() {
  const queryClient = new QueryClient();
  const session = await AuthService.getCurrentUser();

  if (session) {
    // Pre-fetch data directly from the Service (Server-to-Server)
    await queryClient.prefetchQuery({
      queryKey: ["profile"],
      queryFn: () => userService.getProfile(session.id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="p-4">
        <h1>Welcome to Inclove</h1>
        {/* {queryClient} */}
        <ProfileDisplay />
      </main>
    </HydrationBoundary>
  );
}