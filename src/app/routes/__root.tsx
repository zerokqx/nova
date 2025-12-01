import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";
import { useLayoutStore } from "@shared/lib/stores/useLayout";
import { Aside } from "@widgets/Aside";
import { Header } from "@widgets/Header";
import { Navbar } from "@widgets/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navbar = useLayoutStore((s) => s.data.navbar);

  const aside = useLayoutStore((s) => s.data.aside);
  return (
    <React.Fragment>
      <AppShell
        navbar={{
          collapsed: { mobile: !navbar, desktop: !navbar },
          breakpoint: "xs",

          width: 300,
        }}
        aside={{
          width: 300,
          breakpoint: "xs",
          collapsed: { mobile: !aside, desktop: !aside },
        }}
        header={{
          height: 50,
        }}
        padding={"md"}
        bg={"black"}
        h={"100dvh"}
      >
        <Aside />
        <Navbar />
        <Header />
        <Outlet />
      </AppShell>
    </React.Fragment>
  );
}
