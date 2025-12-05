import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";
import { useLayoutStore } from "@shared/lib/stores/useLayout";

const Navbar = React.lazy(() =>
  import("@widgets/Navbar").then((s) => ({ default: s.Navbar })),
);
const Aside = React.lazy(() =>
  import("@widgets/Aside").then((s) => ({ default: s.Aside })),
);
const Header = React.lazy(() =>
  import("@widgets/Header").then((s) => ({ default: s.Header })),
);

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navbar = useLayoutStore((s) => s.data.navbar);
  const aside = useLayoutStore((s) => s.data.aside);

  return (
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
      header={{ height: 50 }}
      padding="md"
      bg="black"
    >
      <React.Suspense fallback={null}>
        <Aside />
        <Navbar />
        <Header />
      </React.Suspense>
      <Outlet />
    </AppShell>
  );
}
