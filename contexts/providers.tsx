"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FileManagerProvider } from ".";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers: React.FC<Props> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FileManagerProvider>{props.children}</FileManagerProvider>
    </QueryClientProvider>
  );
};
