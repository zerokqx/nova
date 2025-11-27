import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppShell, AppShellAside, AppShellNavbar } from "@mantine/core";
import { Header } from "@components/Header";
import { useLayoutStore } from "src/stores/useLayout";
import { Navbar } from "@components/Navbar";
import { Aside } from "@components/Aside";

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
