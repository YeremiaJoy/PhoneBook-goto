import React from "react";
import { Main } from "@/styles/02_containers/Layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Main>{children}</Main>;
}
