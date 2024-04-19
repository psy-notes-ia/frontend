"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

export interface ProvidersProps {
  children: React.ReactNode;
  session: any;
  //   themeProps?: ThemeProviderProps;
}

const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
