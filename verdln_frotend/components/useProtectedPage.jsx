"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

/**
 * Call this hook at the top of any page that should be protected.
 * Automatically redirects to /auth/login if user is not logged in.
 */
export function useProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);
}
