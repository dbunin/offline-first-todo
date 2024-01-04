import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import "./style.css";

import "./tailwind.css";
import React, { useState } from "react";
import { addAction } from "../pages/index/TodoList.telefunc";
import { actionKeys } from "../pages/index/actions";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 1000 * 60 * 60 * 24,
        },
      },
    });

    if (typeof window !== "undefined") {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
      });

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
      });
    }

    queryClient.setMutationDefaults(actionKeys.all, {
      mutationFn: async (action) => {
        console.log("HEY THERE!!!!!");
        return await addAction(action);
      },
    });

    return queryClient;
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex container m-auto">
        <Content>{children}</Content>
      </div>
    </QueryClientProvider>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className="p-5 pb-12 min-h-screen">
        {children}
      </div>
    </div>
  );
}
