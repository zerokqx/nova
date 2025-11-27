import { AppShellNavbar, Space } from "@mantine/core";
import { NavItem } from "./NavItem";

export const Navbar = () => {
  return (
    <AppShellNavbar
      p={"md"}
      bg={"black"}
      styles={(t) => ({
        navbar: {
          overflowY: "auto",
          borderColor: t.colors.blue[5],
        },
      })}
    >
      <Space h={"1rem"} />
      <NavItem text="Пользователь: Что такое NixOS?" />
      <NavItem text="ИИ: NixOS — декларативная Linux-дистрибуция с воспроизводимыми конфигурациями." />
      <NavItem text="Пользователь: Как установить пакет в NixOS?" />
      <NavItem text="ИИ: Используй nix-shell -p пакет или добавь в configuration.nix и сделай nixos-rebuild switch." />
      <NavItem text="Пользователь: Проблема с flakes в NixOS?" />
      <NavItem text="ИИ: Включи experimentalFeatures = nix-command flakes в nix.conf." />
      <NavItem text="Пользователь: Как настроить Neovim в NixOS?" />
      <NavItem text="ИИ: Добавь programs.neovim.enable = true; в home.nix или configuration.nix." />
      <NavItem text="Пользователь: Разница Nix и NixOS?" />
      <NavItem text="ИИ: Nix — пакетный менеджер, NixOS — ОС на его базе с полным декларативным управлением." />
      <NavItem text="Пользователь: Как монтировать диски в NixOS?" />
      <NavItem text="ИИ: В fileSystems добавь опции в configuration.nix, затем nixos-rebuild." />
      <NavItem text="Пользователь: Оптимизация NixOS для React-проектов?" />
      <NavItem text="ИИ: Используй devShells в flake.nix для nodePackages и yarn." />
      <NavItem text="Пользователь: Ошибка 'permission denied' в Nix?" />
      <NavItem text="ИИ: Nix store неизменяемый, используй nix-shell или home-manager." />
      <NavItem text="Пользователь: Как обновить NixOS?" />
      <NavItem text="ИИ: nix-channel --update; nixos-rebuild switch --upgrade." />
      <NavItem text="Пользователь: Интеграция Tauri с NixOS?" />
      <NavItem text="ИИ: Добавь pkgs.tauri в buildInputs flake'а, настрой entitlements." />
    </AppShellNavbar>
  );
};
