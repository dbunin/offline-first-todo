import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActions } from "./TodoList.telefunc";
import { Action } from "../../database/todoItems";

export const actionKeys = {
  all: ["actions"],
};

export const useActions = () => {
  const queryClient = useQueryClient();

  const actionsQuery = useQuery({
    queryKey: actionKeys.all,
    queryFn: () => getActions(),
  });

  const updateActions = useMutation({
    mutationKey: actionKeys.all,
    onMutate: async (newAction: Action) => {
      await queryClient.cancelQueries({ queryKey: actionKeys.all });
      const previousData = queryClient.getQueryData(actionKeys.all);

      queryClient.setQueryData(
        actionKeys.all,
        (old: { actions: Action[] }) => ({
          actions: [...old.actions, newAction],
        }),
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      context && queryClient.setQueryData(actionKeys.all, context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: actionKeys.all });
    },
  });

  return {
    actions: actionsQuery.data?.actions || [],
    updateActions,
    actionsQuery,
  };
};
