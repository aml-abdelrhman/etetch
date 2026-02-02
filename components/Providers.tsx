"use client";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useCallback, useMemo } from "react";
import { useStore } from "@/store";
import { User } from "@/types";
import NextTopLoader from "nextjs-toploader";
import Cookies from "js-cookie";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import api from "@/lib/api";
import { handleLogout } from "@/lib/utils";
import "moment/dist/locale/ar";
import moment from "moment";

// Set Arabic locale once at module level
moment.locale("ar");

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  const { data: session, update } = useSession();
  const { user, setUser } = useStore((store) => store);
  moment.locale("ar");
  // Memoize session user to prevent unnecessary re-renders
  const sessionUser = useMemo(() => session?.user as User, [session?.user]);

  // Handle session changes and token storage
  useEffect(() => {
    if (sessionUser?.email && sessionUser?.token) {
      // Check if user is inactive and log them out
      if (sessionUser.is_active === 0) {
        console.log("User is inactive, logging out...");
        handleLogout();
        return;
      }

      setUser(sessionUser);
      console.log(user);
      // Store token in both localStorage and cookies for different use cases
      try {
        localStorage.setItem("access_token", sessionUser.token);
        Cookies.set("access_token", sessionUser.token);
      } catch (error) {
        console.error("Failed to store access token:", error);
      }
    }
  }, [sessionUser, setUser]);

  // Fetch user profile with improved error handling and optimization
  const fetchUserProfile = useCallback(async () => {
    if (!user?.id || !user?.token) return;

    try {
      const response = await api.request.get("user/profile/edit");

      if (response?.result?.data) {
        const updatedUser = {
          ...response.result.data,
          token: user.token, // Preserve the token
        };

        // Check if user became inactive and log them out
        if (updatedUser.is_active === 0) {
          console.log("User became inactive, logging out...");
          handleLogout();
          return;
        }

        setUser(updatedUser);

        // Update session with new user data
        await update(updatedUser);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // Optionally show user-friendly error message
      // toast.error("Failed to load profile data");
    }
  }, [user?.id]);

  // Fetch profile when user ID is available
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [fetchUserProfile, user?.id]);
  // Memoize NextTopLoader props to prevent unnecessary re-renders
  const topLoaderProps = useMemo(
    () => ({
      color: "#8364b9",
      initialPosition: 0.08,
      crawlSpeed: 200,
      height: 3.1,
      crawl: true,
      showSpinner: true,
      easing: "ease" as const,
      speed: 200,
      shadow: "0 0 10px #37003C,0 0 5px #c470b2",
      template:
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
      zIndex: 1600,
    }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <NextTopLoader {...topLoaderProps} />

        <Suspense fallback={<div>Loading...</div>}>
          <Toaster
            closeButton
            position="top-center"
            richColors
            duration={4000}
            toastOptions={{
              style: {
                direction: "rtl",
              },
            }}
          />
        </Suspense>

        {children}
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
export default Providers;
