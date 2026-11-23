import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCurrentUserAction,
  loginAction,
  logoutAction,
  registerAction,
} from "@/libs/actions";
import type { AuthCredentials, RegisterData } from "@/libs/actions";
import { QUERY_KEYS } from "./query-keys";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.auth.currentUser,
    queryFn: getCurrentUserAction,
    retry: false,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthCredentials) => loginAction(data),
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser, response);
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => registerAction(data),
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser, response);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
