"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );
} 