"use client";
import { useEffect, useState } from "react";
import { AppShell, Burger, Group, Text, Menu } from "@mantine/core";
import Link from "next/link";
import {
  IconBell,
  IconSettings,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { getSession, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/");
  }

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Onboarding", href: "/dashboard/onboarding" },
    { label: "Document Management", href: "/dashboard/document-management" },
    { label: "Training", href: "/dashboard/training" },
    { label: "Support", href: "/dashboard/support" },
  ];

  const SignOut = async () => {
    await signOut();
  };

  return (
    <AppShell header={{ height: 60 }} padding="xl">
      <AppShell.Header bg={"#0039C8"}>
        <Group h="100%" px="md" justify="space-between">
          <Text hiddenFrom="sm" />
          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="sm" ml={"100"}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                }}
              >
                <Text
                  size="md"
                  fw={500}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </Group>

          {/* Desktop Icons */}
          <Group gap="lg" visibleFrom="sm">
            <IconBell color="#ffffff" size={25} style={{ cursor: "pointer" }} />
            <Menu>
              <Menu.Target>
                <IconSettings
                  color="#ffffff"
                  size={25}
                  style={{ cursor: "pointer" }}
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconSettings size={25} />}
                  component={Link}
                  href="/dashboard/settings"
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconUserCircle size={25} />}
                  component={Link}
                  href="/dashboard/settings/profile"
                >
                  Profile
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <div onClick={SignOut}>
              <IconLogout color="#ffffff" size={25} />
            </div>
          </Group>

          {/* Mobile Burger with Menu */}
          <Menu
            opened={mobileMenuOpened}
            onChange={setMobileMenuOpened}
            position="bottom-end"
            offset={10}
            withinPortal
          >
            <Menu.Target>
              <Burger
                opened={mobileMenuOpened}
                onClick={() => setMobileMenuOpened((o) => !o)}
                size="sm"
                hiddenFrom="sm" // Hide burger on "sm" and above
                color="#ffffff"
              />
            </Menu.Target>
            <Menu.Dropdown>
              {navLinks.map((link) => (
                <Menu.Item
                  key={link.href}
                  component={Link}
                  href={link.href}
                  onClick={() => setMobileMenuOpened(false)}
                >
                  {link.label}
                </Menu.Item>
              ))}
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconBell size={16} />}
                component="button"
                onClick={() => setMobileMenuOpened(false)}
              >
                Notifications
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSettings size={16} />}
                component={Link}
                href="/dashboard/settings"
                onClick={() => {
                  setMobileMenuOpened(false);
                }}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={16} />}
                onClick={() => {
                  SignOut();
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Main
        style={{
          background: "#ffff",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

