import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthMember {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  jobRole: string | null;
}

interface MemberPreferences {
  workspaceArchetype: string | null;
  privateOfficeDesks: number | null;
  hybridMemberships: number | null;
  collaborationModes: string[] | null;
  amenities: string[] | null;
  techStack: string[] | null;
  integrations: string[] | null;
  supportPriorities: string[] | null;
  decisionStage: string | null;
  notes: string | null;
}

interface AuthResponse {
  authenticated: boolean;
  member?: AuthMember;
  preferences?: MemberPreferences;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<AuthResponse>({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        return { authenticated: false };
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth"], { authenticated: false });
      window.location.href = "/";
    },
  });

  const login = () => {
    window.location.href = "/api/auth/login";
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    isAuthenticated: data?.authenticated ?? false,
    isLoading,
    member: data?.member ?? null,
    preferences: data?.preferences ?? null,
    login,
    logout,
    error,
  };
}
